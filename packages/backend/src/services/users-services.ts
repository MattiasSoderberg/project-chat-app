import { UserCredentials } from "@chat-app/shared";
import { hash, compare } from "bcryptjs";
import { JwtPayload, sign } from "jsonwebtoken";
import {
  createUser,
  deleteUserByUsername,
  getUserByUsername,
  getUserByUsernameWithPassword,
} from "../models/users-repository";

export const saveNewUser = async (userCredentials: UserCredentials) => {
  const { username, password } = userCredentials;

  const hashedPassword = await hash(password, 8);
  const date = new Date().toISOString();

  return await createUser(username, hashedPassword, date);
};

export const loginUser = async (userCredetials: UserCredentials) => {
  const { username, password } = userCredetials;

  const user = await getUserByUsernameWithPassword(username);

  if (user) {
    const hashedPassword = String(user.password);
    if (await compare(password, hashedPassword)) {
      return sign(
        { username: user.username, id: user.id },
        String(process.env.JWT_SECRET),
        { expiresIn: "1800s" }
      );
    }
  }
};

export const loadLoggedInUser = async (user: JwtPayload) => {
  const logginUser = await getUserByUsername(user.username);
  return logginUser;
};

export const deleteUser = async (username: string) => {
  return await deleteUserByUsername(username);
};
