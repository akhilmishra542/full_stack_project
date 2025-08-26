import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({path: "./.env"});

connectDB()

.then(()=> {
    
app.listen(process.env.PORT|| 8000, ()=> {
    console.log(`Server is running on port ${process.env.PORT }`);
})
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
})
    



















// const app = express();

// (async ()=> {
//     try {
//        await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`) 
//    app.on("error", (error)=> {
//          console.error("Error connecting to MongoDB");
//          throw error
//     })

//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     })
// }
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }


// })();
