import { pool } from './db'
import { sql, UniqueIntegrityConstraintViolationError } from 'slonik'


export const createRoomsTable = async () => {
    (await pool).connect(async connection => {
        const room = await connection.query(sql`
        CREATE TABLE IF NOT EXISTS rooms (
            id serial PRIMARY KEY,
            title VARCHAR NOT NULL UNIQUE,
            slug VARCHAR NOT NULL UNIQUE,
            server INT NOT NULL,
            FOREIGN KEY (server)
                REFERENCES servers (id)
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

export const getRoomsByServer = async (serverId: number) => {
    return (await pool).connect(async connection => {
        return await connection.any(sql`SELECT * FROM rooms WHERE server = ${serverId}`)
    })
}

export const getRoomById = async (id: number) =>{
    return (await pool).connect(async connection => {
        return await connection.any(sql`
            SELECT * FROM rooms
            LEFT JOIN messages m ON m.room = ${id}
            WHERE rooms.id = ${id}
        `)
    })
}

export const createRoom = async (title: string, serverId: number, owner: string, slug: string) => {
    return (await pool).connect(async connection => {
        try {
            return await connection.query(sql`
                INSERT INTO rooms (title, server, slug)
                VALUES (${title}, ${serverId}, ${slug})
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