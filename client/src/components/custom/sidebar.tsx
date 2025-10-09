import React from "react";
import { Home, TrendingUp, Wallet, LogOut, Menu , Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/context/userContext";
import api from "@/utils/axios";
import { useNavigate } from "react-router-dom";

type NavItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
};

const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
    { id: "income", label: "Income", icon: <TrendingUp size={16} />, href: "/income" },
    { id: "expense", label: "Expense", icon: <Wallet size={16} />, href: "/expense" },
    { id: "setting", label: "Setting", icon: <Settings size={16} />, href: "/setting" },

];
export default function Sidebar() {

    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn : async()=>{
            await api.post("/auth/logout")
        },
        onSuccess(){
            navigate("/login")
            setUser(null)
        }
    })

    const location = useLocation();
    const [collapsed, setCollapsed] = React.useState(false);

    const {user, setUser} = useUser()

    const activePath = location.pathname.split("/")[1] || "dashboard";

    return (
        <aside
            className={`flex flex-col h-screen bg-background border-r transition-[width] duration-200 ease-in-out w-20 lg:w-72 ${collapsed ? "!w-20" : "lg:!w-72"
                }`}
        >
            {/* Top header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center gap-3 font-semibold tracking-tight text-lg opacity-0 pointer-events-none w-0 lg:opacity-100 lg:pointer-events-auto lg:w-auto transition-all duration-200"
                        style={{
                            opacity: collapsed ? 0 : undefined,
                            pointerEvents: collapsed ? "none" : undefined,
                            width: collapsed ? 0 : undefined,
                        }}
                    >
                        <span>Trackify</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCollapsed((v) => !v)}
                                aria-label="Toggle sidebar"
                                className="lg:block"
                            >
                                <Menu />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{collapsed ? "Expand" : "Collapse"}</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            {/* Nav list */}
            <ScrollArea className="flex-1 px-2 py-3">
                <nav className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.id}
                            to={item.href!}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-md h-[50px] cursor-pointer ${activePath === item.id ? "bg-[#7543FF] text-white" : "text-dark"
                                }`}
                        >
                            <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
                            <div
                                className="flex-1 truncate hidden lg:block"
                                style={{ display: collapsed ? "none" : undefined }}
                            >
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </nav>
            </ScrollArea>

            {/* User section */}
            <div className="px-3 py-3 border-t flex flex-col items-center lg:block">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="/avatar.jpg" alt="User avatar" />
                            <AvatarFallback>{user?.username.slice(0 , 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block" style={{ display: collapsed ? "none" : undefined }}>
                            <div className="text-sm font-medium">{user?.username}</div>
                            <div className="text-xs text-muted-foreground">{user?.email}</div>
                        </div>
                    </div>

                    <div
                        className="hidden lg:flex items-center gap-2"
                        style={{ display: collapsed ? "none" : undefined }}
                    >
                        <Button variant="ghost" size="sm" onClick={()=> logoutMutation.mutate()} className="cursor-pointer">
                            <LogOut size={14}/>
                        </Button>
                    </div>
                </div>

                <div
                    className="mt-3 flex items-center justify-center lg:hidden"
                    style={{ display: collapsed ? "flex" : undefined }}
                >
                    <Button variant="ghost" size="sm" onClick={()=> logoutMutation.mutate()} className="cursor-pointer">
                        <LogOut size={14} />
                    </Button>
                </div>
            </div>
        </aside>
    );
}

