import React, { useState } from "react";
import axios from 'axios'
import { Box, Button, Center, Heading, Input, Text, useAccordion } from "@chakra-ui/react";
import { RoomItem } from "@chat-app/shared";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const token = localStorage.getItem("chat-app-token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default function RoomModal(props: { username: string, 
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setRooms: React.Dispatch<React.SetStateAction<RoomItem[]>>,
    fetchRooms: any // Fix to something more right than any
}) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('')

  const createRoom = async (title: string) => {
    const payload = {
        title,
        username: props.username
    }
    try {
        await axios.post('/rooms', payload)
        props.setShowModal(false)
        props.setRooms(await props.fetchRooms())
    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data as string)
        }
    }

  }

  return (
    <Center width='100vw' height='100vh' bg='#00000080'>
      <Box width={400} height={300} bg='gray.200' p={10}>
        <Heading as='h3' mb={5}>New Room</Heading>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='Room Title' bg='gray.100' mb={5} />
        <Button onClick={e => createRoom(title)} mb={5}>Create Room</Button>
        {error && <Text color='red.600'>{error}</Text>}
      </Box>
    </Center>
  );
}
