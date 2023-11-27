import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { BaseNetwork } from '../../network/BaseNetwork';

function Categories() {
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        
        BaseNetwork.getAll('/category').then((response : any) => {
            setcategories(response)
        }).catch((error : any) => {
            console.log(error)
        }
        )

    }, [])

    return (<>
        <ul>
            {
                categories && categories.map((item : any) => <li key={item.id}>{item.name}</li>)
            }
        </ul>
    </>
    )
}

export default Categories