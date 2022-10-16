import React from "react";
import { Link as ReactLink, generatePath } from 'react-router-dom'
import { Heading, VStack, Link, Button } from "@chakra-ui/react";
import { ServerItem } from "@chat-app/shared";

export default function ServersList(props: { servers: ServerItem[], onClick: (serverId: number) => void }) {
  return (
    <VStack>
      <Heading>ServerList</Heading>
      {props.servers.map(server => {
        return <Button onClick={e => props.onClick(server.id as number)}>{server.title}</Button>
      })}
    </VStack>
  );
}
