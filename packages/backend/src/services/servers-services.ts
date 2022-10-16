import { JwtPayload } from "jsonwebtoken";
import { createSlug } from "../middlewares/helpers";
import { createServer, getAllSevers } from "../models/servers-repository";

export const loadAllServers = async () => {
    return await getAllSevers()
}

export const saveNewServer = async (body: {title: string}, user: JwtPayload) => {
    return await createServer(body.title, user, createSlug(body.title))
}