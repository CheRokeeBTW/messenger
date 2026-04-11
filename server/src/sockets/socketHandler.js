import jwt from "jsonwebtoken";

const onlineUsers = new Map();

export function socketHandler(io) {

  io.on("connection", (socket) => {

    try {
      const token = socket.handshake.auth.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.userId;

      onlineUsers.set(userId, socket.id);

      console.log("User connected:", userId);

      socket.broadcast.emit("user_online", userId);

      socket.on("join_conversation", (conversationId) => {
        socket.join(conversationId);
      });

      socket.on("send_message", ({ conversationId, message }) => {
        io.to(conversationId).emit("receive_message", message);
      });

      socket.on("typing", (conversationId) => {
        socket.to(conversationId).emit("user_typing", userId);
      });

    socket.on("stop_typing", (conversationId) => {
      socket.to(conversationId).emit("user_stop_typing", userId);
    });

      socket.on("disconnect", () => {
        onlineUsers.delete(userId);

        console.log("User disconnected:", userId);

        socket.broadcast.emit("user_offline", userId);
      });

    } catch (err) {
      console.log("Invalid token");
      socket.disconnect();
    }

  });

}