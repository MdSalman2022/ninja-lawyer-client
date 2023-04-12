import React, { useContext, useEffect, useState } from "react";
// import { storage } from "../../assets/firebase.config";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { putDataToServer } from "../Dashboard/ProfilePage/ProfilePageUpdateData";
// import { users } from "./users-data";
// import { auth } from "../../assets/firebase.config";
// import AuthProvider from "../../contexts/AuthProvider/AuthProvider";
import { app } from "../../assets/firebase.config";
import {
  getDatabase,
  ref,
  set,
  update,
  onDisconnect,
  onValue,
} from "firebase/database";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { auth } from "../../assets/firebase.config";
import { updateProfile } from "firebase/auth";

export default function TestApiPage() {
  const { user } = useContext(AuthContext);

  // for online/offline
  useEffect(() => {
    const db = getDatabase(app);
    // djQZazeKVehEogSn4fN0BIWBA0o2

    const starCountRef = ref(db, "/lawyers/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("....", data);
    });
  }, [user]);

  return (
    <div className="flex flex-col">
      <h1>sas</h1>
    </div>
  );
}
