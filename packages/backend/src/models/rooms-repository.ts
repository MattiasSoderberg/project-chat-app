import { pool } from './db'
import { sql } from 'slonik'


export const createRoomsTable = async () => {
    (await pool).connect(async connection => {
        const room = await connection.query(sql`
        CREATE TABLE IF NOT EXISTS rooms (
            id serial PRIMARY KEY,
            title VARCHAR NOT NULL UNIQUE,
            owner VARCHAR NOT NULL,
            FOREIGN KEY (owner)
                REFERENCES users (username)
                ON DELETE CASCADE
        )
        `)
    })
}