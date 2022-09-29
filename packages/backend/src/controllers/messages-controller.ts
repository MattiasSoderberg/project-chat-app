import { Router, Request, Response } from 'express'
import { loadMessages, saveMessage } from '../services/messages-services'
import { auth, CustomRequest } from '../middlewares/auth'

const messagesRouter = Router()

messagesRouter.get("/", auth, async (req: Request, res: Response) => {
    const user = (req as CustomRequest).user
    // console.log(user.id)
    res.send(await loadMessages())
})

messagesRouter.post("/", auth, async (req: Request, res: Response) => {
    const username = String((req as CustomRequest).user)
    res.send(await saveMessage(req.body.text, username))
})

export default messagesRouter