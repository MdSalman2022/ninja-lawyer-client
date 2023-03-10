import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // states for auth
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
 


  const logOut = () => {
    setLoading(true)
    return signOut(auth)
}

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


  const authInfo = {
    // user and loading for auth
    user,
    loading,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
