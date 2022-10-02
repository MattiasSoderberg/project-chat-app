import React, { useState } from 'react'
import { UserCredentials } from '@chat-app/shared'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Heading,
    Input,
    Button
} from '@chakra-ui/react'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (username: string, password: string): Promise<void> => {
        const userCredentials: UserCredentials = {
            username, 
            password
        }
        try {
            const response = await axios.post('/users/login', userCredentials)
            localStorage.setItem('chat-app-token', response.data.token)
            navigate('/chat')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Heading>LoginPage</Heading>
            <form>
                <Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <Input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={e => login(username, password)}>Log in</Button>
            </form>
        </div>
    )
}
