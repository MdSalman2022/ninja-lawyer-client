import React from 'react'
import { BiTime } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const LawyerCard = ({ lawyer }) => {

    const date = new Date()
    return (
        <div
            className="bg-primary dark:bg-base-100 p-3 shadow flex flex-col h-full w-full items-start justify-start rounded-xl gap-5 text-base-100 dark:text-primary dark:border border-gray-800 relative  "
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
                <div className="absolute top-0 bg-primary w-full h-60 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-[50%] dark:bg-opacity-[10%] dark:brightness-50"></div>
                <span className="absolute top-0 right-0 bg-primary dark:bg-base-100 p-2 rounded-bl-xl shadow-xl">
                    <p className="text-2xl text-end font-bold">
                        ₹{lawyer?.rate}
                    </p>
                    <p className="text-base-100 dark:text-secondary opacity-60 text-sm">
                        Per Minute
                    </p>
                </span>
            </figure>
            <div className="content p-1 grid grid-cols-2 justify-between w-full h-full">
                <div className="flex flex-col items-start justify-start ">
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
                        <span className="font-semibold my-2">
                            Specialties
                        </span>
                        {lawyer?.specialties?.map((skill, index) => (
                            <span
                                className="text-xs border dark:border-gray-700 m-1 p-1 rounded-md"
                                key={index}
                            >
                                {skill}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="flex flex-col items-end justify-start gap-2">
                    <p className="flex items-center justify-end gap-2">
                        {lawyer?.experience
                            ? lawyer.experience
                            : date.getFullYear() - lawyer.year}{" "}
                        years
                        <BiTime className="text-sm" />{" "}
                    </p>
                    <div className="flex items-center justify-end gap-1  text-warning">
                        <span className="flex items-center">
                            <FaStar />
                        </span>{" "}
                        <span className="text-xs text-base-100 dark:text-primary">
                            5.0
                        </span>
                    </div>
                    <p className="flex flex-wrap justify-end">
                        {lawyer?.languages?.map((item, index) => (
                            <span
                                className="text-xs border dark:border-gray-700 m-1 p-1 rounded-md"
                                key={index}
                            >
                                {item}
                            </span>
                        ))}
                    </p>
                    {/* <button onClick={() => handleDelete(lawyer.UID)} className='primary-btn '>Delete</button> */}
                </div>
            </div>
        </div>
    )
}

export default LawyerCard