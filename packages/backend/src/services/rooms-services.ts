import { JwtPayload } from "jsonwebtoken";
import { getAllRooms, createRoom } from "../models/rooms-repository";

export const loadAllRooms = async () => {
    console.log('rooms services')
    return await getAllRooms()
}

export const saveNewRoom = async (body: {title: string}, user: JwtPayload) => {
    return await createRoom(body.title, user.username)
}