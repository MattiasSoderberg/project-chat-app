import React from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children: JSX.Element[];
};

export default function FormContainer(props: Props) {
  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
    >
      <Flex
        direction="column"
        width="50%"
        height="50%"
        justifyContent="center"
        alignItems="center"
        border="1px"
        borderColor="gray.100"
        borderRadius={4}
        boxShadow="dark-lg"
        bg="gray.400"
      >
        {props.children}
      </Flex>
    </Flex>
  );
}
