import React, { useEffect } from "react";
import TestAPI from "../../components/Testing/Test-API";
import { users_data } from "./users-data";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { sendToServer } from "../../components/UserAuthentication/Login/LoginPostDB";
import { auth } from "../../assets/firebase.config";

function TestApiPage() {
  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     console.log(users_data[i]);
  //     async function emailLogin() {
  //       const email = users_data[i].email;
  //       const password = users_data[i].password;
  //       const name = `${users_data[i].First_Name} ${users_data[i].Last_Name}`;
  //       const phone = `${users_data[i].phone}`;

  //       createUserWithEmailAndPassword(auth, email, password)
  //         .then((userCredential) => {
  //           // Signed in
  //           const user = userCredential.user;
  //           console.log(user);
  //           // Post to sever
  //           const postData = {
  //             UID: user.uid,
  //             email: email,
  //             name: name,
  //             phone: phone,
  //           };
  //           const msg = sendToServer(user.id, postData);
  //           return msg;
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           console.log(errorMessage, "Code: ", errorCode);
  //           const msg = errorCode;
  //           return msg;
  //         });
  //     }
  //     // emailLogin();
  //   }
  // }, []);

  return (
    <div className="bg-primary dark:bg-base-100">
      <TestAPI />
    </div>
  );
}

export default TestApiPage;
