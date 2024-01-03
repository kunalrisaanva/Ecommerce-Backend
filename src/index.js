import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js"
import { app } from "./app.js";



dotenv.config({
    path:"./.env"
})

// database connection 

dbConnection()
.then(()=> {
    app.listen(process.env.PORT || 4000 , ()=> {
        console.log(`⚙️ Server is running on ${process.env.PORT} ⚙️`);
    })
}).catch((error)=>{
    console.log("MONGODB CONNECTION FALIED !! :",error)
})






