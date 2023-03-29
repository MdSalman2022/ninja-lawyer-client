import React, { useContext, useEffect } from "react";
import { storage } from "../../assets/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { putDataToServer } from "../Dashboard/ProfilePage/ProfilePageUpdateData";
import { users } from "./users-data";
import { auth } from "../../assets/firebase.config";
import AuthProvider from "../../contexts/AuthProvider/AuthProvider";

export default function TestApiPage() {
  function convertToArray(obj) {
    const specialties = obj.specialties.split(","); // convert specialties to array
    const languages = obj.language.split(","); // convert language to array
    return {
      ...obj, // spread the existing object properties
      specialties, // add the new specialties array
      languages, // add the new language array
    };
  }

  const createUser = async (userData) => {
    let createdUser;
    const user = convertToArray(userData);
    console.log(user, user.email, user.password);
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
          createdUser = data.user;
        })
        .catch((error) => console.log(error, "error in create user"));

      await updateProfile(auth.currentUser, {
        displayName: "lawyer",
      }).catch((error) => console.log(error, "error in updateProfile"));

      //
      let name = `${user.First_Name} ${user.Last_Name}`;
      console.log("aaa", name);
      //
      const response = await fetch(
        "http://localhost:5000/api/users/add-lawyer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            name,
            verified: false,
            UID: createdUser.uid, // add the Firebase Authentication user ID to the user data
          }),
        }
      )
        .then((data) => console.log(data, response))
        .catch((error) => console.log(error, "error in fetch"));
    } catch (error) {
      console.log(error, "error in main try catch");
    }
  };

  // function to create a user in Firebase and post their data to the database
  async function createUserAndPostData(userData) {
    const user = convertToArray(userData);
    console.log(user);
    try {
      // create the user in Firebase Authentication
      const { email, password } = user;
      console.log("--", user);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => console.log(error));

      await updateProfile(auth.currentUser, {
        displayName: "lawyer",
      })
        .then(() => {
          console.log("added user role");
        })
        .catch((error) => {
          console.log("cannot add user role", error);
        });

      // get the user ID from the Firebase Authentication credential
      const { uid } = credential.user;
      const UID = uid;
      // const uid = "912u48912ufiojmkoh8h";

      // post the user data to your API endpoint using fetch
      let name = `${user.First_Name} ${user.Last_Name}`;
      //
      const response = await fetch(
        "http://localhost:5000/api/users/add-lawyer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            name,
            verified: false,
            UID, // add the Firebase Authentication user ID to the user data
          }),
        }
      ).catch((error) => console.log(error));

      // handle the response from the API endpoint
      if (response.ok) {
        console.log(`User ${email} created and data posted successfully!`);
        return { user, success: true };
      } else {
        console.error(
          `Failed to post data for user ${email}: ${response.statusText}`
        );
        return { user, success: false };
      }
    } catch (error) {
      console.error(`Failed to create user ${user.email}: ${error.message}`);
      return { user, success: false };
    }
  }

  async function createAndPostAllUsers() {
    const promises = users.map(async (user) => {
      const result = await createUserAndPostData(user);
      return result;
    });

    const settledPromises = await Promise.allSettled(promises);

    const successfulUsers = settledPromises.filter(
      (promiseResult) =>
        promiseResult.status === "fulfilled" && promiseResult.value.success
    );

    console.log(
      `Successfully created and posted data for ${successfulUsers.length} users.`
    );
  }

  useEffect(() => {
    // async function processArray(users) {
    //   for (const element of users) {
    //     await createUser(element);
    //   }
    // }
    // processArray(users);
  }, []);

  return (
    <div className="flex flex-col">
      <h1>sas</h1>
    </div>
  );
}
