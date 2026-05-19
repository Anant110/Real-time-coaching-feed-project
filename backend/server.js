import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import connectRedis from './config/redis.js'
import FeedRouter from './routes/feedRoutes.js'
import { setSocketInstance } from './controllers/feedController.js'

dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',FeedRouter)


const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:'*'
    }
})
setSocketInstance(io)

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Server is Live")
})

const startServer = async () => {
  await connectDB()
  await connectRedis()

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer()
