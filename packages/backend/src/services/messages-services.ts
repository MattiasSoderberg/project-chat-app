// import { MessageItem } from '@chat-app/shared'
import { JwtPayload } from 'jsonwebtoken'
import { createMessage, getAllMessages } from '../models/messages-repository'
import { getUserByUsername } from '../models/users-repository'

export const loadMessages = async () => {
    return await getAllMessages()
}

export const saveMessage = async (text: string, user: JwtPayload) => {
    await createMessage(text, user.id)
    return await loadMessages()
}