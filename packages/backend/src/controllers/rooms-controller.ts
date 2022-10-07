import { Router, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../middlewares/auth";
import { loadAllRooms, saveNewRoom } from "../services/rooms-services";

const roomsRouter = Router();

roomsRouter.get("/", auth, async (_req: Request, res: Response) => {
    console.log('rooms controller')
  res.send(await loadAllRooms());
});

roomsRouter.post("/", auth, async (req: Request, res: Response) => {
  const newRoom = await saveNewRoom(req.body, req.user as JwtPayload);
  if (newRoom) {
    res.sendStatus(201);
  } else {
    res.status(400).json({ message: "Could not create room" });
  }
});

export default roomsRouter;
