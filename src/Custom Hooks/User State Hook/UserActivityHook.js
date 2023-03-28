import { useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const useUserAcivityTimer = (timeout = 2 * 60 * 60 * 1000) => {
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
      firebase.auth().signOut();
    }, timeout);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUserChange);
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
