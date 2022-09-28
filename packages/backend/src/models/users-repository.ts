import { pool } from '../db'
import { sql } from 'slonik'

export const getUsers = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM users`)
    })
}

export const createUser = async (username: string, password: string): Promise<void> => {
    return (await pool).connect(async connection => {
        await connection.query(sql`INSERT INTO users (username, password)
        VALUES (${username}, ${password})`)
    })
}