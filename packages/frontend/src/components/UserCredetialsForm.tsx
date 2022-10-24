import React from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

type Props = {
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
        type="text"
        placeholder="Username"
        value={props.username}
        onChange={(e) => props.onChangeUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={props.password}
        onChange={(e) => props.onChangePassword(e.target.value)}
      />
      <Button
        width="30%"
        onClick={(e) => props.onSend(props.username, props.password)}
      >
        Log in
      </Button>
    </Flex>
  );
}
