import { Routes, Route } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import SidebarLayout from "./layout/sidebarLayout"
import Dashboard from "./pages/dashboard"
import Income from "./pages/income"
import Expense from "./pages/expense"
import { UserProvider } from "./context/userContext"

export default function App() {
  return (

    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}

