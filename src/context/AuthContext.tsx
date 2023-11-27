import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({} as AuthContextType);


export const AuthProvider = (props : any) => {
    const [isLogin, setisLogin] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {

        var token = localStorage.getItem("token");
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get("https://localhost:7114/api/category", config)
                .then(res => {
                    setloading(false);
                    setisLogin(true);
                    console.log(res.data);
                    
                  
                })
                .catch(err => {
                    
                  console.log(err);
                  
                  var refreshToken = localStorage.getItem("refreshToken");

                    if(refreshToken){
                        axios.post("https://localhost:7114/api/auth/refreshtoken",{
                            refreshToken
                        })
                        .then(res => {
                            localStorage.setItem('token',res.data.accessToken)
                            localStorage.setItem('refreshToken',res.data.refreshToken)
                            setloading(false)   
                            setisLogin(true)
                        })
                        .catch(err => {
                            setloading(false)
                        })
                    }
                    else{
                        setloading(false)
                    }

                })

        }
        else {
            setloading(false)
        }

    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setisLogin, loading, setloading }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export type AuthContextType = {
    isLogin : boolean,
    loading : boolean,
    setisLogin : (isLogin : boolean) => void,
    setloading : (loading : boolean) => void
}