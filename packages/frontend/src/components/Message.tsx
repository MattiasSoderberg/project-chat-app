import React from 'react'
import {
    Heading,
    Text,
    Flex
} from '@chakra-ui/react'

export default function Message({ ...props }) {
    return (
        <>
            {props.username === props.loggedInUser ?
                <Flex direction='column' alignItems='end' width="100%">
                    <Heading as='h3' size='md'>{props.username}</Heading>
                    <Text>{props.text}</Text>
                </Flex>
                : <Flex direction='column' width="100%">
                    <Heading as='h3' size='md'>{props.username}</Heading>
                    <Text>{props.text}</Text>
                </Flex>}
        </>
    )
}
