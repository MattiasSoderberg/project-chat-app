import { Router, Request, Response } from 'express'
import { loadMessages, saveMessage } from '../services/messages-services'
import { auth } from '../middlewares/auth'

const messagesRouter = Router()

messagesRouter.get("/", auth, async (req: Request, res: Response) => {
    res.send(await loadMessages())
})

messagesRouter.post("/", auth, async (req: Request, res: Response) => {
    res.send(await saveMessage(req.body.text, String(req.user)))
})

export default messagesRouter