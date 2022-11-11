import express, { Request, Response } from "express";
import { getUsers } from "../models/users-repository";
import {
  deleteUser,
  loadLoggedInUser,
  loginUser,
  saveNewUser,
} from "../services/users-services";
import { UserCredentials } from "@chat-app/shared";
import { auth } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";

const usersRouter = express.Router();

usersRouter.get("/", auth, async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
});

usersRouter.post("/", async (req: Request<UserCredentials>, res: Response) => {
  if (await saveNewUser(req.body)) {
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

usersRouter.post(
  "/login",
  async (req: Request<UserCredentials>, res: Response) => {
    const token = await loginUser(req.body);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Incorrect username or password" });
    }
  }
);

usersRouter.get("/me", auth, async (req: Request, res: Response) => {
  res.send(await loadLoggedInUser(req.user as JwtPayload));
});

usersRouter.delete("", auth, async (req: Request, res: Response) => {
  const { username } = req.user as JwtPayload;
  const user = await deleteUser(username);
  if (user) {
    res.send(200);
  } else {
    res.send(400);
  }
});

export default usersRouter;
