import React, { useState } from "react";
import { Box, Button, Center, Heading, Input } from "@chakra-ui/react";

export default function RoomModal(props: { username: string }) {
  const [title, setTitle] = useState("");

  return (
    <Center width='100vw' height='100vh' bg='#00000080'>
      <Box width={400} height={300} bg='gray.200' p={10}>
        <Heading as='h3' mb={5}>New Room</Heading>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='Room Title' bg='gray.100' mb={5} />
        <Button>Create Room</Button>
      </Box>
    </Center>
  );
}
