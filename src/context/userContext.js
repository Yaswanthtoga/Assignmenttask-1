import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs)=>{
        const res = await axios.post('http://localhost:8000/api/auth/login',inputs);
        const others = {
            username: res.data.user.username,
            email: res.data.user.email,
            phoneNumber:res.data.user.phoneNumber,
            profilePicture:res.data.user.profilePicture,
            modifiedAt: res.data.user.updatedAt
        };

        setCurrentUser(others);
    };

    // Set in the Local Storage
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return(
        <UserContext.Provider value={{currentUser,login}} >
            {children}
        </UserContext.Provider>
    )
}