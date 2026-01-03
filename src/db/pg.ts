import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: String(process.env.DB_PASSWORD!), // force string
    database: process.env.DB_NAME!
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
