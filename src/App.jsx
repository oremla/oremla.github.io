import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Register from "./pages/Register.jsx"
import Members from './pages/Members.jsx'
import './index.css'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/r3g1st3r0nlys4k41' element={<main className='flex justify-center items-center w-full'><Register></Register></main>} />
                <Route path='/' element={<main className='flex justify-center items-center w-full'><Login></Login></main>} />
                <Route path='/home' element={<Home />} />
                <Route path='/members' element={<Members />} />
            </Routes>
        </Router>
    )
}