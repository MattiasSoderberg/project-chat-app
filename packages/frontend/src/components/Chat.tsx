import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import {
    Heading,
    Input,
    Button,
    Box,
    Flex,
} from '@chakra-ui/react'
import { MessageItem, RoomItem } from '@chat-app/shared'
import MessageList from '../components/MessageList'
import { userType } from '../pages/HomePage'

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

const fetchMessages = async (roomId: number): Promise<MessageItem[]> => {
    if (roomId) {
        const response = await axios.get(`/messages/${roomId}`)
        return response.data
    } else {
        return []
    }
}

export default function Chat(props: {room: RoomItem, user: userType}) {
    const [messageList, setMessageList] = useState<MessageItem[]>([])
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')

    const sendMessage = async (text: string, authorId: number, roomId: number): Promise<void> => {
        const payload = {
            text: text,
            author: authorId,
            room: roomId
        }
        setInputText('')
        try {
            await axios.post('/messages', payload)
            setMessageList(await fetchMessages(props.room.id as number))
        } catch (err) {
            setError((err as AxiosError).response?.data as string)
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('chat-app-token')
    }

    useEffect(() => {
        fetchMessages(props.room.id as number)
            .then(setMessageList)
            .catch(err => {
                setMessageList([])
                setError("Couldn't fetch messages...")
            })
    }, [props.room.id])

    return (
        <Box p={10}>
            <Heading>Chat</Heading>
            <Flex direction='column' gap={2}>
                <MessageList messages={messageList} user={props.user} />
            </Flex>
                <Input value={inputText} onChange={e => setInputText(e.target.value)} />
                <Button onClick={e => sendMessage(inputText, props.user.id, props.room.id as number)} isDisabled={!inputText}>Send</Button>
                {/* <Button as={Link} to='/home'>Home</Button>
                <Button onClick={handleLogout}>Log Out</Button> */}
        </Box>
    )
}
