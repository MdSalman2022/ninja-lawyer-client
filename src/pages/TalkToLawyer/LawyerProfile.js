import React from 'react'
import { BiEdit } from 'react-icons/bi'

const LawyerProfile = () => {
  const lawyer = [
    {
      name: 'Rajesh Kumar',
      experience: '5 years',
      location: 'Delhi, India',
      language: 'English, Hindi',
      specialties: ['Divorce & Child Custody', 'Property & Real Estate', 'Cheque Bounce & Money Recovery'],
      img: "https://i.ibb.co/sbnk2tP/img2.webp",
      available: true,
      rating: "5.0",
      reviews: 83,
      price: 29,
  },
] 
  
  return (
      <div className='py-20 bg-secondary dark:bg-base-100 text-base-100 dark:text-primary'>
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-10">
                  <div className="col-span-1 h-full flex flex-col items-center gap-5 bg-primary p-10 rounded-xl relative">
                      <span className='absolute top-5 right-5 text-xl'><BiEdit/></span>
                      <img className='w-40 rounded-full h-40 object-cover' src="https://t4.ftcdn.net/jpg/02/69/98/99/360_F_269989961_HoBNjq5oji0yelySb3Isb2lodbVeBrCI.jpg" alt="" />
                      <p>Name</p> 
                      <p>Rating</p>
                      <button className='primary-btn w-52'>Chat</button>
                      <p className="text-2xl font-bold">Services</p>
                  </div>
                  <div className="col-span-3 flex flex-col gap-5 bg-primary p-10 rounded-xl">
                    <p className="font-bold">Professional Summary</p>
                      <p>
                      With 30 years of professional lineage as a second-generation lawyer in the Delhi High Court, Bombay High Court Karnataka High Court, Telangana High Court, District Courts across India and Supreme Court Of India. I am a seasoned legal expert with a wealth of experience in a wide range of legal matters. As a representative of the Delhi Police, I am well-versed in providing legal advisory, drafting, and representing services across various courts in India. 
                    </p>
                    <hr />
                    <div className='space-y-4'>
                        <p>Specialties</p>
                        <div className='flex gap-5'>
                          {
                            lawyer[0].specialties.map((specialty, index) => {
                              return (
                                <span className='  bg-secondary p-2 rounded-lg' key={index}>{specialty}</span>
                              )
                            })
                          }
                        </div>
                    </div>
                    <div>
                        <p>Experience</p>
                        <p>5 years</p>
                    </div>
                    <div>
                        <p>Languages</p>
                        <p>Hindi, English</p>
                    </div>
                    <div>
                        <p>Location</p>
                        <p>Bangalore, Karnataka</p>
                    </div>
                  </div>
            </div>
          </div>
    </div>
  )
}

export default LawyerProfile