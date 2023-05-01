import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const LawyerCard = ({ lawyer, specialtiesArray, online, onlineLawyers, available }) => {
  // console.log(specialtiesArray, "[][][][][]");
  // console.log("----------------", lawyer);

  // start of  online/offline
  const [isOnline, setOnline] = useState(false);


  useEffect(() => {
    if (checkOnline(online, lawyer?.UID)) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [online]);

  // console.log(isOnline)
  // end of  online/offline

  let specialties = lawyer?.specialties;

  specialties = specialties
    ?.map((str) => {
      if (str[0] === " ") {
        return str.substring(1);
      } else {
        return str;
      }
    })
    .filter((str) => str !== "");

  const [sortedSpecialties, setSortedSpecialties] = useState([]);
  const [matchedSpecialties, setMatchedSpecialties] = useState([]);
  const [remainingSpecialties, setRemainingSpecialties] = useState([]);

  // console.log(specialties, lawyer.name)

  // useEffect(() => {
  //     if (specialties) {
  //         const matched = specialties?.filter(item => specialtiesArray?.includes(item)).sort()
  //         setMatchedSpecialties(matched)
  //         const remaining = specialties?.filter(item => !specialtiesArray?.includes(item)).sort()
  //         setRemainingSpecialties(remaining)
  //         setSortedSpecialties([...matchedSpecialties, ...remainingSpecialties])
  //     }
  // }, [specialtiesArray, lawyer])

  // useEffect(() => {
  //     setSortedSpecialties([...matchedSpecialties, ...remainingSpecialties])
  // }, [matchedSpecialties, remainingSpecialties, setSortedSpecialties])

  // console.log(sortedSpecialties)

  // console.log("matched " + matchedSpecialties)
  // console.log("sorted " + sortedSpecialties)
  // console.log(specialtiesArray)
  // console.log(specialties, lawyer.name)
  // const selectedSpecialties = specialties.filter(item => specialtiesArray.includes(item.trim()))

  // console.log("selected specialty " + selectedSpecialties)

  const date = new Date();



  if (available && onlineLawyers.find((onlineLawyer) => onlineLawyer === lawyer.UID)) {
    return (
      <div className="bg-primary dark:bg-base-100 shadow flex flex-col h-full w-80 items-start justify-start rounded-xl gap-0 text-base-100 dark:text-primary dark:border border-gray-800 relative  ">
        <span className="absolute top-0 left-0  dark:bg-base-100 p-2 rounded-bl-xl">
          <p className="flex items-center text-xl gap-2 text-end font-semibold">
            <FaStar className="text-warning" /> 5.0
          </p>
          {/* {isOnline ? <p>Online</p> : <p>NOT Online</p>} */}
        </span>
        <span className="absolute top-0 right-0  dark:bg-base-100 p-2 rounded-bl-xl flex flex-col">
          <span className="text-2xl p-0 m-0 text-end font-semibold relative">
            <sup className="text-[17px] absolute top-3 -left-3">₹</sup>
            {lawyer?.rate} <span className="text-sm text-gray-500">/min</span>
          </span>
        </span>
        <figure className="flex justify-center rounded-full w-full p-3 relative">
          <img
            className="rounded-full h-40 w-40 object-cover border"
            src={
              lawyer?.img
                ? lawyer.img
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt=""
          />
          {/* blur effect */}
          <div className="absolute bg-primary w-40 h-40 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-[5%] dark:bg-opacity-[10%] dark:brightness-50"></div>
          {isOnline ? (
            <>
              <span className="absolute top-3 bg-transparent border border-success w-40 h-40 rounded-full"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-success animate-ping"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-success"></span>
            </>
          ) : (
            <>
              <span className="absolute top-3 bg-transparent border border-accent w-40 h-40 rounded-full"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-accent animate-ping"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-accent"></span>
            </>
          )}
        </figure>
        <div className="content px-3 w-full h-full  rounded-b-xl ">
          <div className="flex flex-col gap-5 ">
            {/* <p className='flex items-center gap-3 text-xl font-bold'><div>{lawyer.name.substring(0, 3)} <span className="blur-sm">{lawyer.name.substring(3)}</span> </div><span className={`${lawyer.available ? 'bg-success' : 'bg-accent'} w-2 h-2 rounded-full`}></span> </p> */}
            <div className="flex flex-col items-end w-64">
              <Link
                to={`/profile/${lawyer?.UID}`}
                className="text-2xl uppercase flex gap-2"
              >
                <span className="text-accent font-bold">
                  {lawyer?.name.split(" ")[0]}
                </span>{" "}
                {lawyer?.name.split(" ")[1]}
              </Link>
              <p className="flex justify-end text-md">
                {/* <IoLocationSharp className="text-lg" /> */}
                {lawyer?.city}, {lawyer?.state}
              </p>
              <div className="flex gap-1">
                {lawyer?.languages?.map((item, index) => (
                  <span className="text-xs rounded-md" key={index}>
                    {item.trim()}
                    {index !== lawyer.languages.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <p className="flex items-center justify-end gap-2 text-xs">
                <BiTime className="text-sm" />{" "}
                {lawyer?.year ? date.getFullYear() - lawyer.year : "0 "}
                years
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 flex flex-col justify-start items-start p-1 rounded-lg ">
                <span className="font-semibold my-1">Specialties</span>
                <div className="text-start">
                  {/* {
                                    sortedSpecialties.length > 0 &&
                                    sortedSpecialties.slice(0, 6)?.map((item, index) => (
                                        <span
                                            className={`text-xs  ${matchedSpecialties.includes(item) ? 'bg-[#FFB2AE] text-primary' : 'bg-primary dark:bg-base-100'}`}
                                            key={index}
                                        >
                                            {item}
                                            {index !== sortedSpecialties.length - 1 && ", "}
                                        </span>
                                    ))
                                } */}
                  {sortedSpecialties.length === 0 &&
                    specialties
                      ?.sort()
                      ?.slice(0, 6)
                      ?.map((item, index) => (
                        <span className="text-xs " key={index}>
                          {item}
                          {index !== specialties.length - 1 && ", "}
                        </span>
                      ))}
                </div>
              </div>
              {/* <div className="flex flex-col gap-1 items-end p-1  rounded-lg ">
                            <span className="font-semibold my-1">
                                Languages
                            </span>
                            {lawyer?.languages?.map((item, index) => (
                                <span
                                    className="text-xs rounded-md"
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))}
                        </div> */}
            </div>
          </div>
          <div className="flex flex-col items-end justify-start gap-2">
            {/* <p className="flex items-center justify-end gap-2">
                        {lawyer?.year
                            ? date.getFullYear() - lawyer.year
                            : "0 "}
                        years
                        <BiTime className="text-sm" />{" "}
                    </p> */}
            {/* <div className="flex items-center justify-end gap-1  text-warning">
                        <span className="flex items-center">
                            <FaStar />
                        </span>{" "}
                        <span className="text-xs text-base-100 dark:text-primary">
                            5.0
                        </span>
                    </div> */}
            {/* <p className="flex flex-col items-start">
                        {lawyer?.languages?.map((item, index) => (
                            <span
                                className="text-xs m-1 p-1 rounded-md"
                                key={index}
                            >
                                {item}
                            </span>
                        ))}
                    </p> */}
            {/* <button onClick={() => handleDelete(lawyer.UID)} className='primary-btn '>Delete</button> */}
          </div>
        </div>
      </div>
    );
  }
  else if (!available) {
    return (
      <div className="bg-primary dark:bg-base-100 shadow flex flex-col h-full w-80 items-start justify-start rounded-xl gap-0 text-base-100 dark:text-primary dark:border border-gray-800 relative  ">
        <span className="absolute top-0 left-0  dark:bg-base-100 p-2 rounded-bl-xl">
          <p className="flex items-center text-xl gap-2 text-end font-semibold">
            <FaStar className="text-warning" /> 5.0
          </p>
          {/* {isOnline ? <p>Online</p> : <p>NOT Online</p>} */}
        </span>
        <span className="absolute top-0 right-0  dark:bg-base-100 p-2 rounded-bl-xl flex flex-col">
          <span className="text-2xl p-0 m-0 text-end font-semibold relative">
            <sup className="text-[17px] absolute top-3 -left-3">₹</sup>
            {lawyer?.rate} <span className="text-sm text-gray-500">/min</span>
          </span>
        </span>
        <figure className="flex justify-center rounded-full w-full p-3 relative">
          <img
            className="rounded-full h-40 w-40 object-cover border"
            src={
              lawyer?.img
                ? lawyer.img
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt=""
          />
          {/* blur effect */}
          <div className="absolute bg-primary w-40 h-40 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-[5%] dark:bg-opacity-[10%] dark:brightness-50"></div>
          {isOnline ? (
            <>
              <span className="absolute top-3 bg-transparent border border-success w-40 h-40 rounded-full"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-success animate-ping"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-success"></span>
            </>
          ) : (
            <>
              <span className="absolute top-3 bg-transparent border border-accent w-40 h-40 rounded-full"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-accent animate-ping"></span>
              <span className="absolute top-5 right-28 rounded-full w-3 h-3 bg-accent"></span>
            </>
          )}
        </figure>
        <div className="content px-3 w-full h-full  rounded-b-xl ">
          <div className="flex flex-col gap-5 ">
            {/* <p className='flex items-center gap-3 text-xl font-bold'><div>{lawyer.name.substring(0, 3)} <span className="blur-sm">{lawyer.name.substring(3)}</span> </div><span className={`${lawyer.available ? 'bg-success' : 'bg-accent'} w-2 h-2 rounded-full`}></span> </p> */}
            <div className="flex flex-col items-end w-64">
              <Link
                to={`/profile/${lawyer?.UID}`}
                className="text-2xl uppercase flex gap-2"
              >
                <span className="text-accent font-bold">
                  {lawyer?.name.split(" ")[0]}
                </span>{" "}
                {lawyer?.name.split(" ")[1]}
              </Link>
              <p className="flex justify-end text-md">
                {/* <IoLocationSharp className="text-lg" /> */}
                {lawyer?.city}, {lawyer?.state}
              </p>
              <div className="flex gap-1">
                {lawyer?.languages?.map((item, index) => (
                  <span className="text-xs rounded-md" key={index}>
                    {item.trim()}
                    {index !== lawyer.languages.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <p className="flex items-center justify-end gap-2 text-xs">
                <BiTime className="text-sm" />{" "}
                {lawyer?.year ? date.getFullYear() - lawyer.year : "0 "}
                years
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 flex flex-col justify-start items-start p-1 rounded-lg ">
                <span className="font-semibold my-1">Specialties</span>
                <div className="text-start">
                  {/* {
                                    sortedSpecialties.length > 0 &&
                                    sortedSpecialties.slice(0, 6)?.map((item, index) => (
                                        <span
                                            className={`text-xs  ${matchedSpecialties.includes(item) ? 'bg-[#FFB2AE] text-primary' : 'bg-primary dark:bg-base-100'}`}
                                            key={index}
                                        >
                                            {item}
                                            {index !== sortedSpecialties.length - 1 && ", "}
                                        </span>
                                    ))
                                } */}
                  {sortedSpecialties.length === 0 &&
                    specialties
                      ?.sort()
                      ?.slice(0, 6)
                      ?.map((item, index) => (
                        <span className="text-xs " key={index}>
                          {item}
                          {index !== specialties.length - 1 && ", "}
                        </span>
                      ))}
                </div>
              </div>
              {/* <div className="flex flex-col gap-1 items-end p-1  rounded-lg ">
                            <span className="font-semibold my-1">
                                Languages
                            </span>
                            {lawyer?.languages?.map((item, index) => (
                                <span
                                    className="text-xs rounded-md"
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))}
                        </div> */}
            </div>
          </div>
          <div className="flex flex-col items-end justify-start gap-2">
            {/* <p className="flex items-center justify-end gap-2">
                        {lawyer?.year
                            ? date.getFullYear() - lawyer.year
                            : "0 "}
                        years
                        <BiTime className="text-sm" />{" "}
                    </p> */}
            {/* <div className="flex items-center justify-end gap-1  text-warning">
                        <span className="flex items-center">
                            <FaStar />
                        </span>{" "}
                        <span className="text-xs text-base-100 dark:text-primary">
                            5.0
                        </span>
                    </div> */}
            {/* <p className="flex flex-col items-start">
                        {lawyer?.languages?.map((item, index) => (
                            <span
                                className="text-xs m-1 p-1 rounded-md"
                                key={index}
                            >
                                {item}
                            </span>
                        ))}
                    </p> */}
            {/* <button onClick={() => handleDelete(lawyer.UID)} className='primary-btn '>Delete</button> */}
          </div>
        </div>
      </div>
    )
  }
  else {
    return null
  }
};

const checkOnline = (array, uid) => {
  for (let i = 0; i < array?.length; i++) {
    if (array[i] === uid) {
      return true;
    }
  }
  return false;
};

export default LawyerCard;
