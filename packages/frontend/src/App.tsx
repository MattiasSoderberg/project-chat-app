import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Box>
      <Heading>Chat-App</Heading>

      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </Box>
  );
}

export default App;
