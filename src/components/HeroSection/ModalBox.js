import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { StateContext } from '../../contexts/StateProvider/StateProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

function ModalBox() {
    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const { fname, lname, email, state, city, contact, experience, rate, language, specialties, summary } = data;

        const lawyer = {
            fname,
            lname,
            email,
            contact,
            state,
            city,
            experience,
            rate,
            language: language.split(',') || [],
            specialties: specialties.split(',') || [],
            summary,
            rating: 0,
            review: 0,
        }

        console.log(lawyer)

        // try {
        // fetch(`${process.env.REACT_APP_SERVER_LINK}/adduser`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(lawyer)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('lawyer data: ', data)
        //     })
        // }
        // catch (error) {
        //     console.log(errors);
        // }
    }


    // const imageHostKey = process.env.REACT_APP_IMGBB_KEY;


    // const onSubmit = data => {
    //     const { fname, email, state, city, contact, experience, rate, language, specialties, summary } = data;

    //     const image = data.image[0]
    //     const formData = new FormData()
    //     formData.append('image', image)
    //     const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    //     fetch(url, {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(imgUpload => {
    //             if (imgUpload.success) {
    //                 console.log(imgUpload.data.url)
    //                 const lawyer = {
    //                     fname,
    //                     email,
    //                     contact,
    //                     image: imgUpload.data.url,
    //                     state,
    //                     city,
    //                     experience,
    //                     rate,
    //                     language,
    //                     specialties,
    //                     summary,
    //                     rating: 0,
    //                     review: 0,
    //                     date: new Date().toDateString(),
    //                 }
    //                 fetch(`${process.env.REACT_APP_SERVER_LINK}/add`, {
    //                     method: 'POST',
    //                     headers: {
    //                         'content-type': 'application/json'
    //                     },
    //                     body: JSON.stringify(lawyer)
    //                 })
    //                     .then(res => res.json())
    //                     .then(result => {
    //                         toast.success(`${lawyer.fname} is added successfully`) 
    //                     }
    //                     )
    //             }
    //         })

    // }

    const [zipCode, setZipCode] = useState('');
    const [stateInfo, setStateInfo] = useState(null);
    const [cityInfo, setCityInfo] = useState([]);

    const handlePlace = (state, city) => {
        setStateInfo(state);
        setCityInfo(city);
        console.log(city.map(city => city['place name']))
    }


    useEffect(() => {
        if (zipCode.length > 5) {
            fetch(`http://api.zippopotam.us/in/${zipCode}`)
                .then(response => response.json())
                .then(data => handlePlace((data.places[0].state), (data.places)))
                .catch(error => console.error(error));
        }
    }, [zipCode]);

    const handleZipCodeChange = event => {
        setZipCode(event.target.value);
    };

    console.log(stateInfo)
    console.log(zipCode)
    console.log(cityInfo)

    return (
        <>
            <button className='primary-btn' onClick={() => setIsOpen(true)}>Add Lawyer</button>

            {isOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <p className="text-3xl pb-5 font-thin text-start">Add Lawyer</p>
                                <div className="">
                                    <form
                                        className="grid grid-cols-2 gap-5"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <label class="col-span-2 flex flex-col items-start justify-start ">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Full Name:
                                            </span>
                                            <input
                                                type="text"
                                                class="input-box w-full"
                                                name="fname"
                                                placeholder='Rajesh Kumar'
                                                {...register("fname", { required: true, maxLength: 80 })} />
                                            {errors.name && <p className='text-accent underline decoration-red-5'>{errors.name.fname}</p>}
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start justify-start ">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-14">
                                                Email
                                            </span>
                                            <input
                                                type="email"
                                                class="input-box w-full"
                                                name="email"
                                                placeholder='example@mail.com'
                                                {...register("email", { required: true, maxLength: 80 })}
                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-40">
                                                Contact number
                                            </span>
                                            <input
                                                type="text"
                                                class="input-box w-full"
                                                name="contact"
                                                placeholder='+91 1234567890'
                                                {...register("contact", { required: true, maxLength: 80 })}
                                            />
                                        </label>
                                        {/* <label className="col-span-2 grid grid-cols-2 pt-1">
                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                    Pick a file
                                </span>
                                    <input type="file" className="file-input bg-accent w-full "
                                    {...register("image", {
                                        required: "Image is required"
                                    })}
                                    />                                
                                    {errors.image && <p className='text-accent'>Image is required</p>}
                            </label> */}

                                        <div className="col-span-2 grid grid-cols-3 gap-5">
                                            <label class="col-span-1 flex flex-col items-start">
                                                <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    State
                                                </span>
                                                <input
                                                    type="text"
                                                    class="input-box w-full"
                                                    name="state"
                                                    placeholder='West Bengal, Maharashtra, etc.'
                                                    defaultValue={stateInfo}
                                                    disabled
                                                />
                                            </label>
                                            <label class="col-span-1 flex flex-col items-start">
                                                <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    City
                                                </span>
                                                <select className="input-box w-full max-w-xs">
                                                    {cityInfo?.map(city => <option value={city['place name']}>{city['place name']}</option>)}
                                                </select>
                                            </label>
                                            <label class="col-span-1 flex flex-col items-start">
                                                <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Pincode
                                                </span>
                                                <input
                                                    className='input-box w-full'
                                                    type="text" id="zipCodeInput" value={zipCode} onChange={handleZipCodeChange}
                                                />
                                            </label>
                                        </div>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Experience
                                            </span>
                                            <input
                                                type="number"
                                                class="input-box w-full"
                                                name="experience"
                                                placeholder='In years'
                                                {...register("experience", { required: true, maxLength: 80 })}

                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Rate per minute
                                            </span>
                                            <input
                                                type="number"
                                                class="input-box w-full"
                                                name="rate"
                                                placeholder='In Rs'
                                                {...register("rate", { required: true, maxLength: 80 })}

                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Language
                                            </span>
                                            <input
                                                type="text"
                                                class="input-box w-full"
                                                name="language"
                                                placeholder='English, Hindi, etc.'
                                                {...register("language", { required: true, maxLength: 80 })}

                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Specialties
                                            </span>
                                            <input
                                                type="text"
                                                class="input-box w-full"
                                                name="specialties"
                                                placeholder='Cyber Crime, Civil matters, etc.'
                                                {...register("specialties", { required: true, maxLength: 80 })}

                                            />
                                        </label>
                                        <label class="col-span-2 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-60">
                                                Professional Summary
                                            </span>
                                            <textarea
                                                type="text"
                                                class="input-box w-full h-28"
                                                name="summary"
                                                placeholder='Write your professional summary'
                                                {...register("summary", { required: true, maxLength: 400 })}

                                            />
                                        </label>
                                        <button onClick={() => setIsOpen(false)} className="primary-outline-btn">
                                            Cancel
                                        </button>
                                        <button type="submit" className="primary-btn">
                                            Confirm
                                        </button>

                                    </form>
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