import mongoose from "mongoose";

const connectDatabase = async()=>{
    try{
        const connection = mongoose.connection

        connection.on("error" , (error)=>{
            console.error(error)
        })

        connection.on("connected" , ()=>{
            console.log("Database connected!!")
        })

        await mongoose.connect("mongodb://localhost:27017/trackify")

    }catch(error : any){
        console.error(error)
        throw error
    }
}


export default connectDatabase