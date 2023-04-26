import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
//changes for online offline
import { app } from "../../assets/firebase.config";
import { getDatabase, ref, set, update, onDisconnect } from "firebase/database";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [darkmode, setDarkMode] = useState(false);
  const [heightFull, setHeightFull] = useState(false);
  const [available, setAvailable] = useState(false);

  // Start of online and offline
  const [isONLINE, setIsONLINE] = useState(false);
  useEffect(() => {
    const db = getDatabase(app);
    function writeUserData(uid) {
      console.log("pp----pp", available);
      if (available) {
        set(ref(db, "lawyers/" + uid), {
          isOnline: true,
          uid: uid,
        });

        const userRef = ref(db, "lawyers/" + uid);
        onDisconnect(userRef)
          .update({
            isOnline: false,
          })
          .then(() => {
            console.log("OnDisconnect event set up successfully");
          })
          .catch((error) => {
            console.error("Error setting up onDisconnect event:", error);
          });
      } else if (!available && user && uid) {
        //If the user turns off availibility
        update(ref(db, "lawyers/" + uid), {
          isOnline: false,
        });
      }
    }

    writeUserData(user?.uid);
  }, [available]);
  // END of online and offline

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
      fetch(
        `https://ninja-lawyer-server.vercel.app/api/users/${
          user.displayName === "lawyer" ? "get-lawyer" : "get"
        }/${id}`
      )
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
  }, [user, heightFull]);

  // useEffect(() => {
  //   fetch(`https://api.postalpincode.in/pincode/110001`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  // const [cityDetails, setCityDetails] = useState([]);

  // useEffect(() => {
  //   fetch(`api.zippopotam.us/IN/110001`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     });
  // }, []);

  // const [cityDetails, setCityDetails] = useState([]);

  // useEffect(() => {
  //   fetch(`api.zippopotam.us/IN/110001`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     });
  // }, []);

  useEffect(() => {
    const savedAvailable = localStorage.getItem("available");

    if (savedAvailable) {
      setAvailable(JSON.parse(savedAvailable));
    }
  }, []);

  // changes
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    localStorage.setItem("available", JSON.stringify(available));
  }, [available]);

  const toggleAvailable = () => {
    console.log("-=-=-=-=-=-=-");
    setAvailable(!available);
  };

  console.log(available);

  const stateInfo = {
    setDarkMode,
    darkmode,
    toggleDarkMode,
    heightFull,
    setHeightFull,
    userData,
    setUserData,
    available,
    setAvailable,
    toggleAvailable,
  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
