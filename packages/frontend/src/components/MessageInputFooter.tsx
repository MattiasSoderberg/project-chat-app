import { Button, HStack, Input } from "@chakra-ui/react";
import { RoomItem } from "@chat-app/shared";
import React from "react";

type Props = {
  text: string;
  room: RoomItem;
  onChange: (text: string) => void;
  onClick: (text: string, roomId: number) => void;
};

export default function MessageInputFooter(props: Props) {
  return (
    <HStack p={5} gap={2}>
      <Input
        bg="gray.400"
        color="black"
        value={props.text}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={`Write something in ${props.room.title}!`}
        data-testid="message-input"
      />
      <Button
        px={5}
        colorScheme="blue"
        onClick={(e) => props.onClick(props.text, props.room.id as number)}
        isDisabled={!props.text}
        data-testid="message-button"
      >
        Send
      </Button>
    </HStack>
  );
}
