import { Routes, Route } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import OAuth from "./pages/oauth"

export default function App() {
  return (
    <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/oauth" element={<OAuth/>}/>
        
    </Routes>
  )
}

