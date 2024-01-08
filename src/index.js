import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js"
import { app } from "./app.js";
// import cluster from 'node:cluster';
// import os from "os";

// const cpusLength = os.cpus().length

dotenv.config({
    path:"./.env"
})

// database connection 

dbConnection()
.then(()=> {
    app.listen(process.env.PORT || 4000 , ()=> {
        console.log(`\n ⚙️ Server is running on ${process.env.PORT} And PID ${process.pid} ⚙️`);
    });
    app.on('error', (err) => {
        // Handle uncaught exceptions or errors here
        console.error('An error occurred:', err);
        // You might want to perform additional actions like logging or cleanup
      });
}).catch((error)=>{
    console.log("MONGODB CONNECTION FALIED !! :",error)
})


// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);
  
//     // Fork workers.
//     for (let i = 0; i < cpusLength; i++) {
//       cluster.fork();
//     }
  
//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`worker ${worker.process.pid} died`);
//     });
// } else {

 
  
//     console.log(`Worker ${process.pid} started`);
//   }




