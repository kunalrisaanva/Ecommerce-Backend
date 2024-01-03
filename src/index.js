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
        console.log(`\n ⚙️ Server is running on ${process.env.PORT} ⚙️`);
    });
    app.on('error', (err) => {
        // Handle uncaught exceptions or errors here
        console.error('An error occurred:', err);
        // You might want to perform additional actions like logging or cleanup
      });
}).catch((error)=>{
    console.log("MONGODB CONNECTION FALIED !! :",error)
})






