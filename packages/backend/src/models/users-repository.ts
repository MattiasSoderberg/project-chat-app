import { pool } from './db'
import { sql, UniqueIntegrityConstraintViolationError } from 'slonik'

export const createUsersTable = async () => {
    return (await pool).connect(async connection => {
        return await connection.query(sql`
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            username VARCHAR NOT NULL UNIQUE,
            password VARCHAR NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        )
        `)
    })
}

export const getUsers = async () => {
    return (await pool).connect(async (connection) => {
        return await connection.query(sql`SELECT * FROM users`)
    })
}

export const createUser = async (username: string, password: string, date: string) => {
    return (await pool).connect(async connection => {
        try {
            return await connection.query(sql`INSERT INTO users (username, password, created_at)
            VALUES (${username}, ${password}, ${date})`)
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
        return await connection.query(sql`SELECT * FROM users WHERE username = ${username}`)
    })
}

export const getUserByUsernameWithMessages = async (username: string) => {  // TODO fix messages returned from db
    return (await pool).connect(async connection => {
        return await connection.query(sql`SELECT users.id, username, created_at, text 
        FROM users
        LEFT JOIN messages
        ON users.id = messages.author
        WHERE username = ${username}`)
    })
}