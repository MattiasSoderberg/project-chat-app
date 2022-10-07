// import { MessageItem } from '@chat-app/shared'
import { JwtPayload } from 'jsonwebtoken'
import { createMessage, getAllMessages } from '../models/messages-repository'
import { getUserByUsername } from '../models/users-repository'

export const loadMessages = async () => {
    return await getAllMessages()
}

export const saveMessage = async (text: string, user: JwtPayload) => {
    const date = new Date().toISOString()
    await createMessage(text, user.id, date)
    return await loadMessages()
}