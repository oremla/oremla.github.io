import { Fragment, useState, useEffect } from "react"
import { FaHome } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaLightbulb } from "react-icons/fa"
import { TbMessageReport } from "react-icons/tb"
import { GiSpy } from "react-icons/gi"
import HomeCard from "../components/HomeCard.jsx"
import Header from "../components/Header.jsx"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Home() {
    const textareaStyle = 'bg-neutral-800 rounded py-2 px-2 w-[98%] h-72 text-neutral-400 focus:outline-none'
    const actualUser = localStorage.getItem('actualUser')
    const navigate = useNavigate()
    const handleClick = (path) => {
        navigate(path)
    }
    const [texts, setTexts] = useState([])
    const [edit, setEdit] = useState(false)
    const [newTexts, setNewTexts] = useState({})
    const [activeEdit, setActiveEdit] = useState(null)
    const [display, setDisplay] = useState('none')

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const res = await axios.get('https://backend-0hjt.onrender.com/text')
                setTexts(res.data)
            } catch (e) {
                console.log(e.message)
            }
        }

        fetchTexts()
    }, [])

    const submitTexts = async () => {
        try {
            const updated = texts.map(text => ({
                ...text,
                text: newTexts[text.title] ?? text.text
            }))
            await axios.post('https://backend-0hjt.onrender.com/newtexts', { updated })
            alert('Artículos guardados')
        } catch {
            alert('Error al guardar los artículos')
        }
    }

    const applyText = (title) => {
        const textFound = texts.find((text) => text.title === title)
        return textFound ? textFound.text : ''
    }

    let bg = edit === false 
    ? 'bg-green-800 hover:bg-green-900'
    : 'bg-yellow-800 hover:bg-yellow-900'

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.post('https://backend-0hjt.onrender.com/verify', { actualUser })
                const user = res.data
                setDisplay(user.staff ? 'flex' : 'hidden')
            } catch (err) {
                console.log(err.message)
            }
        }

        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <Header />
            <main className="flex flex-wrap gap-y-3 gap-x-8 justify-around my-12">
                <HomeCard 
                    icon={<FaHome />}
                    subTitle={'Inicio'}
                    text={activeEdit === 'Inicio' 
                        ? <textarea
                            defaultValue={applyText('Inicio')}
                            onChange={(e) => setNewTexts((prev) => ({
                                ...prev,
                                ['Inicio']: e.target.value
                            }))}
                            className={textareaStyle}
                        ></textarea>
                        : applyText('Inicio')
                    }
                    onClick={ edit ? () => setActiveEdit('Inicio') : () => handleClick('/home')}
                />
                <HomeCard
                    icon={<FaPeopleGroup />}
                    subTitle={'Miembros'}
                    text={applyText('Miembros')}
                    onClick={ edit === false ? () => handleClick('/members') : '' }
                />
                <HomeCard
                    icon={<FaLightbulb />}
                    subTitle={'Ideas'}
                    text={applyText('Ideas')}
                    onClick={ edit === false ? () => handleClick('/ideas') : ''}
                />
                <HomeCard
                    icon={<TbMessageReport />}
                    subTitle={'Reportes'}
                    text={applyText('Reportes')}
                    onClick={ edit === false ? () => handleClick('/reports') : ''}
                />
                <HomeCard
                    icon={<GiSpy />}
                    subTitle={'Espionajes'}
                    text={applyText('Espionajes')}
                    onClick={ edit === false ? () => handleClick('/spys') : ''}
                />
            </main>
            <footer className={`${display} items-center justify-around mb-4`}>
                <button onClick={() => {
                    setEdit(edit === false ? true : false)
                    edit === true ? submitTexts() : null
                    setActiveEdit(null)
                    edit === true ? window.location.reload() : null
                }} className={ `${bg} py-2 px-4 rounded  hover:scale-110 hover:-translate-y-1 transition duration-500 ease` }>
                    { edit === false ? 'Editar' : 'Guardar' }
                </button>
                { edit === false 
                    ? ''
                    : <button onClick={() => {
                        setEdit(false)
                        setNewTexts({})
                        setActiveEdit(null)
                    }} className="bg-red-800 hover:bg-red-900 py-2 px-4 hover:scale-110 hover:-translate-y-1 transitions duration-500 ease">
                        No guardar
                    </button> 
                }
            </footer>
        </Fragment>
    )
}