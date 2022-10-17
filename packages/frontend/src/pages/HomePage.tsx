import React, { useState, useEffect } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RoomItem, ServerItem } from "@chat-app/shared";
import { Heading, Text, Link, Button, HStack, Flex, Box } from "@chakra-ui/react";
import RoomModal from "../components/RoomModal";
import ServersList from "../components/ServersList";
import RoomsList from "../components/RoomsList";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

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

export type userType = {
  username: string;
  id: number;
};

const fetchUser = async () => {
  try {
    const response = await axios.get("/users/me");
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchServers = async () => {
  try {
    const response = await axios.get("/servers");
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchRoomsOnServer = async (serverId: number) => {
  try {
    const response = await axios.get(`servers/rooms/${serverId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export default function HomePage() {
  const [user, setUser] = useState<userType>({ username: "", id: 0 });
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [currentRoom, setCurrentRoom] = useState<RoomItem>({ title: "" });
  const [currentServer, setCurrentServer] = useState<string>('')
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then((res) => {
      if (res.username) {
        setUser(res);
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    fetchServers().then(setServers);
  }, []);

  const handleOnClickServer = async (serverId: number, serverTitle: string) => {
    const fetchedRooms = await fetchRoomsOnServer(serverId);
    setRooms(fetchedRooms);
    setCurrentServer(serverTitle)
    setCurrentRoom({ title: "" });
  };

  return (
    <Box>
      <Navbar username={user.username} />
      <Flex>
        <ServersList servers={servers} onClick={handleOnClickServer} />
        <RoomsList rooms={rooms} currentServer={currentServer} setCurrentRoom={setCurrentRoom} />
        <Chat room={currentRoom} user={user} />

        {/* {showModal && <RoomModal username={user.username} setShowModal={setShowModal} setRooms={setRooms} fetchRooms={fetchRooms} />} */}

        {/* <Button onClick={e => setShowModal(true)}>Create Room</Button> */}
      </Flex>
    </Box>
  );
}
