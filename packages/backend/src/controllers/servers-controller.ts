import { Router, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { auth } from '../middlewares/auth'
import { loadAllServers, saveNewServer } from '../services/servers-services'


const serversRouter = Router()

serversRouter.get('/', auth, async (req: Request, res: Response) => {
    res.send(await loadAllServers())
})

serversRouter.post('/', auth, async (req: Request, res: Response) => {
    const newServer = await saveNewServer(req.body, req.user as JwtPayload)

    if (newServer) {
        res.sendStatus(201)
    } else {
        res.status(400).send('Could not create server')
    }
})

export default serversRouter