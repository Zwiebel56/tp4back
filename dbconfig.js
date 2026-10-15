import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const dbconfig = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: true
};

const pool = new Pool(dbconfig);

export default pool;