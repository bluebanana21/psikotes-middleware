import * as dotenv from 'dotenv';
import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true
});

db.connect(function(err: any){
    if (err){
        console.error(`error: ${err} `);
    } else {
        console.info("Connected to Database")
    }
});

export default db;