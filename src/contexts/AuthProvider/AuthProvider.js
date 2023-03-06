import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [darkmode, setDarkMode] = useState(false);
  // states for auth
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Check if users logged in and set it in a state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkmode");

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [darkmode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
  };

  const authInfo = {
    setDarkMode,
    darkmode,
    toggleDarkMode,
    // user and loading for auth
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
