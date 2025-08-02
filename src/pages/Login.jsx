import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../index.css'

export default function Login() {
    const [username, setUser] = useState('')
    const [password, setpass] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const login = async () => {
        try {
            await axios.post('https://backend-0hjt.onrender.com/login', { username, password })
            localStorage.setItem('actualUser', username)
            setMessage('¡Login exitoso!')
            username === 'register' && password === 'r3g1st3r0nlys4k41'
            ? navigate('/r3g1st3r0nlys4k41')
            : navigate('/home')
        } catch {
            setMessage('Credenciales inválidas')
        }
    }

    return (
        <div className="flex flex-col items-center my-20 gap-10 bg-neutral-700 px-10 py-5 rounded">
            <h1 className="font-bold text-center text-3xl text-white">Inicio de sesión</h1>
            <input className="rounded px-3 py-1 text-1xl text-neutral-700 focus:outline-none" placeholder="Usuario" onChange={e => setUser(e.target.value)}/>
            <input className="rounded px-3 py-1 text-1xl text-neutral-700 focus:outline-none" type="password" placeholder="Contraseña" onChange={e => setpass(e.target.value)} />
            <button className="rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:scale-110 hover:-translate-y-1 py-1 px-3 transition duration-500 ease-in-out" onClick={login}>Iniciar sesión</button>
            <p className="text-white">{message}</p>
        </div>
    )
}