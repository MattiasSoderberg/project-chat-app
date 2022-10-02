import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';

const UserContext = createContext({})

function App() {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        <Heading as='h1' size='2xl'>Chat-App</Heading>

        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
