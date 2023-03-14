import React, { useState } from 'react' 
import { FaChevronDown, FaStar } from 'react-icons/fa'
import { BiCurrentLocation, BiTime } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { TiTickOutline } from 'react-icons/ti'
import {TbLanguage} from 'react-icons/tb'


function TalkToLawyerList() {
 

    const [isProblem, isProblemActive] = useState(false);
    const [isLanguage, isLanguageActive] = useState(false);
    const [isGender, isGenderActive] = useState(false);
    const [isExperience, isExperienceActive] = useState(false);

    const lawyersList = [
        {
            name: 'Rajesh Kumar',
            experience: '5 years',
            location: 'Delhi',
            language: 'English, Hindi',
            skills: ['Divorce & Child Custody', 'Property & Real Estate', 'Cheque Bounce & Money Recovery'],
            img: "https://i.ibb.co/sbnk2tP/img2.webp",
            available: true,
            rating: "5.0",
            reviews: 83,
            price: 29,
        },
        {
            name: 'Amit Kumar',
            experience: '3 years',
            location: 'Delhi',
            language: 'English, Hindi',
            skills: ['Consumer Protection', 'Civil Matters', 'Cyber Crime', 'Company & Start-Ups', 'Other Legal Problem'],
            img: "https://t4.ftcdn.net/jpg/02/41/80/03/360_F_241800366_vOVZNPPuPvDVmtG1yZgNW7D5er0KFaJ0.jpg",
            available: false,
            rating: "4.8",
            reviews: 77,
            price: 49,
        },
        {
            name: 'Abhishek Dutta',
            experience: '7 years',
            location: 'Kolkata',
            language: 'English, Hindi, Bengali',
            skills: ['Criminal Matter', 'Divorce & Child Custody', 'Property & Real Estate'],
            img: "https://img.freepik.com/free-photo/young-male-entrepreneur-making-eye-contact-against-blue-background_662251-739.jpg",
            available: false,
            rating: "4.5",
            reviews: 233,
            price: 37,
        },
        {
            name: 'Akashay Kumar',
            experience: '4 years',
            location: 'Mumbai',
            language: 'English, Hindi, Marathi',
            skills: ['Cheque Bounce & Money Recovery', 'Employment Issues', 'Consumer Protection', 'Civil Matters'],
            img: "https://st.depositphotos.com/1011643/2790/i/600/depositphotos_27902269-stock-photo-young-indian-businessman-working-on.jpg",
            available: true,
            rating: "4.7",
            reviews: 56,
            price: 19,
        },
        {
            name: 'Aamir Khan',
            experience: '2 years',
            location: 'Kerala',
            language: 'English, Hindi, Telegu',
            skills: ['Other Legal Problem', 'Criminal Matter', 'Divorce & Child Custody'],
            img: "https://t4.ftcdn.net/jpg/02/69/98/99/360_F_269989961_HoBNjq5oji0yelySb3Isb2lodbVeBrCI.jpg",
            available: true,
            rating: "4.8",
            reviews: 23,
            price: 35,
        },
        {
            name: 'Shidharth Malhotra',
            experience: '6 years',
            location: 'Noida',
            language: 'English, Hindi',
            skills: ['Property & Real Estate', 'Cheque Bounce & Money Recovery', 'Employment Issues'],
            img: "https://thumbs.dreamstime.com/b/smiling-indian-man-looking-camera-mature-wearing-spectacles-portrait-middle-eastern-confident-businessman-office-195195079.jpg",
            available: false,
            rating: "4.3",
            reviews: 110,
            price: 55,
        },
        {
            name: 'Aamir Khan',
            experience: '2 years',
            location: 'Punjab',
            language: 'English, Hindi, Telegu',
            skills: ['Cyber Crime, Company & Start-Ups', 'Other Legal Problem', 'Criminal Matter'],
            img: "https://us.123rf.com/450wm/instaphotos/instaphotos2209/instaphotos220900114/191045540-smiling-young-indian-business-man-wearing-suit-holding-tablet-vertical.jpg?ver=6",
            available: true,
            rating: "4.9",
            reviews: 80,
            price: 29,
        },
    ]

    return (
        <div className='bg-primary dark:bg-base-100'>
            <div className="container mx-auto py-10">
                <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
                    <div className="w-full col-span-1 lg:col-span-1 ">
                        <div className='border rounded-xl p-5 flex flex-col gap-5 select-none'>
                            <span onClick={() => isProblemActive(!isProblem)} className='flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold'>Problem Type <FaChevronDown className={`transition-all duration-300 ${isProblem && 'text-accent rotate-180' }`} /> </span>
                            <ul className={`transition-all duration-300 p-3 flex flex-col items-start  ${isProblem ? 'flex' : 'hidden '}`}>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Divorce & Child Custody</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Property & Real Estate</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Cheque Bounce & Money Recovery</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Employment Issues</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Consumer Protection</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Civil Matters</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Cyber Crime</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Company & Start-Ups</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Other Legal Problem</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Criminal Matter</label>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> MSME Recovery, MSME related matters</label>

                            </ul>
                            <span onClick={()=>isLanguageActive(!isLanguage)} className='flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold'>Language <FaChevronDown className={`transition-all duration-300 ${isLanguage && 'text-accent rotate-180' }`}/> </span>
                            <ul className={`transition-all duration-300 p-3 flex flex-col items-start ${isLanguage ? 'flex' : 'hidden'}`}>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> English</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Hindi</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Telegu</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Assamese</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Kannada</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Marathi</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Odia</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Bengali</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Tamil</label> 
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Malayalam</label> 

                            </ul>

                            <span onClick={()=>isGenderActive(!isGender)} className='flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold'>Gender <FaChevronDown className={`transition-all duration-300 ${isGender && 'text-accent rotate-180' }`}/> </span>
                            <ul className={`transition-all duration-300 p-3 flex flex-col items-start ${isGender ? 'flex' : 'hidden'}`}>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Male</label>  
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> Female</label>  
                            </ul>
                            <span onClick={()=>isExperienceActive(!isExperience)} className='flex items-center justify-between bg-secondary dark:bg-transparent dark:border dark:border-secondary p-3 rounded-lg text-base-100 dark:text-primary font-semibold'>Experience <FaChevronDown className={`transition-all duration-300 ${isExperience && 'text-accent rotate-180' }`}/> </span>
                            <ul className={`transition-all duration-300 p-3 flex flex-col items-start ${isExperience ? 'flex' : 'hidden'}`}>
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> {">"} 2 yrs</label>  
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> {">"} 3 yrs</label>  
                                <label className={`flex gap-5 items-center justify-between p-3 rounded-lg text-base-100 dark:text-primary font-semibold`}><input type="checkbox" className='checked:text-accent ' /> {">"} 5 yrs</label>  
                            </ul>

                        </div>
                    </div>

                    {/* Lawyers profile */}

                    <div className='col-span-1 md:col-span-2 xl:col-span-3 px-5 md:px-0'>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center place-content-center'>
                            {
                                lawyersList.map((lawyer, index) => (
                                    <div className='p-5 shadow flex flex-col items-center justify-center rounded-xl gap-5 text-base-100 dark:text-primary dark:border relative '>
                                        <div className='absolute top-2 right-5 flex items-center gap-1 text-warning'><span className='flex items-center'><FaStar /> {lawyer.rating}</span> <span className='text-xs text-base-100 dark:text-primary'>({lawyer.reviews})</span></div>
                                        <figure className='relative drop-shadow-lg'>
                                            <span className={`absolute top-1 right-4 w-3 h-3 border border-primary rounded-full z-50 ${lawyer.available ? 'bg-success' : 'bg-accent'}`}></span>
                                            <img className={`rounded-full w-28 h-28 object-cover outline outline-offset-2 outline-1  ${lawyer.available ? 'outline-success' : 'outline-accent'}`} src={lawyer.img} alt="" />
                                            <span className='bg-black w-28 h-28 absolute top-0 rounded-full backdrop-blur-sm bg-white/30'></span>
                                        </figure>
                                        <div className="content-body">
                                            {/* <p className='flex items-center gap-2 font-semibold'><CgProfile/> {lawyer.name.split(" ")
                                                .map((word) => {
                                                if (word.length <= 2) {
                                                    return word;
                                                } else {
                                                    return word[0] + "*".repeat(word.length - 2) + word.slice(-1);
                                                }
                                                })
                                                .join(" ")}
                                            </p> */}
                                            <span className="select-none flex items-center justify-start">{lawyer.name.substring(0,3)} <span className="blur-sm">{lawyer.name.substring(3)}</span></span>
      

                                            <p className='flex items-center gap-2'><BiCurrentLocation/> {lawyer.location}</p>
                                            <p className='flex items-center gap-2'><BiTime/> {lawyer.experience}</p>
                                            <p className='flex items-center gap-2'><TbLanguage/>{lawyer.language}</p>
                                            <p className='flex items-center flex-wrap'> <TiTickOutline/>
                                            {lawyer.skills.map((skill, index) => (
                                                <span className='text-xs border m-1 p-1 rounded-full'>
                                                {skill}
                                                </span>
                                            ))}
                                            </p>
                                            <p className='text-2xl font-bold'>₹{lawyer.price}</p>
                                            <p className='text-base-100 opacity-60 text-sm'>Per Minute</p>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default TalkToLawyerList
