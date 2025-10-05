import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/sidebar";

export default function SidebarLayout() {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-4 overflow-auto transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
}
