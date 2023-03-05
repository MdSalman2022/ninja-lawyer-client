import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();


const AuthProvider = ({ children }) => { 

    const [darkmode, setDarkMode] = useState(false)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkmode');
    
        if (savedDarkMode) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('darkmode', JSON.stringify(darkmode));
      }, [darkmode]);
    
    
      const toggleDarkMode = () => {
        setDarkMode(!darkmode);
      };


    const authInfo = {
        setDarkMode,
        darkmode,
        toggleDarkMode
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider