import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import {
    Heading,
    Input,
    Button,
    Text,
    Box,
    Flex,
    Spacer
} from '@chakra-ui/react'
import { MessageItem } from '@chat-app/shared'
import MessageList from '../components/MessageList'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.interceptors.request.use(config => {
    if (!config?.headers) {
        config.headers = {}
    }
    const token = localStorage.getItem('chat-app-token')
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config
})

const fetchMessages = async (): Promise<MessageItem[]> => {
    const response = await axios.get('/messages')
    return response.data
}

export default function ChatPage() {
    const [messageList, setMessageList] = useState<MessageItem[]>([])
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const sendMessage = async (text: string, authorId: number, roomId: number): Promise<void> => {
        const payload = {
            text: text,
            author: authorId,
            room: roomId
        }
        setInputText('')
        await axios.post('/messages', payload)
        setMessageList(await fetchMessages())

    }

    const handleLogout = () => {
        localStorage.removeItem('chat-app-token')
        navigate('/')
    }

    useEffect(() => {
        fetchMessages()
            .then(setMessageList)
            .catch(err => {
                setMessageList([])
                setError("Couldn't fetch messages...")
            })
    }, [])


    return (
        <Box p={10}>
            <Heading>Chat</Heading>
            <Flex direction='column' gap={2}>
                <MessageList messages={messageList} user={location.state.user} />
            </Flex>
                <Input value={inputText} onChange={e => setInputText(e.target.value)} />
                <Button onClick={e => sendMessage(inputText, location.state.user.id, location.state.room.id)}>Send</Button>
                <Button as={Link} to='/home'>Home</Button>
                <Button onClick={handleLogout}>Log Out</Button>
        </Box>
    )
}
