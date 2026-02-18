
import dotenv from 'dotenv';
dotenv.config();

const config = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    // DATABASE_URL is provided by Railway and is the simplest way to connect
    url: process.env.DATABASE_URL,
};

export default config;
