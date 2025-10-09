import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/sidebar";
import { Toaster } from "sonner";
import {io, Socket} from "socket.io-client"
import {useQueryClient} from "@tanstack/react-query";
import { useEffect } from "react";

export default function SidebarLayout() {
    
    const client = useQueryClient()

    useEffect(()=>{
        const socket : Socket = io("http://localhost:8000")
        
        socket.on("income", ()=>{
            console.log("income event triggered")
            client.invalidateQueries({queryKey : ["income"]})
        })
        socket.on("expense" , ()=>{
            client.invalidateQueries({queryKey : ["expense"]})
        })

        return()=>{
            socket.disconnect()
        }
    },[])
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-4 overflow-auto transition-all duration-300">
                <Toaster position="top-right"/>
                <Outlet />
            </main>
        </div>
    );
}
