import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

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

export default function ServerModal(props: {
  username: string;
  setShowServerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setServers: React.Dispatch<React.SetStateAction<ServerItem[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchServers: any;
}) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const createServer = async (title: string) => {
    const payload = {
      title,
    };
    try {
      await axios.post("/servers", payload);
      props.setShowServerModal(false);
      props.setServers(await props.fetchServers());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data as string);
      }
    }
  };

  return (
    <Center
      width="100vw"
      height="100vh"
      bg="#00000095"
      position="absolute"
      top={0}
      left={0}
      zIndex={10}
    >
      <Box width={400} height={300} bg="gray.200" p={10}>
        <Heading as="h3" mb={5}>
          New Server
        </Heading>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Server Title"
          bg="gray.100"
          mb={5}
        />
        <HStack mb={5}>
          <Button onClick={() => createServer(title)}>Create Server</Button>
          <Spacer />
          <Button onClick={() => props.setShowServerModal(false)}>
            Close
          </Button>
        </HStack>
        {error && <Text color="red.600">{error}</Text>}
      </Box>
    </Center>
  );
}
