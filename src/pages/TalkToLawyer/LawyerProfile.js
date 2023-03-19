import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'
import LawyerUpdateModal from './LawyerUpdateModal'

const LawyerProfile = () => {

  const lawyer = useLoaderData()

  console.log(lawyer)

  const { fname, experience, state, city, pincode, language, specialties, img, available, rating, reviews, rate, summary } = lawyer

  //   const lawyer = [
  //     {
  //       name: 'Rajesh Kumar',
  //       experience: '5 years',
  //       location: 'Delhi, India',
  //       language: 'English, Hindi',
  //       specialties: ['Divorce & Child Custody', 'Property & Real Estate', 'Cheque Bounce & Money Recovery'],
  //       img: "https://i.ibb.co/sbnk2tP/img2.webp",
  //       available: true,
  //       rating: "5.0",
  //       reviews: 83,
  //       price: 29,
  //   },
  // ] 


  return (
    <div className='py-20 bg-secondary dark:bg-base-100 text-base-100 dark:text-primary'>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1 h-full flex flex-col items-center gap-5 bg-primary dark:bg-base-100 dark:border dark:border-gray-600 p-10 rounded-xl relative">
            <span className='absolute top-5 right-5 text-xl'><BiEdit /></span>
            <LawyerUpdateModal lawyer={lawyer} />
            <figure className='relative'>
              <img className='w-40 rounded-full h-40 object-cover border ' src={img ? img : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" />
              <span className='absolute top-0 bg-transparent border border-success w-40 h-40 rounded-full'></span>
              <span className='absolute top-5 right-5 rounded-full w-2 h-2 bg-success animate-ping'></span>
              <span className='absolute top-5 right-5 rounded-full w-2 h-2 bg-success'></span>
            </figure>
            <p>{fname}</p>
            <p className='flex items-center gap-1'>Rating: {rating} <FaStar className='text-yellow-400' /></p>
            <button className='primary-btn w-52'>Chat</button>
            <p className="text-2xl font-bold">Services</p>
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
                {
                  specialties?.map((specialty, index) => {
                    return (
                      <span className=' bg-secondary dark:bg-base-100 dark:border dark:border-gray-600 p-2 rounded-lg' key={index}>{specialty}</span>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <p>Experience</p>
              <p>{experience} years</p>
            </div>
            <div className='space-y-4'>
              <p>Languages</p>
              <p className='flex gap-5'>{lawyer?.language?.map((item, index) => (
                <span className='bg-secondary dark:bg-base-100 dark:border dark:border-gray-600 p-2 rounded-lg' key={index}>
                  {item}
                </span>
              ))}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{city}, {state}, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LawyerProfile