import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config()

export const client = neon(process.env.DATABASE_URL || '')
export const db = drizzle(client, { schema, logger: true })
