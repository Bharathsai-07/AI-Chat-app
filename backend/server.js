import 'dotenv/config';
import http from "http";
import app from "./app.js";
import{Server} from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import userModel from "./models/user.model.js";

const port =process.env.PORT ||3000;

const server=http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.use(async(socket,next)=>{
    try{
        const token = socket.handshake.auth?.token
            || socket.handshake.headers.authorization?.split(' ')[1]
            || socket.handshake.query?.token;
        const projectId=socket.handshake.query?.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid Project'));
        }

        if(!token){
            return next(new Error('Authentication error: token is required'))
        }
        const decoded=jwt.verify(token,process.env.JWT);
        
        if(!decoded){
            return next(new Error('Authentication error'))
        }
        const project = await projectModel.findById(projectId)
        if (!project) {
            return next(new Error('Project not found'))
        }

        const user = await userModel.findOne({ email: decoded.email }).select('_id email')
        if (!user || !project.users.some((projectUserId) => projectUserId.equals(user._id))) {
            return next(new Error('User is not a project member'))
        }

        socket.project=project
        socket.user=user;
        next();
    }catch(error){
        console.error('Socket.IO authentication error:', error.message);
        next(error);
    }
})

io.on('connection', socket => {
    console.log("a user connected");
    socket.roomId=socket.project._id.toString()

  socket.join(socket.roomId);

socket.on('project-message', (data)=>{
    console.log(data);
    socket.broadcast.to(socket.roomId).emit('project-message', data);
})

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

io.engine.on('connection_error', error => {
    console.error('Socket.IO connection error:', error.message);
});


server.listen(port,()=>{
    console.log('server is running');
})