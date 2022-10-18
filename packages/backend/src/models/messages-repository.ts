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
        return await connection.any(sql`SELECT m.id, m.text, m.author, m.room
        FROM messages m
        LEFT JOIN users u
        ON m.author = u.username`)
    })
}

export const getMessagesByRoom = async (room: number) => {
    return (await pool).connect(async connection => {
        return await connection.any(sql`SELECT *, created_at AS timestamp, TO_CHAR(created_at, 'YY-MM-DD HH12:MI') created_at FROM messages WHERE room = ${room}`)
    })
}

export const getMessageById = async (id: number) => {
    return (await pool).connect(async connection => {
        return await connection.one(sql`SELECT *, created_at AS timestamp, TO_CHAR(created_at, 'YY-MM-DD HH12:MI') created_at FROM messages WHERE id = ${id}`)
    })
}

export const createMessage = async (text: string, author: string, date: string, room: number) => {
    return (await pool).connect(async (connection) => {
        try {
            return await connection.one(sql`INSERT INTO messages (text, author, created_at, room)
            VALUES (${text}, ${author}, ${date}, ${room}) RETURNING *`)
        } catch (err) {
            console.error(err)
        }
    })
}