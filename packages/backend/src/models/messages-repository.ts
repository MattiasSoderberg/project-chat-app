import { pool } from '../db'
import { sql } from 'slonik'

export const getAllMessages = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT m.id, m.text, u.username 
        FROM messages m
        LEFT JOIN users u
        ON author = u.id`)
    })
}

export const getAllMessagesNotByUser = async (authorId: number) => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM messages WHERE id != authorId`)
    })
}

export const getMessagesByUserId = async (authorId: number) => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM messages WHERE author=${authorId}`)
    })
}

export const createMessage = async (text: string, authorId: number) => {
    return (await pool).connect(async (connection) => {
        try {
            return await connection.query(sql`INSERT INTO messages (text, author)
            VALUES (${text}, ${authorId})`)
        } catch (err) {
            console.error(err)
        }
    })
}