import React from "react";
import axios from "axios";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { RoomItem } from "@chat-app/shared";

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

export default function RoomsList(props: {rooms: RoomItem[], currentServer: string, setCurrentRoom: React.Dispatch<React.SetStateAction<RoomItem>> }) {
  return (
    <VStack height="95vh" width="15vw" bg="gray.200" p={2}>
      <Heading as="h2" size="lg">{props.currentServer}</Heading>
      {props.rooms.length > 0 ? props.rooms.map(room => {
        return <Button key={room.id} onClick={e => props.setCurrentRoom(room)}>{room.title}</Button>
      }): <Text>{props.currentServer ? 'No Availabe Rooms' : 'Select a server'}</Text>}
    </VStack>
  );
}
