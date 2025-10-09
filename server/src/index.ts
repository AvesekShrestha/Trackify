import express , {Request , Response} from "express"
import cors from "cors"
import { port } from "./config/constant"
import connectDatabase from "./config/database"
import errorMiddleware from "./middleware/error.middleware"
import router from "./routes"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { initalizeSocket } from "./config/socket" 


connectDatabase()

const app = express()
const server = createServer(app)

initalizeSocket(server)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use("/api", router)

app.get("/health",  (req : Request , res : Response)=>{
    res.send("Working!!")
})


server.listen(port, ()=>{
   console.log(`App listining at port : ${port}`) 
})

app.use(errorMiddleware)
