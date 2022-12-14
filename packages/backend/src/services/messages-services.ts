// import { MessageItem } from '@chat-app/shared'
import { JwtPayload } from "jsonwebtoken";
import {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByRoom,
} from "../models/messages-repository";

export const loadMessages = async () => {
  return await getAllMessages();
};

export const loadMessagesByRoom = async (room: number) => {
  return await getMessagesByRoom(room);
};

export const loadMessageById = async (id: number) => {
  return await getMessageById(id);
};

export const saveMessage = async (
  body: { text: string; room: number },
  user: JwtPayload
) => {
  const date = new Date().toISOString();
  return await createMessage(
    body.text,
    user.username as string,
    date,
    body.room
  );
};
