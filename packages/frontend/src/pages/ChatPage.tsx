import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Message from '../components/Message'

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

type messageItem = {
    id: number,
    text: string,
    username: string
}

type userType = {
    username: string,
    id: number
}

const fetchMessages = async () => {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('chat-app-token')}`
    //     }
    // }
    const response = await axios.get('/messages')
    return response.data.rows
}

const fetchUser = async () => {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('chat-app-token')}`
    //     }
    // }
    const response = await axios.get('/users/me')
    return response.data
}

export default function ChatPage() {
    const [messageList, setMessageList] = useState<messageItem[]>([])
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')
    const [user, setUser] = useState<userType>({ username: '', id: 0 })
    const navigate = useNavigate()


    const sendMessage = async (text: string, authorId: number): Promise<void> => {
        const payload = {
            text: text,
            author: authorId
        }
        setInputText('')
        await axios.post('/messages', payload)
        setMessageList(await fetchMessages())

    }

    const handleLogout = () => {
        localStorage.removeItem('chat-app-token')
        setUser({ username: '', id: 0 })
        navigate('/')
    }

    useEffect(() => {
        fetchUser()
            .then(setUser)
            .catch(err => {
                setError('Coldn´t fetch user')
            })
    }, [])

    useEffect(() => {
        fetchMessages()
            .then(setMessageList)
            .catch(err => {
                setMessageList([])
                setError('Couldn´t fetch messages...')
            })
    }, [])


    return (
        <Box p={10}>
            <Heading>Chat</Heading>
            <Flex direction='column' gap={2}>
                {messageList.length > 0 ? messageList.map(message => {
                    return <Message key={message.id} username={message.username} text={message.text} loggedInUser={user.username} />
                }) : <Text>Loading messages...</Text>}
            </Flex>
                <Input value={inputText} onChange={e => setInputText(e.target.value)} />
                <Button onClick={e => sendMessage(inputText, user.id)}>Send</Button>
                <Button onClick={handleLogout}>Log Out</Button>
        </Box>
    )
}
