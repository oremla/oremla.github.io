// Dependencies
import { Fragment, useState, useEffect } from "react"
import axios from "axios"

// Components
import Header from "../components/Header"
import MemberCard from "../components/MemberCard"

export default function Members() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://backend-0hjt.onrender.com/panel')
                setUsers(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchUsers()
    }, []) 

    return (
        <Fragment>
            <Header />
            <main className="flex flex-wrap items-stretch gap-10 mx-10">
                {users.map((user, index) => {
                    if (user.username === 'register') return
                    return (
                        <MemberCard
                            key={index} 
                            icon={user.icon}
                            username={user.username}
                            roles={user.roles}
                            isStaff={user.staff}
                        />
                    )
                })}
            </main>
        </Fragment>
    )
}