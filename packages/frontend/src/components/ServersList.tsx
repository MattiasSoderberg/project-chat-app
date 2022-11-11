import React from "react";
import { Heading, VStack, Button, Spacer, Box } from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

export default function ServersList(props: {
  servers: ServerItem[];
  onClick: (server: ServerItem) => void;
  setShowServerModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <VStack height="95vh" width="10vw" bg="gray.500" p={5}>
      <Heading as="h2" size="lg">
        Servers
      </Heading>
      {props.servers.map((server) => {
        return (
          <Button
            _hover={{ bg: "gray.600", color: "gray.100" }}
            key={server.id}
            onClick={(e) => props.onClick(server)}
          >
            {server.title}
          </Button>
        );
      })}
      <Spacer />
      <Box>
        <Button
          bg="gray.600"
          color="gray.100"
          _hover={{ bg: "gray.100", color: "black" }}
          onClick={(e) => props.setShowServerModal(true)}
        >
          Create Server
        </Button>
      </Box>
    </VStack>
  );
}
