import { JwtPayload } from "jsonwebtoken";
import { createSlug } from "../middlewares/helpers";
import { getAllRooms, createRoom, getRoomById, getRoomsByServer } from "../models/rooms-repository";

export const loadAllRooms = async () => {
    return await getAllRooms()
}

export const saveNewRoom = async (body: {title: string, serverId: number}, user: JwtPayload) => {
    if (body.title == '') {
        return
    }
    return await createRoom(body.title, body.serverId, user.username, createSlug(body.title))
}

export const loadRoomById = async (id: number) => {
    return await getRoomById(id)
}

export const loadRoomsByServerId = async (serverId: number) => {
    return await getRoomsByServer(serverId)
}