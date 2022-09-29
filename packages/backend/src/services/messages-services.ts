// import { MessageItem } from '@chat-app/shared'
import { createMessage, getAllMessages } from '../models/messages-repository'
import { getUserByUsername } from '../models/users-repository'

export const loadMessages = async () => {
    return await getAllMessages()
}

export const saveMessage = async (text: string, username: string) => {
    const user = await getUserByUsername(username)
    const userId = Number(user.rows[0].id)
    await createMessage(text, userId)
    return await loadMessages()
}