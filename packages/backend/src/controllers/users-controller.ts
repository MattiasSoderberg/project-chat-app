import express, { Request, Response } from 'express'
import { createUser, getUsers } from '../models/users-repository'
import { saveNewUser } from '../services/users-services'

const usersRouter = express.Router()

usersRouter.get("/", async (req: Request, res: Response) => {
    const users = await getUsers()
    res.send(users)
})

usersRouter.post("/", (req: Request, res: Response) => {
    console.log(typeof req.body)
    saveNewUser(req.body)
    // createUser(username, password)
})

export default usersRouter