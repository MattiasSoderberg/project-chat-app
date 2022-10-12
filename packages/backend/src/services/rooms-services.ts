import { JwtPayload } from "jsonwebtoken";
import { createSlug } from "../middlewares/helpers";
import { getAllRooms, createRoom, getRoomById } from "../models/rooms-repository";

export const loadAllRooms = async () => {
    return await getAllRooms()
}

export const saveNewRoom = async (body: {title: string}, user: JwtPayload) => {
    return await createRoom(body.title, user.username, createSlug(body.title))
}

export const loadRoomById = async (id: number) => {
    return await getRoomById(id)
}