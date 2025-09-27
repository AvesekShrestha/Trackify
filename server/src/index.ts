import express , {Request , Response} from "express"
import cors from "cors"
import { port } from "./config/constant"
import connectDatabase from "./config/database"
import errorMiddleware from "./middleware/error.middleware"
import router from "./routes"

connectDatabase()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", router)

app.get("/health",  (req : Request , res : Response)=>{
    res.send("Working!!")
})


app.listen(port, ()=>{
   console.log(`App listining at port : ${port}`) 
})

app.use(errorMiddleware)