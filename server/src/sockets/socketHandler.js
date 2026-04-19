import jwt from "jsonwebtoken";
import cookie from "cookie";

const onlineUsers = new Map();

export function socketHandler(io) {

  io.on("connection", (socket) => {

    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.token;

      if (!token) throw new Error("No token");

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
       console.log("DECODED TOKEN:", decoded);
        socket.to(conversationId).emit("user_typing", {
          id: userId,
          username: decoded.username
      });
      });

    socket.on("stop_typing", (conversationId) => {
      socket.to(conversationId).emit("user_stop_typing", userId);
    });

    //   socket.on("user_typing", (conversationId) => {
    //     socket.to(conversationId).emit("user_typing", userId);
    //   });

    // socket.on("user_stop_typing", (conversationId) => {
    //   socket.to(conversationId).emit("user_stop_typing", userId);
    // });

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