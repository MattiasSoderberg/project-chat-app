import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Box>
      <Heading>Chat-App</Heading>

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </Box>
  );
}

export default App;
