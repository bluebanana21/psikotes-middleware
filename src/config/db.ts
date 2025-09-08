import * as dotenv from 'dotenv';

import { createConnection } from 'mysql2';

dotenv.config();

export const connection = createConnection({

    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else{
        console.log("connected to database")
    }
})

db.connect(function(err: any){
    if (err){
        console.error(`error: ${err} `);
    } else {
        console.info("Connected to Database")
    }
});

export default db;

