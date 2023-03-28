import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const StateContext = createContext();

const StateProvider = ({ children }) => {

  const { user } = useContext(AuthContext);
  const [darkmode, setDarkMode] = useState(false);
  const [heightFull, setHeightFull] = useState(false)

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

  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getProfile = (id) => {
      console.log("yes");
      fetch(`https://ninja-lawyer-server.vercel.app/api/users/${user.displayName === 'lawyer' ? 'get-lawyer' : 'get'}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserData(data);
        });
    };
    // call get
    if (user?.uid) {
      getProfile(user.uid);
    }
  }, [user]);

  // useEffect(() => {
  //   fetch(`https://api.postalpincode.in/pincode/110001`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);


  const stateInfo = {
    setDarkMode,
    darkmode,
    toggleDarkMode,
    heightFull,
    setHeightFull,
    userData
  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
