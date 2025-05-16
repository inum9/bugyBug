import dotenv  from "dotenv";
import app from "../app.js";
import connectDb from "./config/db.js";
const port= process.env.Port||8000;

dotenv.config({
    path: './.env'
});

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
        
    })
});