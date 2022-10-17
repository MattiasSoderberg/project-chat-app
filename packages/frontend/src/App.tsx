import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

function App() {

  return (
      <Box>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </Box>
  );
}

export default App;
