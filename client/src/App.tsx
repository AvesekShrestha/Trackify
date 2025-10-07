import { Routes, Route } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import SidebarLayout from "./layout/sidebarLayout"
import Dashboard from "./pages/dashboard"
import Income from "./pages/income"
import Expense from "./pages/expense"
import { UserProvider } from "./context/userContext"
import ProtectedRoute from "./components/custom/protectedRoute"
import NotFound from "./pages/notfound"
import PublicRoute from "./components/custom/publicRoute"
import Setting from "./pages/setting"

export default function App() {
    return (

        <UserProvider>
            <Routes>
                <Route path="/login" element={<PublicRoute>
                    <Login />
                </PublicRoute>} />
                <Route path="/register" element={<PublicRoute>
                    <Register />
                </PublicRoute>} />

                <Route element={
                    <ProtectedRoute>
                        <SidebarLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/setting" element={<Setting />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserProvider>
    )
}



