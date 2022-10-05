import { createPool } from 'slonik'
import { createUsersTable } from './users-repository'
import { createRoomsTable } from './rooms-repository'
import { createMessagesTable } from './messages-repository'
import dotenv from 'dotenv'

dotenv.config()

const POSTGRES_URI: string = String(process.env.POSTGRES_URI)

export const pool = createPool(POSTGRES_URI)
export const setUpTables = async () => {
    await createUsersTable()
    await createRoomsTable()
    await createMessagesTable()
}