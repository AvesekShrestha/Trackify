import { useUser } from "@/context/userContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { loading } = useUser();
    const token = document.cookie.includes("accessToken")

    if (loading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" replace />;

    return <>{children}</>;
}

