import React, { useEffect, useState, useContext } from "react";
import {
  AiOutlineCamera,
  AiOutlineDatabase,
  AiOutlineEdit,
} from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGenderMale } from "react-icons/bs";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { updateData, putDataToServer } from "./ProfilePageUpdateData";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import ProfileImage from "../../../components/Dashboard/Profile/ProfileImage";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const { heightFull, setHeightFull } = useContext(StateContext);

  useEffect(() => {
    const getProfile = (id) => {
      console.log("yes");
      fetch(`http://localhost:5000/api/users/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserData(data);
        });
    };
    // call get
    if (user?.uid) {
      getProfile(user.uid);
    }
  }, [user]);

  const [edit, setEdit] = useState(false);

  function handleUpdate(e) {
    e.preventDefault();
    const data = updateData(e, user.uid);
    console.log(data);
    const updateResult = putDataToServer(user.uid, data);
    console.log(updateResult, "----");
  }

  return (
    <div
      className={`flex flex-col gap-5 text-base-100 dark:text-primary pb-10`}
    >
      <div className="shadow-lg rounded-xl bg-primary dark:bg-base-100 dark:border flex flex-col">
        {/* <div className="relative bg-gradient-to-r from-base-100 to-primary h-52 w-full rounded-t-xl">
          <div className="w-full h-full group">
            <AiOutlineCamera className="absolute left-[50%] top-[45%] text-5xl text-white  hidden group-hover:flex hover:text-primary hover:bg-gray-400 hover:border hover:border-gray-400 hover:shadow-xl cursor-pointer rounded-full p-2" />
          </div>
          <div className="absolute -bottom-16 left-10 border-4 rounded-full border-primary group cursor-pointer">
            <div className="absolute rounded-full h-32 w-32 bg-black bg-opacity-70 hidden group-hover:flex"></div>
            <AiOutlineCamera className="absolute left-[38%] top-[40%] text-3xl text-white hidden group-hover:flex" /> */}
        {/* <img
              className="rounded-full h-32 w-32 object-cover"
              src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png"
              alt=""
            /> */}
        <ProfileImage props={user?.uid} />
        {/* </div>
        </div> */}
        <div className="mt-[3%] p-10 flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl pb-2 flex items-center gap-2">
              {userData.name}
              <AiOutlineEdit
                onClick={() => setHeightFull(!heightFull)}
                className="hover:bg-gray-200 p-1 rounded-full text-3xl cursor-pointer"
              />
            </h2>
            <span className="flex items-center gap-2">
              {" "}
              {/* <img
                className="w-5"
                src="https://i.ibb.co/R2B63FR/Flag-India.webp"
                alt=""
              />{" "} */}
              {userData.location}
            </span>
            {/* <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">@bhupen</span>
              <span className="font-semibold flex items-center">
                <AiOutlineDatabase className="" />
                Data Analyst at Dell Technologies
              </span>
            </div> */}
          </div>
          <div className="flex flex-col items-end gap-5 font-semibold">
            <span className="flex items-center gap-3">
              {userData.phone}
              <FiPhoneCall />{" "}
            </span>
            <span className="flex items-center gap-3">
              {userData.email}
              <HiOutlineMail />
            </span>
            <span className="flex items-center gap-3">
              {" "}
              Male
              <BsGenderMale />
            </span>
          </div>
        </div>
      </div>

      <div className={`${!heightFull && "hidden"}`}>
        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHeightFull(!heightFull)}
              className="primary-outline-btn"
            >
              Cancel
            </button>
            <button
              onClick={() => setHeightFull(!heightFull)}
              className="primary-btn"
            >
              Save
            </button>
          </div>
        </div>

        <div className={`pb-5`}>
          <form
            className="col-span-1 grid grid-cols-3 gap-5"
            onSubmit={handleUpdate}
          >
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Name
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="name"
                defaultValue={userData.name}
              />
            </label>
            {/* <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Last Name
              </span>
              <input type="text" class="input-box w-full" />
            </label> */}
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Email
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="email"
                defaultValue={userData.email}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Phone number
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="phone"
                defaultValue={userData.phone}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Location
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="location"
                defaultValue={userData.location}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                State
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="state"
                defaultValue={userData.state}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                City
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="city"
                defaultValue={userData.city}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Postal Code
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="postalcode"
                defaultValue={userData.postalcode}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Address
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="address"
                defaultValue={userData.address}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Second Address
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="address2"
                defaultValue={userData.address2}
              />
            </label>
            <button type="submit" className="btn btn-dark">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
