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

export default function RoomsList(props: {rooms: RoomItem[]}) {
  return (
    <VStack>
      <Heading>RoomsList</Heading>
      {props.rooms.length > 0 ? props.rooms.map(room => {
        return <Button>{room.title}</Button>
      }): <Text>No Availabe Rooms</Text>}
    </VStack>
  );
}
