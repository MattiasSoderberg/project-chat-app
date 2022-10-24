import React, { useState } from "react";
import { UserCredentials } from "@chat-app/shared";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCredetialsForm from "../components/UserCredetialsForm";
import FormContainer from "../components/FormContainer";
import { Heading } from "@chakra-ui/react";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async (
    username: string,
    password: string
  ): Promise<void> => {
    const userCredentials: UserCredentials = {
      username,
      password,
    };
    try {
      const response = await axios.post("/users", userCredentials);
      localStorage.setItem("chat-app-token", response.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <Heading as="h2" mb={5}>
        Sign Up
      </Heading>
      <UserCredetialsForm
        buttonText="Sign Up"
        username={username}
        password={password}
        onChangeUsername={setUsername}
        onChangePassword={setPassword}
        onSend={createAccount}
      />
    </FormContainer>
  );
}
