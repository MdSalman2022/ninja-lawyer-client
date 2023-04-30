import React, { useEffect, useState, useContext, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../assets/firebase.config";
import {
  AiOutlineCamera,
  AiOutlineDatabase,
  AiOutlineEdit,
} from "react-icons/ai";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { BsFillCameraFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiUpload } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function ProfileImage(props) {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [submitShow, setSubmitShow] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const [toggleDropdown, setToggleDropdown] = useState(false);
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
  }, [user, image, imgLink]);

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
      toast.success("Image Uploaded Successfully");
      setToggleDropdown(false);
    });
    getDownloadURL(storageRef)
      .then((url) => {
        setImgLink(url);
        console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
    setImage(null);
  }

  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div>
      <div className="flex flex-col w-fit gap-2">
        <figure className="relative">
          <img
            className="rounded-full h-32 w-32 object-cover"
            src={
              imgLink
                ? imgLink
                : image
                ? image.name
                : "https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png"
            }
            alt=""
          />
          <div className="absolute bottom-3 -right-2 bg-white rounded-full">
            <BsFillCameraFill className="w-8 h-8 p-2 cursor-pointer " />
            <input
              type="file"
              className="opacity-0 absolute w-8 h-8 z-50 top-0 left-0 bg-black"
              id="fileInput"
              name="fileInput"
              onChange={handleFileChange}
            />
          </div>
        </figure>
        <div
          className={`${
            image?.name ? "flex flex-col" : "hidden"
          } items-center `}
        >
          <p className="">{image?.name}</p>
          <button onClick={handleImageChange} className="primary-btn ">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
