import { MessageItem } from "@chat-app/shared";
import React from "react";
import { Heading, Text, Flex, HStack } from "@chakra-ui/react";

function Message(props: { message: MessageItem; loggedInUser: string }) {
  return (
    <Flex direction="column" width="100%">
      <HStack>
        <Heading as="h3" size="md">
          {props.message.author}
        </Heading>
        <Text>{props.message.created_at}</Text>
      </HStack>
      <Text>{props.message.text}</Text>
    </Flex>
  );
}

export default function MessageList(props: {
  messages: MessageItem[];
  user: { id: number; username: string };
}) {
  return (
    <>
      {props.messages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            loggedInUser={props.user.username}
          />
        );
      })}
    </>
  );
}
