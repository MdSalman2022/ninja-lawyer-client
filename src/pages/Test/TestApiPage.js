import React, { useContext, useEffect, useState } from "react";
// import { storage } from "../../assets/firebase.config";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { putDataToServer } from "../Dashboard/ProfilePage/ProfilePageUpdateData";
// import { users } from "./users-data";
// import { auth } from "../../assets/firebase.config";
// import AuthProvider from "../../contexts/AuthProvider/AuthProvider";
import { app } from "../../assets/firebase.config";
import { getDatabase, ref, set, update, onDisconnect } from "firebase/database";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { auth } from "../../assets/firebase.config";
import { updateProfile } from "firebase/auth";

export default function TestApiPage() {
  const { user } = useContext(AuthContext);

  // for online/offline
  useEffect(() => {
    // const db = getDatabase(app);
    // function writeUserData(uid) {
    //   if (user && user.uid) {
    //     console.log(user.uid, "-0-");
    //     console.log("-----", uid);
    //     set(ref(db, "lawyers/" + uid), {
    //       isOnline: true,
    //       uid: uid,
    //     });
    //     const userRef = ref(db, "lawyers/" + uid);
    //     onDisconnect(userRef)
    //       .update({
    //         isOnline: false,
    //       })
    //       .then(() => {
    //         console.log("OnDisconnect event set up successfully");
    //       })
    //       .catch((error) => {
    //         console.error("Error setting up onDisconnect event:", error);
    //       });
    //   }
    // }
    // writeUserData(user.uid);
  }, [user]);

  return (
    <div className="flex flex-col">
      <h1>sas</h1>
    </div>
  );
}
