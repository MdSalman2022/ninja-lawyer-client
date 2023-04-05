import React, { useContext, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'
import LawyerUpdateModal from './LawyerUpdateModal'
import { GoVerified } from 'react-icons/go'
import LawyerReview from './LawyerReview'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import { set } from 'react-hook-form'

const LawyerProfile = () => {

  const { user } = useContext(AuthContext)

  const lawyer = useLoaderData()

  console.log(lawyer)

  const { fname, experience, state, city, pincode, languages, specialties, img, available, rating, reviews, rate, summary, year, name, gender, verified, UID } = lawyer

  const date = new Date()

  const handleServicePurchase = (UID) => {
    const existingUIDs = localStorage.getItem('lawyerUIDs')
    const newUIDs = existingUIDs ? JSON.parse(existingUIDs).concat(UID) : [UID]
    localStorage.setItem('lawyerUIDs', JSON.stringify(newUIDs))
  }


  const [services, setServices] = useState([])

  const [serviceTaken, setServiceTaken] = useState(false)


  useEffect(() => {
    const lawyerUIDs = JSON.parse(localStorage.getItem('lawyerUIDs')) || []
    setServices(lawyerUIDs)

    let service = lawyerUIDs.includes(UID)
    setServiceTaken(service)
  }, [])

  console.log(services)
  console.log(serviceTaken)

  return (
    <div className='py-20 bg-secondary dark:bg-base-100 text-base-100 dark:text-primary'>
      <div className="container mx-auto space-y-5">
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1 h-full flex flex-col items-center gap-5 bg-primary dark:bg-base-100 dark:border dark:border-gray-600 p-10 rounded-xl relative">
            {/* <span className='absolute top-5 right-5 text-xl'><BiEdit /></span> */}
            {/* <LawyerUpdateModal lawyer={lawyer} /> */}
            <figure className='relative'>
              <img className='w-40 rounded-full h-40 object-cover border ' src={img ? img : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" />
              <span className='absolute top-0 bg-transparent border border-success w-40 h-40 rounded-full'></span>
              <span className='absolute top-5 right-5 rounded-full w-2 h-2 bg-success animate-ping'></span>
              <span className='absolute top-5 right-5 rounded-full w-2 h-2 bg-success'></span>
            </figure>
            <p className='flex items-center gap-1'>{name}<GoVerified className={`${verified ? 'text-blue-500' : 'text-gray-500'}`} /></p>
            <p className='flex items-center gap-1'>Rating: {rating} <FaStar className='text-yellow-400' /></p>
            <button className='primary-btn w-52'>Chat</button>
            <p className="text-2xl font-bold">Services</p>
            <button onClick={() => handleServicePurchase(UID)} className='primary-outline-btn'>Take service</button>
          </div>
          <div className="col-span-3 flex flex-col gap-5 bg-primary dark:bg-base-100 dark:border dark:border-gray-600 p-10 rounded-xl">
            <p className="font-bold">Professional Summary</p>
            <p>
              {summary}
            </p>
            <hr />
            <div className='space-y-4'>
              <p>Specialties</p>
              <div className='flex gap-5'>
                {specialties &&
                  specialties?.map((specialty, index) => {
                    return (
                      <span className=' bg-secondary dark:bg-base-100 dark:border dark:border-gray-600 p-2 rounded-lg' key={index}>{specialty ? specialty : "no speciality"}</span>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <p>Experience</p>
              <p>{experience ? experience : date.getFullYear() - year} years</p>
            </div>
            <div className='space-y-4'>
              <p>Languages</p>
              {
                languages && <p className='flex gap-5'>{lawyer?.languages?.map((item, index) => (
                  <span className='bg-secondary dark:bg-base-100 dark:border dark:border-gray-600 p-2 rounded-lg' key={index}>
                    {item}
                  </span>
                ))}</p>
              }
            </div>
            <div>
              <p>Location</p>
              <p>{city}, {state}, India</p>
            </div>
          </div>
        </div>

        <LawyerReview serviceTaken={serviceTaken} lawyer={lawyer} />
      </div>
    </div>
  )
}

export default LawyerProfile