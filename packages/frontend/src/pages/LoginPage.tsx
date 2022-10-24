import React, { useState } from "react";
import { UserCredentials } from "@chat-app/shared";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import axios from "axios";
import UserCredetialsForm from "../components/UserCredetialsForm";
import { Heading, Link } from "@chakra-ui/react";
import FormContainer from "../components/FormContainer";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    const userCredentials: UserCredentials = {
      username,
      password,
    };
    try {
      const response = await axios.post("/users/login", userCredentials);
      if (response.data.token) {
        localStorage.setItem("chat-app-token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <Heading as="h2" mb={5}>
        Login
      </Heading>
      <UserCredetialsForm
        username={username}
        password={password}
        onChangeUsername={setUsername}
        onChangePassword={setPassword}
        onSend={login}
      />
      <Link as={ReactLink} to="/signup">
        Get a username and start chating!
      </Link>
    </FormContainer>
  );
}
