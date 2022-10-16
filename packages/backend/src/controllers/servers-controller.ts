import { Router, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { auth } from '../middlewares/auth'
import { loadAllServers, saveNewServer } from '../services/servers-services'


const serversRouter = Router()

serversRouter.get('/', auth, async (req: Request, res: Response) => {
    res.send(await loadAllServers())
})

serversRouter.post('/', auth, async (req: Request, res: Response) => {
    res.send(await saveNewServer(req.body, req.user as JwtPayload))
})

export default serversRouter