import dbName from "../constant.js";
import mongoose , { connect } from "mongoose";


const dbConnection = async()=>{
    try {
        const connectionInstence = await connect(`${process.env.DB_URI }/${dbName}`);
        console.log(`\n MONGODB CONNECTED!! HOST:${connectionInstence.connection.host}`)
    } catch (error) {
        console.log("MONGO CONNECTION FAILED:",error);
        process.exit(1);
    }
}

export { dbConnection }




   