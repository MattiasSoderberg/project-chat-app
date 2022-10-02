import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Heading,
    Input,
    Button
} from '@chakra-ui/react'
import Message from '../components/Message'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const fetchMessages = async () => {
    const token = localStorage.getItem('chat-app-token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/messages', config)
    // console.log(response.data.rows[0].text)
    return response.data.rows
}

export default function ChatPage() {
    const [messageList, setMessageList] = useState<{ id: number, text: string, username: string }[]>([])
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')

    // const sendMessage = () => {
    //     const message = {
    //         text: inputText,
    //         author: 
    //     }
    //     axios.post('/messages')
    // }

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
            {messageList.length > 0 && messageList.map(message => {
                return <Message username={message.username} text={message.text} />
            })}
        </div>
    )
}
