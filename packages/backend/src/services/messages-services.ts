// import { MessageItem } from '@chat-app/shared'
import { JwtPayload } from 'jsonwebtoken'
import { createMessage, getAllMessages } from '../models/messages-repository'
import { getUserByUsername } from '../models/users-repository'

export const loadMessages = async () => {
    return await getAllMessages()
}

export const saveMessage = async (body: {text: string, room: number}, user: JwtPayload) => {
    const date = new Date().toISOString()
    return await createMessage(body.text, user.username, date, body.room)
}