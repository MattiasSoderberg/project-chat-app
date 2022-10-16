import { pool } from './db'
import { sql, UniqueIntegrityConstraintViolationError } from 'slonik'
import { JwtPayload } from 'jsonwebtoken'


export const createServerTable = async () => {
    (await pool).connect(async connection => {
        const server = await connection.query(sql`
        CREATE TABLE IF NOT EXISTS servers (
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

export const createServersUsersTable = async () => {
    (await pool).connect(async connection => {
        await connection.query(sql`
            CREATE TABLE IF NOT EXISTS servers_users (
                server_id INT NOT NULL,
                user_id INT NOT NULL,
                PRIMARY KEY (server_id, user_id),
                FOREIGN KEY (server_id)
                    REFERENCES servers (id)
                    ON DELETE CASCADE,
                FOREIGN KEY (user_id)
                    REFERENCES users (id)
                    ON DELETE CASCADE
            )
        `)
    })
}

export const createServer = async (title: string, user: JwtPayload, slug: string) => {
    return (await pool).connect(async connection => {
        try {
            const server = await connection.one(sql`
                INSERT INTO servers (title, owner, slug)
                VALUES (${title}, ${user.username}, ${slug})
                RETURNING *
            `)
            await connection.query(sql`INSERT INTO servers_users (server_id, user_id) VALUES (${server.id}, ${user.id})`)
        } catch (err) {
            if (err instanceof UniqueIntegrityConstraintViolationError) {
                console.error(err.message)
            } else {
                console.error(err)
            }
        }
    })
}

export const getAllSevers = async () => {
    return (await pool).connect(async connection => {
        return await connection.any(sql`SELECT * FROM servers`)
    })
}