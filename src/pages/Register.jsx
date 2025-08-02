import { useState } from "react"
import axios from "axios"
import '../index.css'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post('https://backend-0hjt.onrender.com/register', { username, password })
            alert('Usuario registrado con éxito')
        } catch (e) {
            console.log(e)
            alert('El usuario ya éxiste')
        }
    }

    return (
        <form className="flex flex-col my-20 justify-center items-center gap-10 bg-neutral-700 px-10 py-5 rounded" onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold text-white">Registro</h1>
            <input
                className="rounded px-3 py-1 text-1xl text-neutral-700 focus:outline-none"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className="rounded px-3 py-1 text-1xl text-neutral-700 focus:outline-none"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button 
                className="rounded bg-neutral-300 text-neutral-700 hover:bg-neutral-400 hover:scale-110 hover:-translate-y-1 py-1 px-3 transition duration-500 ease-in-out" 
                type="submit"
            >
                Registrarse
            </button>
        </form>
    )
}