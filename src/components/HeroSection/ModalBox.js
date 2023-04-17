import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { StateContext } from '../../contexts/StateProvider/StateProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx'
import { MdOutlineUploadFile } from 'react-icons/md';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

function ModalBox({offer, offerStatus,handleComplete, CaseComplete}) {

    const { user } = useContext(AuthContext);
    const { userData } = useContext(StateContext);
    const [isOpen, setIsOpen] = useState(false); 


    const { register, handleSubmit, formState: { errors } } = useForm();
 

    const specialtiesList = [
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


    const [paymentModal, setPaymentModal] = useState(false);


    const onSubmit = data => {

        // setIsOpen(false);
        setPaymentModal(true)
        // if (specialties.length === 0) {
        //     setSpecialtiesError(0);
        //     return;
        // }
        // if (languages.length === 0) {
        //     setLanguageError(0);
        //     return;
        // }

        // const { fname, email, city, contact, experience, rate, summary } = data;

        // const lawyer = {
        //     fname,
        //     email,
        //     contact: ("+" + 91 + contact).toString(),
        //     state: stateInfo,
        //     city,
        //     pincode: zipCode,
        //     experience,
        //     rate,
        //     language: languages,
        //     specialties: specialties,
        //     summary,
        //     rating: 0,
        //     review: 0,
        //     UID: `U${Math.floor(Math.random() * 100000)}`,
        // }

        // console.log(lawyer)

        // try {
        //     fetch(`https://ninja-lawyer-server.vercel.app/api/users/add-lawyer`, {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(lawyer)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             toast.success(`${lawyer.fname} lawyer is added successfully`)
        //             console.log('lawyer data: ', data)
        //         })
        // }
        // catch (error) {
        //     console.log(errors);
        // }
    }


    /* const imageHostKey = process.env.REACT_APP_IMGBB_KEY;


    const onSubmit = data => {
        const { fname, email, state, city, contact, experience, rate, language, specialties, summary } = data;

        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgUpload => {
                if (imgUpload.success) {
                    console.log(imgUpload.data.url)
                    const lawyer = {
                        fname,
                        email,
                        contact,
                        image: imgUpload.data.url,
                        state,
                        city,
                        experience,
                        rate,
                        language,
                        specialties,
                        summary,
                        rating: 0,
                        review: 0,
                        date: new Date().toDateString(),
                    }
                    fetch(`${process.env.REACT_APP_SERVER_LINK}/add`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(lawyer)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${lawyer.fname} is added successfully`) 
                        }
                        )
                }
            })

    } */



    // useEffect(() => {
    //     fetch("https://datahub.io/core/language-codes/r/language-codes-3b2-iso-639-2.json")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setLanguages(data);
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    // console.log(languages) 

    const [completeOpen, setCompleteOpen] = useState(false);


    function splitTextIntoLines(text, wordsPerLine) {
        const words = text.split(" ");
        const lines = [];
        let line = "";
      
        for (let i = 0; i < words.length; i++) {
          if (i % wordsPerLine === 0 && line !== "") {
            lines.push(line);
            line = "";
          }
          line += words[i] + " ";
        }
      
        if (line !== "") {
          lines.push(line);
        }
      
        return lines;
      }

    
    
    return (
        <>
            {user.displayName === 'lawyer' && <button className='primary-btn' onClick={() => setIsOpen(true)}>Send Offer</button>}
            {
                user.displayName !== 'lawyer' &&
                <>
                    {offerStatus === 'offer' && <button className='primary-btn' onClick={() => setIsOpen(true)}>View Offer</button>}
                    <div className="relative">
                        {offerStatus === 'accepted' && <button onClick={()=>setCompleteOpen(!completeOpen)} className={`primary-btn bg-success hover:bg-green-600 ${CaseComplete === false ?  'flex items-center justify-center' : 'hidden'} gap-2 px-2`}>Approved <FaCaretRight/></button>} 
                        {offerStatus === 'accepted' && <button onClick={()=>handleComplete(true)} className={`${completeOpen === true && CaseComplete === false ? 'absolute right-10 top-0' : 'hidden'} primary-outline-btn border-success hover:bg-green-600 hover:border-green-600 text-success `}>Completed</button>} 
                        {offerStatus === 'accepted' && <button className={`${CaseComplete === true ? 'flex' : 'hidden'} primary-outline-btn border-success hover:bg-green-600 hover:border-green-600 text-success `}>Completed</button>} 

                    </div>
                    {offerStatus === 'rejected' && <button className='primary-btn bg-gray-400 text-gray-600 hover:bg-gray-400 cursor-not-allowed'>Rejected</button>}
                </>
            }

            {isOpen ? (
                <div className="fixed z-10 inset-0 overflow-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="bg-primary dark:bg-base-100 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
                            <div className="bg-primary dark:bg-base-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* <p className="text-3xl pb-5 text-start">Offer from lawyer1</p> */}
                                <div className="sm:max-w-2xl sm:w-full">
                                    {user.displayName !== 'lawyer' && paymentModal === false && 

                                        <form
                                            className="grid grid-cols-2 gap-5 "
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <div className=' col-span-2 flex flex-col flex-wrap gap-5'>
                                                <div className='flex flex-col'>
                                                    <span className="text-3xl">{offer.case_name} Case</span>
                                                    <span className="text-accent">{offer.name}</span>
                                               </div>
                                                {/* <ul>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                </ul> */}
                                                <div className='w-fit'>
                                                    <div className='whitespace-pre-wrap'>
                                                        {splitTextIntoLines(offer.description, 10)}
                                                    </div>
                                                </div>
                                                <p className="text-2xl text-accent font-bold">₹{offer.amount}</p>
                                            </div>

                                            <button onClick={() => setIsOpen(false)} className="primary-outline-btn">
                                                Reject Offer
                                            </button>
                                            <button type="submit" className="primary-btn">
                                                Accept Offer
                                            </button>
                                       

                                        </form>
                                    }

                                    {
                                        user.displayName !== 'lawyer' && paymentModal === true &&
                                         
                                             <div className='flex justify-center items-center'>
                                              <button onClick={()=>setIsOpen(false)} className="primary-btn">
                                                 Pay
                                             </button>
                                             </div>
                                    }
                                    
                                    {user.displayName === 'lawyer' &&

                                        <form
                                            className="grid grid-cols-2 gap-5"
                                            onSubmit={handleSubmit(onSubmit)}
                                        >

                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Client Name
                                                </span>
                                                <input
                                                    type="text"
                                                    className="input-box w-full text-accent "
                                                    name="client_name"
                                                    defaultValue="user1 names"
                                                    {...register("client_name", { required: true, maxLength: 400 })}
                                                    readOnly
                                                />
                                                {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                            </label>
                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Lawyer name
                                                </span>
                                                <input
                                                    type="text"
                                                    className="input-box w-full text-accent"
                                                    name="lawyer_name"
                                                    defaultValue={userData.name}
                                                    {...register("lawyer_name", { required: true, maxLength: 400 })} readOnly />
                                                {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                            </label>
                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Case Specialties
                                                </span>
                                                <select className='input-box w-full' {...register("Specialties")}>
                                                    {
                                                        specialtiesList.map((specialty, index) => <option key={index} value={specialty}>{specialty}</option>)
                                                    }
                                                </select>
                                            </label>

                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Case name
                                                </span>
                                                <input
                                                    type="text"
                                                    className="input-box w-full"
                                                    name="fname"
                                                    placeholder='Divorce case'
                                                    {...register("fname", { required: true, maxLength: 400 })} />
                                                {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                            </label>
                                            <div className='col-span-2 flex items-center gap-5'>
                                                <div className="flex flex-col items-start justify-start ">
                                                    <span className='text-start font-medium text-base-100 dark:text-primary w-32'>
                                                        <p>Upload Document</p>
                                                    </span>
                                                    <div className='input-box h-10 relative group'>
                                                        <MdOutlineUploadFile className='group-hover:text-accent absolute left-[45%] text-2xl' />
                                                        <input type="file" className="h-full w-full opacity-0" />
                                                    </div>
                                                </div>
                                                <label className="flex flex-col items-start justify-start ">
                                                    <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                        Case duration
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="input-box w-full"
                                                        name="fname"
                                                        placeholder='Number of days it will take '
                                                        {...register("fname", { required: true, maxLength: 400 })} />
                                                    {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                                </label>
                                                <label className="flex flex-col items-start justify-start ">
                                                    <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                        Offer Price
                                                    </span>
                                                    <div className='relative flex w-full'>
                                                        <span className='absolute left-2 top-3'>₹</span>
                                                        <input
                                                            type="number"
                                                            className="input-box w-full pl-5"
                                                            name="budget"
                                                            placeholder='15000'
                                                            {...register("budget", { required: true, maxLength: 80 })} />
                                                        {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.budget}</p>}
                                                    </div>
                                                </label>
                                            </div>

                                            <label className="col-span-2 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Case Description
                                                </span>
                                                <textarea
                                                    type="text"
                                                    className="input-box w-full h-40"
                                                    name="fname"
                                                    placeholder=' I am offering my legal services to assist individuals'
                                                    {...register("fname", { required: true, maxLength: 400 })} />
                                                {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                            </label>

                                            <button onClick={() => setIsOpen(false)} className="primary-outline-btn">
                                                Cancel
                                            </button>
                                            <button type="submit" className="primary-btn">
                                                Send Offer
                                            </button>

                                        </form>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default ModalBox;