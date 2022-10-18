import { createServer } from "http";
import { Server } from "socket.io";
import { server } from "./app";
import { socketAuth } from "./middlewares/auth";
import { verify, JwtPayload } from "jsonwebtoken";
import { loadMessages, loadMessagesByRoom, saveMessage } from "./services/messages-services";

export const onConnect = () => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000", credentials: true },
  });
  // Move to auth.ts
  io.use((socket, next) => {
    const token: string = socket.handshake.auth.token;
    console.log("in socketAuth", token)
    if (token) {
        console.log("in if token", token)
      try {
        const user = verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        socket.data.user = user;
        next();
      } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            console.error("Socket authentication error")
            // next(new Error("Socket Authentication error"));
        }
      }
    } else {
        console.log("in else", token)
        console.error("Socket authentication error")
        // next(new Error("Socket authentication error"))
    }
  });
// io.use(socketAuth)
  io.on("connection", async (socket) => {
    console.log("Client connected:", socket.data.user);

    socket.on("join-room", async roomId => {
        if (!socket.rooms.has(roomId)) {
            const currentRoom = [...socket.rooms].slice(1, )[0]
            if (currentRoom) {
                socket.leave(currentRoom)
            }
            socket.join(roomId)
            console.log(`${socket.data.user.username} joined room ${roomId}`)
            const messages = await loadMessagesByRoom(roomId)
            socket.emit("messages", messages)
        }
    })

    socket.on("messages", async roomId => {
        const messages = await loadMessagesByRoom(roomId)
        io.to(roomId).emit("messages", messages)
    })

    socket.on("disconnecting", () => {
        if (socket.rooms.size > 1) {
            socket.rooms.clear()
        }
        console.log(socket.data.user.username, "disconnected")
    })
  });
};
