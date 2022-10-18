import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io, Socket } from 'socket.io-client'
import { RoomItem, ServerItem } from "@chat-app/shared";
import {
  Flex,
  Box,
} from "@chakra-ui/react";
import RoomModal from "../components/RoomModal";
import ServersList from "../components/ServersList";
import RoomsList from "../components/RoomsList";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import ServerModal from "../components/ServerModal";

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

let socket: Socket = io()

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
  const [currentRoom, setCurrentRoom] = useState<RoomItem>({ title: "" });
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [currentServer, setCurrentServer] = useState<ServerItem>({ title: "" });
  const [showServerModal, setShowServerModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("chat-app-token") as string
    socket = io('http://localhost:4000', { withCredentials: true, auth: { token: token } })

    return () => {
      socket.disconnect()
    }
  }, [])

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

  const handleOnClickServer = async (server: ServerItem) => {
    const fetchedRooms = await fetchRoomsOnServer(server.id as number);
    setRooms(fetchedRooms);
    setCurrentServer(server);
    setCurrentRoom({ title: "" });
  };

  const handleSetCurrentRoom = (room: RoomItem) => {
    setCurrentRoom(room)
    socket.emit("join-room", room.id)
  }

  return (
    <Box>
      {showRoomModal && (
        <RoomModal
          server={currentServer}
          setShowRoomModal={setShowRoomModal}
          setRooms={setRooms}
          fetchRoomsOnServer={fetchRoomsOnServer}
        />
      )}
      {showServerModal && (
        <ServerModal
          username={user.username}
          setShowServerModal={setShowServerModal}
          setServers={setServers}
          fetchServers={fetchServers}
        />
      )}
      <Navbar username={user.username} />
      <Flex>
        <ServersList
          servers={servers}
          onClick={handleOnClickServer}
          setShowServerModal={setShowServerModal}
        />
        <RoomsList
          rooms={rooms}
          currentServer={currentServer}
          setCurrentRoom={handleSetCurrentRoom}
          setShowRoomModal={setShowRoomModal}
          socket={socket}
        />
        <Chat room={currentRoom} user={user} socket={socket} />

      </Flex>
    </Box>
  );
}
