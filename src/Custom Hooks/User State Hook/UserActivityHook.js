import { useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";
import { toast } from "react-hot-toast";

const useUserAcivityTimer = (timeout = 2 * 60 * 60 * 1000) => {
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
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, []);
};

export default useUserAcivityTimer;
