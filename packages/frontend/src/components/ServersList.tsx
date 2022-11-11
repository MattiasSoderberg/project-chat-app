import React from "react";
import { Heading, Flex, Button, Spacer, Center } from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

export default function ServersList(props: {
  servers: ServerItem[];
  onClick: (server: ServerItem) => void;
  setShowServerModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Flex direction="column" height="95vh" width="15vw" bg="gray.500">
      <Flex direction="column" p={5}>
        <Heading as="h2" size="lg" fontSize="28px" mb={3}>
          Servers
        </Heading>
        <Flex direction="column" gap={3}>
          {props.servers.map((server) => {
            return (
              <Button
                bg="gray.200"
                alignSelf="start"
                _hover={{ bg: "gray.600", color: "gray.200" }}
                key={server.id}
                onClick={(e) => props.onClick(server)}
              >
                {server.title}
              </Button>
            );
          })}
        </Flex>
      </Flex>
      <Spacer />
      <Center bg="gray.900" p={5}>
        <Button
          bg="gray.600"
          color="gray.50"
          boxShadow="inner"
          _hover={{ bg: "gray.300", color: "black" }}
          onClick={(e) => props.setShowServerModal(true)}
        >
          Create Server
        </Button>
      </Center>
    </Flex>
  );
}
