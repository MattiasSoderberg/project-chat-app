import React, { useState } from 'react'
import { UserCredentials } from '@chat-app/shared'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Heading,
    Input,
    Button,
} from '@chakra-ui/react'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export default function ChatPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const createAccount = async (username: string, password: string): Promise<void> => {
        const userCredentials: UserCredentials = {
            username, 
            password
        }
        try {
            const response = await axios.post('/users', userCredentials)
            localStorage.setItem('chat-app-token', response.data.token)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Heading as='h2'>Sign Up Page</Heading>
            <form>
                <Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <Input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={e => createAccount(username, password)}>Sign Up</Button>
            </form>
        </div>
    )
}
