
import { config } from 'dotenv';

config();

export const host = process.env.HOST;
export const database = process.env.DATABASE;
export const user = process.env.USER;
export const password = process.env.PASSWORD;