import express, { Application, json } from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import usersRouter from "./controllers/users-controller";
import messagesRouter from "./controllers/messages-controller";
import roomsRouter from "./controllers/rooms-controller";
import serversRouter from "./controllers/servers-controller";
import { setUpTables } from "./models/db";
import { onConnect } from "./socket";

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
app.use(json());
app.use("/users", usersRouter);
app.use("/servers", serversRouter);
app.use("/messages", messagesRouter);
app.use("/rooms", roomsRouter);

server.listen(port, () => {
  setUpTables();
  onConnect();
  console.log(`[server]: Server is listening on port ${port}`);
});
