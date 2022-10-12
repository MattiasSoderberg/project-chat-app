import { MessageItem } from '@chat-app/shared'
import React from 'react'
import {
    Heading,
    Text,
    Flex
} from '@chakra-ui/react'

function Message (props: {message: MessageItem, loggedInUser: string}) {
    return (
        <>
            {props.message.username === props.loggedInUser ?
                <Flex direction='column' alignItems='end' width="100%">
                    <Heading as='h3' size='md'>{props.message.username}</Heading>
                    <Text>{props.message.text}</Text>
                </Flex>
                : <Flex direction='column' width="100%">
                    <Heading as='h3' size='md'>{props.message.username}</Heading>
                    <Text>{props.message.text}</Text>
                </Flex>}
        </>
    )
}

export default function MessageList(props: { messages: MessageItem[], user: {id: number, username: string}}) {
  return (
    <>
        {props.messages.map(message => {
            return <Message key={message.id} message={message} loggedInUser={props.user.username} />
        })}
    </>
  )
}
