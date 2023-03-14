import React from "react";
import { ref } from "firebase/storage";
import { storage } from "../../../assets/firebase.config";

export default function ProfileImage(props) {
  console.log(props);
  return (
    <div>
      <img
        className="rounded-full h-32 w-32 object-cover"
        src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png"
        alt=""
      />
    </div>
  );
}
