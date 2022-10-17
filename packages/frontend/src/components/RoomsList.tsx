import React from "react";
import axios from "axios";
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
  setCurrentRoom: React.Dispatch<React.SetStateAction<RoomItem>>;
  setShowRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Box height="95vh" width="15vw" bg="gray.200" p={2}>
      {props.currentServer.title ? (
        <VStack height="100%">
          <Heading as="h2" size="lg">
            {props.currentServer.title}
          </Heading>
          {props.rooms.length > 0 ? (
            props.rooms.map((room) => {
              return (
                <Button
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
          <Button onClick={(e) => props.setShowRoomModal(true)}>
            Create Room
          </Button>
        </VStack>
      ) : (
        <Text>Select a Server</Text>
      )}
    </Box>
  );
}
