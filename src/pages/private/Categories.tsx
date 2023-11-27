import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Categories() {
    const [categories, setcategories] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        var token = localStorage.getItem('token')

        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get("https://localhost:7114/api/category", config)
            .then(res => {
                setcategories(res.data)
            })
            .catch(err => {
                navigate("/login")
            })

        }

    }, [])

    return (<>
        <ul>
            {
                categories && categories.map((item : any) => <li>{item.name}</li>)
            }
        </ul>
    </>
    )
}

export default Categories