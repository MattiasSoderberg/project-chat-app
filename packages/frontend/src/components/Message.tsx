import React from 'react'
import {
    Heading,
    Text,
    Flex
} from '@chakra-ui/react'

export default function Message({...props}) {
    return (
        <Flex direction='column'>
            <Heading as='h3' size='md'>{props.username}</Heading>
            <Text>{props.text}</Text>
        </Flex>
    )
}
