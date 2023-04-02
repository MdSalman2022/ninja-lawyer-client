import { useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";
import { toast } from "react-hot-toast";

const useUserAcivityTimer = (timeout = 2 * 60 * 60 * 1000) => {
  // const [lastVisitTime, setLastVisitTime] = useState(null);
  //2 * 60 * 60 * 1000
  const userRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleUserChange = (user) => {
    if (user) {
      userRef.current = user;
      resetTimeout();
    } else {
      userRef.current = null;
      clearTimeout(timeoutRef.current);
    }
  };

  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      signOut(auth)
        .then(() => {
          toast.success("Logged out for inactivity");
          console.log("signed out");
          // navigate(from, { replace: true });
        })
        .catch((error) => {
          toast.error(`Could not logout. ${error}`);
        });
    }, timeout);
  };

  useEffect(() => {
    // Get last visit time from localStorage
    const storedTime = localStorage.getItem("LAST_VISIT_TIME_KEY");
    if (storedTime) {
      const currentTime = new Date().getTime();
      const storedTimeMs = Number(storedTime);
      const timeDiff = currentTime - storedTime;
      console.log("-------------+---------------", timeDiff);
      const twoHoursMs = 20000;
      // 2 * 60 * 60 * 1000
      if (timeDiff > twoHoursMs) {
        console.log("should log out now");
        localStorage.removeItem("LAST_VISIT_TIME_KEY");
      }
    }
    // End of for browser close
    const unsubscribe = onAuthStateChanged(auth, handleUserChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    resetTimeout();
  }, [userRef.current]);

  const handleUserActivity = () => {
    if (userRef.current) {
      resetTimeout();
    }
  };

  useEffect(() => {
    // For browser close
    // Function to handle beforeunload event
    const handleBeforeUnload = () => {
      const currentTime = new Date().getTime();
      localStorage.setItem("LAST_VISIT_TIME_KEY", currentTime.toString());
    };
    // For browser close:
    // Add beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);
    // end
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useUserAcivityTimer;
