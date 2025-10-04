import axios from 'axios';
import React, { createContext, useContext, useState,useEffect } from 'react'


const authContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const verifyUser = async () => {

        try {
            const response = await axios.get('http://localhost:5000/api/auth/verify',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }
        )
if (response.data.success) {
    setUser(response.data.userDetail)
}
console.log(user)
    }catch(err){
        console.log(err)
    }
}
verifyUser()
}, [])


const login = (user) => { setUser(user) }
console.log(login, user);
return (
    <authContext.Provider value={{ user, login }}>
        {children}
    </authContext.Provider>
)
};
export const useAuth = () => useContext(authContext)
export default ContextProvider;
