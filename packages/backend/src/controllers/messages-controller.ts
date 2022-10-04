import { Router, Request, Response } from 'express'
import { loadMessages, saveMessage } from '../services/messages-services'
import { auth } from '../middlewares/auth'
import { JwtPayload } from 'jsonwebtoken'

const messagesRouter = Router()

messagesRouter.get("/", auth, async (req: Request, res: Response) => {
    res.send(await loadMessages())
})

messagesRouter.post("/", auth, async (req: Request, res: Response) => {
    res.send(await saveMessage(req.body.text, req.user as JwtPayload))
})

export default messagesRouter