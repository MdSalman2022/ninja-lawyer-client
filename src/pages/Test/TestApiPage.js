import React, { useState, useEffect } from "react";
import { storage } from "../../assets/firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import { putDataToServer } from "../Dashboard/ProfilePage/ProfilePageUpdateData";

export default function TestApiPage() {
  return (
    <div className="flex flex-col">
      <h1>sad</h1>
    </div>
  );
}
