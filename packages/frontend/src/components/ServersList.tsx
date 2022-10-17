import React from "react";
import { Link as ReactLink, generatePath } from 'react-router-dom'
import { Heading, VStack, Link, Button } from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

export default function ServersList(props: { servers: ServerItem[], onClick: (serverId: number, serverTitle: string) => void }) {
  return (
    <VStack height="95vh" width="10vw" bg="gray.300" p={2}>
      <Heading as="h2" size="lg">ServerList</Heading>
      {props.servers.map(server => {
        return <Button key={server.id} onClick={e => props.onClick(server.id as number, server.title)}>{server.title}</Button>
      })}
    </VStack>
  );
}
