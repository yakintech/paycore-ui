import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { BaseNetwork } from '../../network/BaseNetwork';
import axios from 'axios';

function Categories() {
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        
        loadCategories();
    }, [])

    const loadCategories = () => {
        BaseNetwork.getAll('/category').then((response : any) => {
            setcategories(response)
        }).catch((error : any) => {
            console.log(error)
        }
        )
    }


    const refresh = () => {

        BaseNetwork.getAll('/category/clear').then((response : any) => {
            loadCategories();
        }).catch((error : any) => {
            console.log(error)
        }

        )
    }

    return (<>
        <button onClick={refresh}>Refresh Data</button>
        <ul>
            {
                categories && categories.map((item : any) => <li key={item.id}>{item.name}</li>)
            }
        </ul>
    </>
    )
}

export default Categories