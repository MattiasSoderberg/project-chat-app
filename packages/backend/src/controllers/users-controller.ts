import express, { Request, Response } from 'express'
import { createUser, getUsers } from '../models/users-repository'
import { loadLoggedInUser, loginUser, saveNewUser } from '../services/users-services'
import { UserCredentials } from '@chat-app/shared'
import { auth } from '../middlewares/auth'

const usersRouter = express.Router()

usersRouter.get("/", async (req: Request, res: Response) => {
    const users = await getUsers()
    res.send(users)
})

usersRouter.post("/", async (req: Request<UserCredentials>, res: Response) => {
    if (await saveNewUser(req.body)) {
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
})

usersRouter.post("/login", async (req: Request<UserCredentials>, res: Response) => {
    const token = await loginUser(req.body)
    res.status(200).json({token})
})

usersRouter.get("/me", auth, async (req: Request, res: Response) => {
    res.send(await loadLoggedInUser(String(req.user)))
})

export default usersRouter