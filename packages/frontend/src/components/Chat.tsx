import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  Heading,
  Input,
  Button,
  Box,
  Flex,
  Text,
  HStack,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { MessageItem, RoomItem } from "@chat-app/shared";
import MessageList from "../components/MessageList";
import { userType } from "../pages/HomePage";

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

const fetchMessages = async (roomId: number): Promise<MessageItem[]> => {
  if (roomId) {
    const response = await axios.get(`/messages/${roomId}`);
    return response.data;
  } else {
    return [];
  }
};

export default function Chat(props: { room: RoomItem; user: userType }) {
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [error, setError] = useState("");
  const [inputText, setInputText] = useState("");

  const sendMessage = async (
    text: string,
    authorId: number,
    roomId: number
  ): Promise<void> => {
    const payload = {
      text: text,
      author: authorId,
      room: roomId,
    };
    setInputText("");
    try {
      await axios.post("/messages", payload);
      setMessageList(await fetchMessages(props.room.id as number));
    } catch (err) {
      setError((err as AxiosError).response?.data as string);
    }
  };

  useEffect(() => {
    fetchMessages(props.room.id as number)
      .then(setMessageList)
      .catch((err) => {
        setMessageList([]);
        setError("Couldn't fetch messages...");
      });
  }, [props.room.id]);

  return (
    <>
      <Box bg="gray.700" height="95vh" width="75vw" p={2} color="white">
        {props.room.title ? (
          <Flex direction="column" height="100%">
            <Heading mb={2}>{props.room.title}</Heading>
            <Flex direction="column" gap={2}>
              <MessageList messages={messageList} user={props.user} />
            </Flex>
            <Spacer />
            <HStack>
              <Input
                bg="gray.400"
                color="black"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                colorScheme="blue"
                onClick={(e) =>
                  sendMessage(inputText, props.user.id, props.room.id as number)
                }
                isDisabled={!inputText}
              >
                Send
              </Button>
            </HStack>
          </Flex>
        ) : (
          <Text>Enter a room to chat!</Text>
        )}
      </Box>
    </>
  );
}
