import express, { Application, json, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { pool } from './db'
import { sql } from 'slonik'
import usersRouter from './controllers/users-controller'
import messagesRouter from './controllers/messages-controller'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3001

app.use(json())
app.use('/users', usersRouter)
app.use('/messages', messagesRouter)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})