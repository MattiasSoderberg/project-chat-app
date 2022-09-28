import { pool } from '../db'
import { sql } from 'slonik'

const getAllMessages = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM messages`)
    })
}

const getAllMessagesNotByUser = async (authorId: number) => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM messages WHERE id IS NOT authorId`)
    })
}

const getMessagesByUserId = async (authorId: number) => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM messages WHERE author=${authorId}`)
    })
}

const createMessage = async (text: string, authorId: number) => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`INSERT INTO messages (text, author)
        VALUES (${text}, ${authorId})`)
    })
}