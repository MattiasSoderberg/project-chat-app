import React, { useState, useEffect } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RoomItem } from "@chat-app/shared";
import { Heading, Text, Link, Button } from "@chakra-ui/react";
import RoomModal from "../components/RoomModal";

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

type userType = {
  username: string;
  id: number;
};

const fetchUser = async () => {
  try {
    const response = await axios.get("/users/me");
    // console.log("Response", response);
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchRooms = async () => {
  try {
    const response = await axios.get("/rooms");
    return response.data;
  } catch (err) {
    return err;
  }
};

export default function HomePage() {
  const [user, setUser] = useState<userType>({ username: "", id: 0 });
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [showModal, setShowModal] = useState(false)
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
    fetchRooms().then(setRooms);
  }, []);

  return (
    <div>
      <Heading as="h2">Hi {user.username}!</Heading>
      <Text>Enter a room and start chating!</Text>
      {rooms.map((room) => {
        return (
          <Link as={ReactLink} to={`/chat/${room.slug}`} state={{user, room}} key={room.id}>
            {room.title}
          </Link>
        );
      })}
      
      {showModal && <RoomModal username={user.username} />}
      
      <Button onClick={e => setShowModal(true)}>Create Room</Button>
    </div>
  );
}
