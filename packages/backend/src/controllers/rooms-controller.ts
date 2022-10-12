import { Router, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../middlewares/auth";
import {
  loadAllRooms,
  loadRoomById,
  saveNewRoom,
} from "../services/rooms-services";

const roomsRouter = Router();

roomsRouter.get("/", auth, async (_req: Request, res: Response) => {
  res.send(await loadAllRooms());
});

roomsRouter.post("/", auth, async (req: Request, res: Response) => {
  const newRoom = await saveNewRoom(req.body, req.user as JwtPayload);
  console.log(newRoom)
  if (newRoom) {
    res.sendStatus(201);
  } else {
    res.status(400).send('Room title already exists');
  }
});

roomsRouter.get("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(await loadRoomById(parseInt(id)));
});

export default roomsRouter;
