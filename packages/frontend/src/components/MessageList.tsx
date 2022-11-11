import { MessageItem } from "@chat-app/shared";
import React from "react";
import { Heading, Text, Flex, HStack } from "@chakra-ui/react";

function MessageContainer(props: { children: JSX.Element[]; bgColor: string }) {
  return (
    <Flex
      direction="column"
      width="100%"
      color="white"
      bg={props.bgColor}
      p={3}
      borderBottom="1px"
      borderColor="gray.800"
    >
      {props.children}
    </Flex>
  );
}

function Message(props: { message: MessageItem; loggedInUser: string }) {
  const date = new Date(props.message.created_at as string);
  const dateString = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

  return (
    <>
      {props.message.author.toString() !== props.loggedInUser.toString() ? (
        <MessageContainer bgColor="gray.700">
          <HStack>
            {props.message.author.toString() !==
            props.loggedInUser.toString() ? (
              <Heading as="h3" size="sm" color="gray.100">
                {props.message.author}
              </Heading>
            ) : (
              <Heading as="h3" size="sm" color="gray.100">
                {props.message.author}
              </Heading>
            )}
            <Text fontSize={12} color="gray.400">
              {dateString}
            </Text>
          </HStack>
          <Text>{props.message.text}</Text>
        </MessageContainer>
      ) : (
        <MessageContainer bgColor="gray.600">
          <HStack>
            {props.message.author.toString() !==
            props.loggedInUser.toString() ? (
              <Heading as="h3" size="sm">
                {props.message.author}
              </Heading>
            ) : (
              <Heading as="h3" size="sm" color="blue.500">
                {props.message.author}
              </Heading>
            )}
            <Text fontSize={12} color="gray.400">
              {dateString}
            </Text>
          </HStack>
          <Text>{props.message.text}</Text>
        </MessageContainer>
      )}
    </>
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
