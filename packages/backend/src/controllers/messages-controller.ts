import { Router, Request, Response } from "express";
import {
  loadMessages,
  loadMessagesByRoom,
  saveMessage,
} from "../services/messages-services";
import { auth } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";

const messagesRouter = Router();

messagesRouter.get("/", auth, async (req: Request, res: Response) => {
  res.send(await loadMessages());
});

messagesRouter.post("/", auth, async (req: Request, res: Response) => {
  const newMessage = await saveMessage(req.body, req.user as JwtPayload);
  if (newMessage) {
    res.sendStatus(201);
  } else {
    res.status(400).json({ message: "Could not create message" });
  }
});

messagesRouter.get("/:roomId", auth, async (req: Request, res: Response) => {
  const { roomId } = req.params;
  res.send(await loadMessagesByRoom(parseInt(roomId)));
});

export default messagesRouter;
