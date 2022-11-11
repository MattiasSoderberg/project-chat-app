import { Server } from "socket.io";
import { server } from "./app";
import { verify, JwtPayload } from "jsonwebtoken";
import {
  loadMessagesByRoom,
} from "./services/messages-services";
import dotenv from "dotenv";

dotenv.config();

export const onConnect = () => {
  const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN, credentials: true },
  });
  io.use((socket, next) => {
    const token: string = socket.handshake.auth.token;
    if (token) {
      try {
        const user = verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        socket.data.user = user;
        next();
      } catch (err) {
        if (err) {
          console.error("[socket]", "Socket:", socket.id, err.toString());
        }
      }
    } else {
      console.error(
        `[socket] Socket: ${socket.id} authentication error: no token`
      );
    }
  });
  io.on("connection", async (socket) => {
    console.log("Client connected:", socket.data.user);

    socket.on("join-room", async (roomId) => {
      if (!socket.rooms.has(roomId)) {
        const currentRoom = [...socket.rooms].slice(1)[0];
        if (currentRoom) {
          socket.leave(currentRoom);
        }
        socket.join(roomId);
        console.log(
          `[socket] ${socket.data.user.username} joined room ${roomId}`
        );
        const messages = await loadMessagesByRoom(roomId);
        socket.emit("messages", messages);
      }
    });

    socket.on("message", async (roomId, message) => {
      io.to(roomId).emit("message", message);
    });

    socket.on("disconnecting", () => {
      if (socket.rooms.size > 1) {
        socket.rooms.clear();
      }
      console.log("[socket]", socket.data.user.username, "disconnected");
    });
  });
};
