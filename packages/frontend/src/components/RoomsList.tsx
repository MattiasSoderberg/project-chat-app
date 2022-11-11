import React from "react";
import axios from "axios";
import { Socket } from "socket.io-client";
import { Box, Button, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
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
    <Box height="95vh" width="15vw" bg="gray.400" p={5}>
      {props.currentServer.title ? (
        <VStack height="100%">
          <Heading as="h2" size="lg">
            {props.currentServer.title}
          </Heading>
          {props.rooms.length > 0 ? (
            props.rooms.map((room) => {
              return (
                <Button
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
          <Spacer />
          <Button
            bg="gray.600"
            color="gray.100"
            _hover={{ bg: "gray.100", color: "black" }}
            onClick={(e) => props.setShowRoomModal(true)}
          >
            Create Room
          </Button>
        </VStack>
      ) : (
        <Text>Select a Server</Text>
      )}
    </Box>
  );
}
