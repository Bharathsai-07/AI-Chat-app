import socket from 'socket.io-client';

let socketInstance=null;

export const initializeSocket=(projectId)=>{
    if (socketInstance) {
        socketInstance.disconnect()
    }

    socketInstance=socket(import.meta.env.VITE_API_URL || 'http://localhost:3000',{
        auth:{
            token:localStorage.getItem('token')
        },
        query:{
            projectId
        }
    })
    socketInstance.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error.message)
    })
    return socketInstance;
}

export const receiveMessage=(eventName,cb)=>{
    socketInstance?.on(eventName,cb);
}

export const sendMessage=(eventName,data)=>{
    socketInstance?.emit(eventName,data);
    console.log(data);
}

export const disconnectSocket=()=>{
    socketInstance?.disconnect();
    socketInstance=null;
}