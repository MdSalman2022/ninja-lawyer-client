import { createContext, useState } from "react";



export const AuthContext = createContext();


const AuthProvider = ({ children }) => { 

    const [darkmode, setDarkMode] = useState(false)


    const authInfo = {
        setDarkMode,
        darkmode
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider