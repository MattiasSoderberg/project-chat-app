import { Router, Request, Response } from 'express'
import { loadMessages } from '../services/messages-services'

const messagesRouter = Router()

messagesRouter.get("/", async (req: Request, res: Response) => {
    res.send(await loadMessages())
})

export default messagesRouter