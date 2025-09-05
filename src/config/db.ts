import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2';

dotenv.config();

export const connection = createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true,
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else{
        console.log("connected to database")
    }
})

export default connection;