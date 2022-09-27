import { createPool, sql } from 'slonik'
import dotenv from 'dotenv'

dotenv.config()

const POSTGRES_URI: string = String(process.env.POSTGRES_URI)

export const pool = createPool(POSTGRES_URI)