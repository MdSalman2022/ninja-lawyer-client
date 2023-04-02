import React, { useEffect } from 'react'
import { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const LawyerCard = ({ lawyer, specialtiesArray }) => {

    // console.log(specialtiesArray)

    let specialties = lawyer?.specialties

    specialties = specialties.map((str) => {
        if (str[0] === " ") {
            return str.substring(1);
        } else {
            return str;
        }
    }).filter(str => str !== '');



    console.log(specialties, lawyer.name)

    const [sortedSpecialties, setSortedSpecialties] = useState([])
    const [matchedSpecialties, setMatchedSpecialties] = useState([])
    const [remainingSpecialties, setRemainingSpecialties] = useState([])

    useEffect(() => {
        if (specialties) {
            const matched = specialties.filter(item => specialtiesArray.includes(item)).sort()
            setMatchedSpecialties(matched)
            const remaining = specialties.filter(item => !specialtiesArray.includes(item)).sort()
            setRemainingSpecialties(remaining)
        }
    }, [specialtiesArray])

    useEffect(() => {
        setSortedSpecialties([...matchedSpecialties, ...remainingSpecialties])
    }, [matchedSpecialties, remainingSpecialties, setSortedSpecialties])

    console.log(sortedSpecialties)



    // console.log("matched " + matchedSpecialties)
    // console.log("sorted " + sortedSpecialties)
    // console.log(specialtiesArray)
    // console.log(specialties, lawyer.name)
    // const selectedSpecialties = specialties.filter(item => specialtiesArray.includes(item.trim()))

    // console.log("selected specialty " + selectedSpecialties)


    const date = new Date()
    return (
        <div
            className="bg-primary dark:bg-base-100   shadow flex flex-col h-full w-80 items-start justify-start rounded-xl gap-5 text-base-100 dark:text-primary dark:border border-gray-800 relative  "
        >
            <span className="absolute top-0 right-0 bg-primary dark:bg-base-100 p-2 rounded-bl-xl shadow-xl ">
                <p className="text-2xl text-end font-bold">
                    ₹{lawyer?.rate}
                </p>
                <p className="text-base-100 dark:text-secondary opacity-60 text-sm">
                    Per Minute
                </p>
            </span>
            <figure className="flex justify-center rounded-full w-full p-3">
                <img
                    className="rounded-full h-40 w-40 object-cover"
                    src={
                        lawyer?.img
                            ? lawyer.img
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt=""
                />
                {/* blur effect */}
                <div className="absolute   bg-primary w-40 h-40 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-[5%] dark:bg-opacity-[10%] dark:brightness-50"></div>

            </figure>
            <div className="content p-3 w-full h-full  rounded-b-xl ">
                <div className="flex flex-col ">
                    {/* <p className='flex items-center gap-3 text-xl font-bold'><div>{lawyer.name.substring(0, 3)} <span className="blur-sm">{lawyer.name.substring(3)}</span> </div><span className={`${lawyer.available ? 'bg-success' : 'bg-accent'} w-2 h-2 rounded-full`}></span> </p> */}
                    <div className="flex flex-col items-end justify-end ">
                        <Link
                            to={`/profile/${lawyer.UID}`}
                            className="text-xl uppercase flex gap-2"
                        >
                            <span className='text-accent font-bold'>{lawyer?.name.split(" ")[0]}</span> {lawyer?.name.split(" ")[1]}
                        </Link>
                        <p className="flex justify-end text-sm">
                            {/* <IoLocationSharp className="text-lg" /> */}
                            {lawyer?.city}, {lawyer?.state}
                        </p>
                        <p className="flex items-center gap-2 justify-end text-sm">
                            5.0  <FaStar className='text-warning' />
                        </p>
                        <p className="flex items-center justify-end gap-2">
                            {lawyer?.year
                                ? date.getFullYear() - lawyer.year
                                : "0 "}
                            years
                            <BiTime className="text-sm" />{" "}
                        </p>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className="col-span-2 flex flex-col justify-start items-start p-1 rounded-lg ">
                            <span className="font-semibold my-1">
                                Specialties
                            </span>
                            <div className="flex flex-col items-start justify-start">
                                {
                                    sortedSpecialties.length > 0 ?
                                        sortedSpecialties.slice(0, 3)?.map((item, index) => (
                                            <span
                                                className={`text-xs  m-1 p-1 rounded-md ${matchedSpecialties.includes(item) ? 'bg-[#FFB2AE] text-primary' : 'bg-primary dark:bg-base-100'}`}
                                                key={index}
                                            >
                                                {item}

                                            </span>
                                        ))
                                        :
                                        specialties?.sort()?.slice(0, 3)?.map((item, index) => (
                                            <span
                                                className="text-xs  m-1 p-1 rounded-md"
                                                key={index}
                                            >
                                                {item}
                                            </span>
                                        ))
                                }

                            </div>
                        </div>
                        <div className="flex flex-col items-end p-1  rounded-lg ">
                            <span className="font-semibold my-1">
                                Languages
                            </span>
                            {lawyer?.languages?.map((item, index) => (
                                <span
                                    className="text-xs m-1 p-1 rounded-md"
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
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

export default LawyerCard