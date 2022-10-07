import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './controllers/users-controller'
import messagesRouter from './controllers/messages-controller'
import roomsRouter from './controllers/rooms-controller'
import { setUpTables } from './models/db'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(json())
app.use('/users', usersRouter)
app.use('/messages', messagesRouter)
app.use('/rooms', roomsRouter)

app.listen(port, () => {
    setUpTables()
    console.log(`Server is listening on port ${port}`)
})