import React, { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
// import { lawyersList } from './LawyerList'
import { IoLocationSharp } from "react-icons/io5";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function TalkToLawyerList() {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const [isProblem, isProblemActive] = useState(true);
  const [isLanguage, isLanguageActive] = useState(false);
  const [isGender, isGenderActive] = useState(false);
  const [isExperience, isExperienceActive] = useState(false);
  const [isLocation, isLocationActive] = useState(true);
  const [problemSeeMore, setProblemSeeMore] = useState(false);
  const [languageSeeMore, setLanguageSeeMore] = useState(false);
  const [specialtiesArray, setSpecialtiesArray] = useState([]);

  const [lawyerList, setLawyerList] = useState([]);

  // useEffect(() => {
  //     fetch("https://ninja-lawyer-server.vercel.app/api/users/get-lawyers/all")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         let filterData = [];
  //         for (let i = 0; i < data.length; i++) {
  //           if (data[i].verified === true) {
  //             filterData.push(data[i]);
  //           }
  //         }
  //         console.log(filterData, "9900");

  //         setLawyerList(filterData);
  //       });
  //   }, []);

  const [locationCheck, setLocationCheck] = useState("city");

  useEffect(() => {
    locationCheck === "any"
      ? fetch(
          "https://ninja-lawyer-server.vercel.app/api/users/get-lawyers/all"
        )
          .then((res) => res.json())
          .then((data) => setLawyerList(data))
      : fetch(
          `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search?${
            locationCheck === "city"
              ? `city=${userData?.city?.replace(/\s+/g, "_")}`
              : `state=${userData?.state}`
          }`
        )
          .then((res) => res.json())
          .then((data) => setLawyerList(data));
  }, [locationCheck]);

  useEffect(() => {
    const getProfile = (id) => {
      console.log("yes");
      fetch(
        `https://ninja-lawyer-server.vercel.app/api/users/${
          user.displayName === "lawyer" ? "get-lawyer" : "get"
        }/${id}`
      )
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

  console.log(lawyerList);

  const handleDelete = (id) => {
    fetch(
      `https://ninja-lawyer-server.vercel.app/api/users/lawyer/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const remaining = lawyerList.filter((lawyer) => lawyer._id !== id);
          setLawyerList(remaining);
          toast.success(`${id} lawyer deleted successfully}`);
          console.log(result);
        }
      });
  };

  const handleCheck = (specialty) => {
    if (specialtiesArray.includes(specialty)) {
      let i = 0;
      for (i = 0; i < specialtiesArray.length; i++) {
        if (specialtiesArray[i] === specialty) {
          specialtiesArray.splice(i, 1);
        }
      }
    } else {
      const newItems = [...specialtiesArray, specialty];
      setSpecialtiesArray(newItems);
    }
    console.log(specialtiesArray);
  };

  const languageSuggestions = [
    "English",
    "Hindi",
    "Telegu",
    "Assamese",
    "Kannada",
    "Marathi",
    "Odia",
    "Bengali",
    "Tamil",
    "Malayalam",
  ];
  const specialtiesSuggestions = [
    "Divorce & Child Custody",
    "Property & Real Estate",
    "Cheque Bounce & Money Recovery",
    "Employment Issues",
    "Consumer Protection",
    "Civil Matters",
    "Cyber Crime",
    "Company & Start-Ups",
    "Other Legal Problem",
    "Criminal Matter",
    "MSME Recovery, MSME related matter.",
  ];

  return (
    <div className="bg-primary dark:bg-base-100">
      <div className="container mx-auto py-10">
        {/* <h1 className='text-black'>Total lawyer: {lawyerList.length}</h1> */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 xl:gap-20 justify-items-center z-50">
          <div className="w-full col-span-1 lg:col-span-1 bg-primary dark:bg-base-100 z-50  rounded-xl">
            <div className="border rounded-xl p-5 flex flex-col gap-5 select-none ">
              <span
                onClick={() => isLocationActive(!isLocation)}
                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
              >
                Location{" "}
                <FaChevronDown
                  className={`transition-all duration-300 ${
                    isLocation && "text-accent rotate-180"
                  }`}
                />{" "}
              </span>
              <ul
                className={`transition-all duration-300 p-1 flex flex-col items-start  ${
                  isLocation ? "flex" : "hidden "
                }`}
              >
                <label
                  onClick={() => setLocationCheck("city")}
                  className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                >
                  <input
                    type="checkbox"
                    className="accent-accent"
                    checked={locationCheck === "city" ? true : false}
                  />{" "}
                  {userData.city}{" "}
                  {locationCheck === "city" && `(${lawyerList.length})`}
                </label>
                <label
                  onClick={() => setLocationCheck("state")}
                  className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                >
                  <input
                    type="checkbox"
                    className="accent-accent"
                    checked={locationCheck === "state" ? true : false}
                  />{" "}
                  {userData.state}{" "}
                  {locationCheck === "state" && `(${lawyerList.length})`}
                </label>
                <label
                  onClick={() => setLocationCheck("any")}
                  className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                >
                  <input
                    type="checkbox"
                    className="accent-accent"
                    checked={locationCheck === "any" ? true : false}
                  />{" "}
                  Any {locationCheck === "any" && `(${lawyerList.length})`}
                </label>
              </ul>
              <span
                onClick={() => isProblemActive(!isProblem)}
                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
              >
                Problem Type{" "}
                <FaChevronDown
                  className={`transition-all duration-300 ${
                    isProblem && "text-accent rotate-180"
                  }`}
                />{" "}
              </span>
              <ul
                className={`transition-all duration-300 p-1 flex flex-col items-start  ${
                  isProblem ? "flex" : "hidden "
                }`}
              >
                {specialtiesSuggestions.splice(0, 4).map((specialty, index) => {
                  return (
                    <label
                      key={index}
                      className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                    >
                      <input type="checkbox" className="accent-accent" />{" "}
                      {specialty}
                    </label>
                  );
                })}
                <label
                  onClick={() => setProblemSeeMore(!problemSeeMore)}
                  className={`${
                    problemSeeMore ? "hidden" : "flex"
                  } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                >
                  <FaChevronDown />
                  Show more
                </label>
                {specialtiesSuggestions.map((specialty, index) => {
                  return (
                    <label
                      key={index}
                      className={`${
                        problemSeeMore ? "flex" : "hidden"
                      } gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary`}
                    >
                      <input
                        type="checkbox"
                        className="accent-accent"
                        onClick={() => handleCheck(specialty)}
                      />{" "}
                      {specialty}
                    </label>
                  );
                })}
                <label
                  onClick={() => setProblemSeeMore(!problemSeeMore)}
                  className={`${
                    problemSeeMore ? "flex" : "hidden"
                  } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                >
                  <FaChevronUp />
                  Show less
                </label>
              </ul>
              <span
                onClick={() => isLanguageActive(!isLanguage)}
                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
              >
                Language{" "}
                <FaChevronDown
                  className={`transition-all duration-300 ${
                    isLanguage && "text-accent rotate-180"
                  }`}
                />{" "}
              </span>
              <ul
                className={`transition-all duration-300 p-1 flex flex-col items-start ${
                  isLanguage ? "flex" : "hidden"
                }`}
              >
                {languageSuggestions.splice(0, 4).map((language, index) => {
                  return (
                    <label
                      key={index}
                      className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                    >
                      <input type="checkbox" className="accent-accent" />{" "}
                      {language}
                    </label>
                  );
                })}
                <label
                  onClick={() => setLanguageSeeMore(!languageSeeMore)}
                  className={`${
                    languageSeeMore ? "hidden" : "flex"
                  } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                >
                  <FaChevronDown />
                  Show more
                </label>
                {languageSuggestions.map((language, index) => {
                  return (
                    <label
                      key={index}
                      className={`${
                        languageSeeMore ? "flex" : "hidden"
                      } gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary`}
                    >
                      <input type="checkbox" className="accent-accent" />{" "}
                      {language}
                    </label>
                  );
                })}
                <label
                  onClick={() => setLanguageSeeMore(!languageSeeMore)}
                  className={`${
                    languageSeeMore ? "flex" : "hidden"
                  } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                >
                  <FaChevronUp />
                  Show less
                </label>
              </ul>

              <span
                onClick={() => isGenderActive(!isGender)}
                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
              >
                Gender{" "}
                <FaChevronDown
                  className={`transition-all duration-300 ${
                    isGender && "text-accent rotate-180"
                  }`}
                />{" "}
              </span>
              <ul
                className={`transition-all duration-300 p-1 flex flex-col items-start ${
                  isGender ? "flex" : "hidden"
                }`}
              >
                <label
                  className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                >
                  <input type="checkbox" className="accent-accent" /> Male
                </label>
                <label
                  className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                >
                  <input type="checkbox" className="accent-accent" /> Female
                </label>
              </ul>
              <span
                onClick={() => isExperienceActive(!isExperience)}
                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
              >
                Experience{" "}
                <FaChevronDown
                  className={`transition-all duration-300 ${
                    isExperience && "text-accent rotate-180"
                  }`}
                />{" "}
              </span>
              <ul
                className={`transition-all duration-300 p-1 flex flex-col items-start ${
                  isExperience ? "flex" : "hidden"
                }`}
              >
                <label
                  className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                >
                  <input type="checkbox" className="accent-accent" /> {">"} 2
                  yrs
                </label>
                <label
                  className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                >
                  <input type="checkbox" className="accent-accent" /> {">"} 3
                  yrs
                </label>
                <label
                  className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                >
                  <input type="checkbox" className="accent-accent" /> {">"} 5
                  yrs
                </label>
              </ul>
            </div>
          </div>

          {/* Lawyers profile */}

          <div className="w-full col-span-1 md:col-span-2 xl:col-span-3 px-5 md:px-0">
            {/* <h1 className="text-center">No lawyers found in your city.</h1>  */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center place-content-center">
              {lawyerList?.map((lawyer, index) => (
                <div
                  key={lawyer.index}
                  className="bg-primary dark:bg-base-100 p-3 shadow flex flex-col h-full w-full items-start justify-start rounded-xl gap-5 text-base-100 dark:text-primary dark:border border-gray-700 relative  "
                >
                  <figure className="relative rounded-xl  w-full">
                    <img
                      className="rounded-xl  h-60 w-full object-cover"
                      src={
                        lawyer?.img
                          ? lawyer.img
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt=""
                    />
                    <div className="absolute top-0 bg-primary w-full h-60 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-[50%] dark:bg-opacity-[50%]"></div>
                    <span className="absolute top-0 right-0 bg-primary dark:bg-base-100 p-2 rounded-bl-xl shadow-xl">
                      <p className="text-2xl text-end font-bold">
                        ₹{lawyer?.rate}
                      </p>
                      <p className="text-base-100 dark:text-secondary opacity-60 text-sm">
                        Per Minute
                      </p>
                    </span>
                  </figure>
                  <div className="content p-1 flex justify-between w-full h-full">
                    <div className="flex flex-col items-start justify-between ">
                      {/* <p className='flex items-center gap-3 text-xl font-bold'><div>{lawyer.name.substring(0, 3)} <span className="blur-sm">{lawyer.name.substring(3)}</span> </div><span className={`${lawyer.available ? 'bg-success' : 'bg-accent'} w-2 h-2 rounded-full`}></span> </p> */}
                      <div className="space-y-3">
                        <Link
                          to={`/profile/${lawyer.UID}`}
                          className="font-bold text-xl"
                        >
                          {lawyer?.name}
                        </Link>
                        <p className="flex items-start justify-start text-sm">
                          <IoLocationSharp className="text-lg" />
                          {lawyer?.city}, {lawyer?.state}, India
                        </p>
                      </div>
                      <p className="flex flex-col items-start">
                        {lawyer?.specialties?.map((skill, index) => (
                          <span
                            className="text-xs border m-1 p-1 rounded-full"
                            key={index}
                          >
                            {skill}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div>
                        <p className="flex items-center justify-end gap-2">
                          {lawyer?.experience}
                          <BiTime className="text-xl" />{" "}
                        </p>
                        <div className="flex items-center justify-end gap-1  text-warning">
                          <span className="flex items-center">
                            <FaStar />
                          </span>{" "}
                          <span className="text-xs text-base-100 dark:text-primary">
                            5
                          </span>
                        </div>
                        <p className="flex flex-col items-end">
                          {lawyer?.language?.map((item, index) => (
                            <span
                              className="text-xs border m-1 p-1 rounded-md"
                              key={index}
                            >
                              {item}
                            </span>
                          ))}
                        </p>
                      </div>
                      {/* <button onClick={() => handleDelete(lawyer.UID)} className='primary-btn '>Delete</button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkToLawyerList;
