import express, { Request, Response } from 'express'
import { getUsers } from '../models/users-repository'

const usersRouter = express.Router()

usersRouter.get("/", async (req: Request, res: Response) => {
    const users = await getUsers()
    res.send(users)
})

export default usersRouter