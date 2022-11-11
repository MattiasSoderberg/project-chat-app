import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import {
  Box,
  Button,
  Heading,
  Spacer,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { RoomItem, ServerItem } from "@chat-app/shared";

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

export default function RoomsList(props: {
  rooms: RoomItem[];
  currentServer: ServerItem;
  setCurrentRoom: (room: RoomItem) => void;
  setShowRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}) {
  return (
    <Box height="95vh" width="15vw" bg="gray.600">
      {props.currentServer.title ? (
        <Flex direction="column" height="100%">
          <Flex direction="column" p={5}>
            <Heading as="h2" size="lg" fontSize="28px" mb={5}>
              {props.currentServer.title}
            </Heading>
            <Flex direction="column" height="100%" gap={3}>
              {props.rooms.length > 0 ? (
                props.rooms.map((room) => {
                  return (
                    <Button
                      alignSelf="start"
                      _hover={{ bg: "gray.600", color: "gray.100" }}
                      key={room.id}
                      onClick={(e) => props.setCurrentRoom(room)}
                    >
                      {room.title}
                    </Button>
                  );
                })
              ) : (
                <Text>No Availabe Rooms</Text>
              )}
            </Flex>
          </Flex>
          <Spacer />
          <Center bg="gray.900" p={5}>
            <Button
              bg="gray.600"
              color="gray.50"
              boxShadow="inner"
              _hover={{ bg: "gray.300", color: "black" }}
              onClick={(e) => props.setShowRoomModal(true)}
            >
              Create Room
            </Button>
          </Center>
        </Flex>
      ) : (
        <Text>Select a Server</Text>
      )}
    </Box>
  );
}
