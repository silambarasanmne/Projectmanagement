import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306');
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'epm_suite_db';

let pool = null;

export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true
    });
  }
  return pool;
};

export const initializeDatabase = async () => {
  try {
    // Step 1: Create connection without database to create target DB if missing
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true
    });

    console.log(`🔌 Connecting to MySQL server at ${DB_HOST}:${DB_PORT}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    // Step 2: Read schema SQL file and execute initialization
    const schemaPath = path.join(__dirname, '../scripts/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(sql);
      console.log(`✅ MySQL Database "${DB_NAME}" and tables initialized successfully!`);
    }
    await connection.end();

    // Instantiate Pool
    getPool();
    return true;
  } catch (err) {
    console.warn(`⚠️ MySQL Connection Warning: Could not connect to MySQL server at ${DB_HOST}:${DB_PORT} (${err.message}).`);
    console.warn(`ℹ️ App will continue with local memory fallback.`);
    return false;
  }
};
