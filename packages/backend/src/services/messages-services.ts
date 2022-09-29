// import { MessageItem } from '@chat-app/shared'
import { getAllMessages } from '../models/messages-repository'

export const loadMessages = async () => {
    return await getAllMessages()
}