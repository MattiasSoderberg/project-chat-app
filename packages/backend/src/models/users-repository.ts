import { pool } from '../db'
import { sql, UniqueIntegrityConstraintViolationError } from 'slonik'

export const getUsers = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM users`)
    })
}

export const createUser = async (username: string, password: string) => {
    return (await pool).connect(async connection => {
        try {
            return await connection.query(sql`INSERT INTO users (username, password)
            VALUES (${username}, ${password})`)
        } catch (err) {
            if (err instanceof UniqueIntegrityConstraintViolationError) {
                console.error(err.message)
            } else {
                console.error(err)
            }
        }
    })
}

export const getUserByUsername = async (username: string) => {
    return (await pool).connect(async connection => {
        return await connection.query(sql`SELECT id, username, created_at FROM users WHERE username = ${username}`)
    })
}