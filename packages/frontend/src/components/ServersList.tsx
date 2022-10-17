import React from "react";
import { Link as ReactLink, generatePath } from "react-router-dom";
import { Heading, VStack, Link, Button, Spacer, Box } from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

export default function ServersList(props: {
  servers: ServerItem[];
  onClick: (server: ServerItem) => void;
  setShowServerModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <VStack height="95vh" width="10vw" bg="gray.300" p={2}>
      <Heading as="h2" size="lg">
        Servers
      </Heading>
      {props.servers.map((server) => {
        return (
          <Button
            key={server.id}
            onClick={(e) => props.onClick(server)}
          >
            {server.title}
          </Button>
        );
      })}
      <Spacer />
      <Box>
        <Button onClick={e => props.setShowServerModal(true)}>Create Server</Button>
      </Box>
    </VStack>
  );
}
