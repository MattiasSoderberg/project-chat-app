import { pool } from './db'
import { sql, UniqueIntegrityConstraintViolationError } from 'slonik'


export const createRoomsTable = async () => {
    (await pool).connect(async connection => {
        const room = await connection.query(sql`
        CREATE TABLE IF NOT EXISTS rooms (
            id serial PRIMARY KEY,
            title VARCHAR NOT NULL UNIQUE,
            slug VARCHAR NOT NULL UNIQUE,
            owner VARCHAR NOT NULL,
            FOREIGN KEY (owner)
                REFERENCES users (username)
                ON DELETE CASCADE
        )
        `)
    })
}

export const getAllRooms = async () => {
    return (await pool).connect(async connection => {
        return await connection.any(sql`SELECT * FROM rooms`)
    })
}

export const createRoom = async (title: string, owner: string, slug: string) => {
    return (await pool).connect(async connection => {
        try {
            return await connection.query(sql`
                INSERT INTO rooms (title, owner, slug)
                VALUES (${title}, ${owner}, ${slug})
            `)
        } catch (err) {
            if (err instanceof UniqueIntegrityConstraintViolationError) {
                console.error(err.message)
            } else {
                console.error(err)
            }
        }
    })
}