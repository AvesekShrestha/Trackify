import mongoose from "mongoose";
import { databaseUri } from "../constant";

const connectDatabase = async()=>{
    try{
        const connection = mongoose.connection

        connection.on("error" , (error)=>{
            console.error(error)
        })

        connection.on("connected" , ()=>{
            console.log("Database connected!!")
        })

        await mongoose.connect(`${databaseUri}`)

    }catch(error : any){
        console.error(error)
        throw error
    }
}


export default connectDatabase

