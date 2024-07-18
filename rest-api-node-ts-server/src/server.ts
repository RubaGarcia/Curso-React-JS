import express from "express";
import router from "./router";
import db from "./config/db";
import colors  from "colors";


export async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        // console.log(colors.bgGreen.white('DB connected'));
    } catch (error) {
        console.log(colors.bgRed.white('Error connecting to DB'));
        // console.log(error);
    }
}
connectDB()




const server = express();

server.use(express.json());


server.use('/api/products', router)

server.get('/api',(req, res) =>{
    res.json({msg: 'Welcome to the API'})
})

export default server;