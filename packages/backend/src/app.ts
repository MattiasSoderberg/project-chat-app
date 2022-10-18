import express, { Application, json } from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import usersRouter from "./controllers/users-controller";
import messagesRouter from "./controllers/messages-controller";
import roomsRouter from "./controllers/rooms-controller";
import serversRouter from "./controllers/servers-controller";
import { setUpTables } from "./models/db";
import { onConnect } from "./socket"

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN as string;

app.use(
  cors({
    origin: [CORS_ORIGIN],
    credentials: true,
  })
);

export const server = createServer(app);
// export const io = new Server(server, {
//   cors: { origin: CORS_ORIGIN, credentials: true },
// });
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token
//     if (token) {
//         next()
//     } else {
//         console.log('No valid token')
//     }
// })
// io.on("connection", socket => {
//     console.log('Client connected')
// })
// onConnect()
app.use(json());
// app.use(onConnect())
app.use("/users", usersRouter);
app.use("/servers", serversRouter);
app.use("/messages", messagesRouter);
app.use("/rooms", roomsRouter);

server.listen(port, () => {
  setUpTables();
  onConnect()
  console.log(`[server]: Server is listening on port ${port}`);
});
