import React, { useState, useEffect, useReducer } from "react";
import axios, { AxiosError } from "axios";
import {
  Heading,
  Input,
  Button,
  Box,
  Flex,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { MessageItem, RoomItem } from "@chat-app/shared";
import MessageList from "../components/MessageList";
import { userType } from "../pages/HomePage";
import { Socket } from "socket.io-client";

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

type MessageAction = {
  type: "add" | "replace";
  message?: MessageItem;
  messages?: MessageItem[];
};

const messageReducer = (state: MessageItem[], action: MessageAction) => {
  if (action.type === "add" && action.message) {
    return [...state, action.message];
  } else if (action.type === "replace" && action.messages) {
    return action.messages;
  } else {
    return state;
  }
};

export default function Chat(props: {
  room: RoomItem;
  user: userType;
  socket: Socket;
}) {
  const [messageList, dispatch] = useReducer(messageReducer, []);
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
      const response = await axios.post("/messages", payload);

      props.socket.emit("message", props.room.id, response.data);
    } catch (err) {
      console.log((err as AxiosError).response?.data as string);
    }
  };

  useEffect(() => {
    props.socket.on("messages", (messages) => {
      dispatch({ type: "replace", messages });
    });
    props.socket.on("message", (message) => {
      dispatch({ type: "add", message });
    });

    return () => {
      props.socket.off("messages");
      props.socket.off("message");
    };
  }, [props.socket]);

  return (
    <>
      <Box bg="gray.700" height="95vh" width="75vw" p={2} color="white">
        {props.room.title ? (
          <Flex direction="column" height="100%">
            <Heading mb={2}>{props.room.title}</Heading>
            <Flex
              direction="column"
              gap={2}
              overflowY="scroll"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                  borderRadius: "8px",
                  backgroundColor: `gray.500`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `gray.500`,
                },
              }}
            >
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
