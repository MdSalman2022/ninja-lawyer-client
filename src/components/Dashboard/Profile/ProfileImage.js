import React, { useEffect, useState, useContext } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../assets/firebase.config";
import {
  AiOutlineCamera,
  AiOutlineDatabase,
  AiOutlineEdit,
} from "react-icons/ai";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

export default function ProfileImage(props) {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [submitShow, setSubmitShow] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const userID = props.props;
  // console.log(props.props);

  useEffect(() => {
    const getProfileImage = (userID) => {
      const pathReference = ref(storage, `${userID}`);
      getDownloadURL(pathReference)
        .then((url) => {
          setImgLink(url);
          console.log(url);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProfileImage(userID);
  }, [user]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  function handleImageChange() {
    console.log(image);
    const storageRef = ref(storage, userID);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    });
  }
console.log(image)
  return (
    <div>
      <div className="relative bg-gradient-to-r from-base-100 to-primary h-52 w-full rounded-t-xl">
        <div className="w-full h-full group">
          <AiOutlineCamera className="absolute left-[50%] top-[45%] text-5xl text-white  hidden group-hover:flex hover:text-primary hover:bg-gray-400 hover:border hover:border-gray-400 hover:shadow-xl cursor-pointer rounded-full p-2" />
        </div>
        <div className="absolute -bottom-16 left-10 border-4 rounded-full border-primary group cursor-pointer">
          <div className="absolute rounded-full h-32 w-32 bg-black bg-opacity-70 hidden group-hover:flex"></div>
          <input
            type="file" className="w-32 h-32 absolute opacity-0 z-50"
            id="fileInput"
            name="fileInput"
            onChange={handleFileChange}
          />
          <AiOutlineCamera className="absolute left-[38%] top-[40%] text-3xl text-white hidden group-hover:flex" />
          <img
            className="rounded-full h-32 w-32 object-cover"
            src={imgLink ? imgLink : image ? image.name : 'https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png'}
            alt=""
          />
        </div>
        {/* **change later */}
        <div className="relative">      
          <div className="flex items-center gap-5 absolute right-10 top-5">
          <p className="">{image?.name}</p>  
          <button
            onClick={handleImageChange}
            className="primary-btn "
          >
            Change
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
