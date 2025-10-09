import {Server} from "socket.io";
import http from "http"
import ErrorHandler from "../../utils/errorHandler";

let io : Server | null = null

const initalizeSocket = (server : http.Server)=>{
   io = new Server(server, {
        cors : {
            origin : "http://localhost:5173"
        }
    })
}

const getSocketClient = ()=>{
    if(!io) throw new ErrorHandler("Socket not initalized" , 400)
    return io
}

export {initalizeSocket, getSocketClient}

