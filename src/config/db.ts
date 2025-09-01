import * as dotenv from 'dotenv';
import mysql from "mysql2";

dotenv.config();


let db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

db.connect(function(err: any){
    if (err) throw err; 
    console.log("database connected succesfully");
})