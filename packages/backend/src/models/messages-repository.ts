import { pool } from './db'
import { sql } from 'slonik'

export const createMessagesTable = async () => {
    (await pool).connect(async (connection) => {
        await connection.query(sql`
        CREATE TABLE IF NOT EXISTS messages (
            id serial PRIMARY KEY,
            text VARCHAR NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            author VARCHAR,
            room INT,
            FOREIGN KEY (author)
                REFERENCES users (username)
                ON DELETE CASCADE,
            FOREIGN KEY (room)
                REFERENCES rooms (id)
                ON DELETE CASCADE
        )
        `)
    })
}

export const getAllMessages = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.any(sql`SELECT m.id, m.text, m.author, u.username
        FROM messages m
        LEFT JOIN users u
        ON m.author = u.username`)
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