import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";

export default function Navbar(props: { username: string }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('chat-app-token')
        navigate('/')
    }

  return (
    <Flex height="5vh" bg="gray.500" px={3} justify="space-between" alignItems="center">
      <Heading>Hi {props.username}!</Heading>
      <Button onClick={handleLogout}>Log Out</Button>
    </Flex>
  );
}
