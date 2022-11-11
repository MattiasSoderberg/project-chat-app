import React from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

type Props = {
  buttonText: string;
  username: string;
  password: string;
  onChangeUsername: (username: string) => void;
  onChangePassword: (password: string) => void;
  onSend: (username: string, password: string) => void;
};

export default function UserCredetialsForm(props: Props) {
  return (
    <Flex width="70%" direction="column" gap={3}>
      <Input
        bg="gray.300"
        type="text"
        placeholder="Username"
        value={props.username}
        onChange={(e) => props.onChangeUsername(e.target.value)}
      />
      <Input
        bg="gray.300"
        type="password"
        placeholder="Password"
        value={props.password}
        onChange={(e) => props.onChangePassword(e.target.value)}
      />
      <Button
        width="30%"
        bg="gray.600"
        color="white"
        _hover={{ bg: "gray.100", color: "black" }}
        onClick={() => props.onSend(props.username, props.password)}
      >
        {props.buttonText}
      </Button>
    </Flex>
  );
}
