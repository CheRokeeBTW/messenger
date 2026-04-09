export function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send_message", async (data) => {

      const { conversationId, message } = data;

      io.to(conversationId).emit("receive_message", message);

    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

}