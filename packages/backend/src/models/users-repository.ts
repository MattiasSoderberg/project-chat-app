import { pool } from '../db'
import { sql } from 'slonik'

export const getUsers = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM users`)
    })
}