import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Heading,
    Input,
    Button,
    Text
} from '@chakra-ui/react'
import Message from '../components/Message'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

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
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('chat-app-token')}`
        }
    }
    const response = await axios.get('/messages', config)
    // console.log(response.data.rows[0].text)
    return response.data.rows
}

const fetchUser = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('chat-app-token')}`
        }
    }
    const response = await axios.get('/users/me', config)
    return response.data
}

export default function ChatPage() {
    const [messageList, setMessageList] = useState<messageItem[]>([])
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')
    const [user, setUser] = useState<userType>({username: '', id: 0})
    const navigate = useNavigate()


    const sendMessage = async (text: string, authorId: number): Promise<void>=> {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('chat-app-token')}`
            }
        }
        const payload = {
            text: text,
            author: authorId
        }
        console.log(payload, config)
        await axios.post('/messages', payload, config)
        // const messages = await fetchMessages()
        setMessageList(await fetchMessages())

    }

    const handleLogout = () => {
        console.log(user)
        localStorage.removeItem('chat-app-token')
        setUser({username: '', id: 0})
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
        <div>
            <Heading>Chat</Heading>
            {messageList.length > 0 ? messageList.map(message => {
                return <Message key={message.id} username={message.username} text={message.text} />
            }): <Text>Loading messages...</Text>}
            <Input value={inputText} onChange={e => setInputText(e.target.value)} />
            <Button onClick={e => sendMessage(inputText, user.id)}>Send</Button>
            <Button onClick={handleLogout}>Log Out</Button>
        </div>
    )
}
