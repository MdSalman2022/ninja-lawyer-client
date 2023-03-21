import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';


const LawyerUpdateModal = ({ lawyer }) => {
    console.log(lawyer)
    const [isOpen, setIsOpen] = useState(false);

    const [zipCode, setZipCode] = useState(lawyer.pincode);
    const [stateInfo, setStateInfo] = useState(lawyer.state);
    const [cityInfo, setCityInfo] = useState(lawyer.city);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [specialties, setSpecialties] = useState(lawyer.specialties);
    const [languages, setLanguages] = useState(lawyer.language);




    const onSubmit = data => {


        setIsOpen(false);
        const { fname, email, city, contact, experience, rate, summary } = data;

        const lawyerUpdated = {
            fname,
            email,
            contact,
            state: stateInfo,
            city,
            pincode: zipCode,
            experience,
            rate,
            language: languages,
            specialties: specialties,
            summary,
            rating: 0,
            review: 0,
            UID: lawyer.UID,
        }

        console.log(lawyerUpdated)

        try {
            fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/update/${lawyer.UID}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(lawyerUpdated)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('lawyer data: ', data)
                    toast.success('Lawyer Updated Successfully')
                })
        }
        catch (error) {
            console.log(errors);
        }
    }


    const handlePlace = (state, city) => {
        setStateInfo(state);
        setCityInfo(city);
    }


    const apiKey = 'aHhIRnFkYWRqTU5FVjhKd3labW1UMTR2Zm1TMXpaQmwzRERVUzlLSg==';
    const countryId = 'IN';
    const url = `https://api.countrystatecity.in/v1/countries/${countryId}/states/4853/cities`;



    useEffect(() => {
        fetch(url, {
            headers: {
                'X-CSCAPI-KEY': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    })

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


    const languageSuggestions = ["English", "Hindi", "Telegu", "Assamese", "Kannada", "Marathi", "Odia", "Bengali", "Tamil", "Malayalam"];
    const specialtiesSuggestions = ["Divorce & Child Custody", "Property & Real Estate", "Cheque Bounce & Money Recovery", "Employment Issues", "Consumer Protection", "Civil Matters", "Cyber Crime", "Company & Start-Ups", "Other Legal Problem", "Criminal Matter", "MSME Recovery, MSME related matter."];

    const [languageError, setLanguageError] = useState('')
    const [specialtiesError, setSpecialtiesError] = useState('')


    const [languageInputValue, setLanguageInputValue] = useState('')
    const [specialtiesInputValue, setSpecialtiesInputValue] = useState('')

    const handleSpecialtyInputValue = (event) => {
        const { value } = event.target;
        setSpecialtiesInputValue(value);
    }

    const handleSpecialties = (event) => {
        const { value } = event.target;

        console.log(value)

        if (event.key === 'Enter' && value.trim() !== '') {
            event.preventDefault()
            if (specialties.includes(value)) {
                setSpecialtiesInputValue('')
                setSpecialtiesError(`${value} specialty already added`)
                return;
            }
            else
                setSpecialtiesError('')

            if (!specialtiesSuggestions.includes(value)) {
                setSpecialtiesError(`"${value}" specialty not available`)
                return;
            }
            else
                setSpecialtiesError('')

            setSpecialties([...specialties, value]);
            setSpecialtiesInputValue('');
        }
        else if (event.key === 'Enter' && value.trim() === '') {
            event.preventDefault()

        }
    }

    const handleRemoveSpecialty = (specialty) => {
        const newSpecialties = specialties.filter((special) => special !== specialty);
        setSpecialties(newSpecialties);
    }

    const handleLanguageInputValue = (event) => {
        const { value } = event.target;
        setLanguageInputValue(value);
    }

    const handleLanguages = (event) => {
        const { value } = event.target;
        console.log(value)

        if (event.key === 'Enter' && value.trim() !== '') {
            event.preventDefault()
            if (languages.includes(value)) {
                setLanguageInputValue('')
                setLanguageError(`${value} language already added`)
                return;
            }
            else
                setLanguageError('')

            if (!languageSuggestions.includes(value)) {
                setLanguageError(`"${value}" language not available`)
                return;
            }
            else
                setLanguageError('')

            setLanguages([...languages, value]);
            setLanguageInputValue('');
        }
        else if (event.key === 'Enter' && value.trim() === '') {
            event.preventDefault()

        }
    }

    const handleRemoveLanguage = (language) => {
        const newLanguages = languages.filter((lang) => lang !== language);
        setLanguages(newLanguages);
    }




    console.log(languages)
    console.log(specialties)
    console.log(cityInfo)



    return (
        <>
            <span onClick={() => setIsOpen(true)} className='absolute top-5 right-5 text-xl'><BiEdit /></span>

            {isOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="bg-primary dark:bg-base-100 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-primary dark:bg-base-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                                                defaultValue={lawyer.fname}
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
                                                defaultValue={lawyer.email}
                                                {...register("email", { required: true, maxLength: 80 })}
                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start ">

                                            <span class="text-start font-medium text-base-100 dark:text-primary w-40">
                                                Contact number
                                            </span>
                                            <div className='flex items-end'>
                                                <span className=' rounded-l-md h-[90%] border-y border-l px-1 bg-primary flex items-center'>+91</span>
                                                <input
                                                    type="text"
                                                    class="input-box w-full rounded-l-none border-l-none"
                                                    name="contact"
                                                    defaultValue={lawyer.contact}
                                                    {...register("contact", { required: true, maxLength: 80 })}
                                                />

                                            </div>

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
                                                    value={stateInfo} readOnly
                                                />
                                            </label>
                                            <label class="col-span-1 flex flex-col items-start">
                                                <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    City
                                                </span>
                                                <select className="input-box w-full max-w-xs" {...register("city", { required: true })}>
                                                    {lawyer.city && <option className='text-accent' value={lawyer.city} selected>{lawyer.city}</option>}
                                                    {cityInfo?.map(city => city['place name'] !== lawyer.city && <option value={city['place name']}>{city['place name']}</option>)}
                                                </select>
                                            </label>
                                            <label class="col-span-1 flex flex-col items-start">
                                                <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Pincode
                                                </span>
                                                <input
                                                    className='input-box w-full' name="pincode"
                                                    type="text" value={zipCode} onChange={handleZipCodeChange}
                                                    required
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
                                                defaultValue={lawyer.experience}
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
                                                defaultValue={lawyer.rate}
                                                {...register("rate", { required: true, maxLength: 80 })}

                                            />
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start w-full">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32 flex">
                                                Language
                                            </span>
                                            <div className=''>
                                                <input onKeyDown={handleLanguages} onChange={handleLanguageInputValue} value={languageInputValue} list="languages" id="languageInput" className={`input-box w-56 ${languageError === 0 ? 'border border-red-500' : ''}`} />
                                                <datalist id="languages" className='text-left w-full' >
                                                    {
                                                        languageSuggestions.map((language, index) => <option key={index} value={language} />)
                                                    }
                                                </datalist>
                                                <div className='text-xs flex flex-wrap gap-1 mt-1'>
                                                    {
                                                        lawyer.language.map((language, index) => <div className='flex items-center justify-between'>
                                                            <span key={index} className='px-1 rounded border  flex items-center gap-1'>{language} <RxCross1 onClick={() => handleRemoveLanguage(language)} className='cursor-pointer' /></span>
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                            <span className='text-xs text-error'>{languageError === 0 ? 'Please add atleast one language' : languageError}</span>
                                        </label>
                                        <label class="col-span-1 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                                                Specialties
                                            </span>
                                            <div className=''>
                                                <input onKeyDown={handleSpecialties} onChange={handleSpecialtyInputValue} value={specialtiesInputValue} list="specialties" id="specialtyInput" className={`input-box w-56 ${specialtiesError === 0 ? 'border border-red-500' : ''}`} />
                                                <datalist id="specialties" className='text-left w-full' >
                                                    {
                                                        specialtiesSuggestions.map((specialty, index) => <option key={index} value={specialty} />)
                                                    }
                                                </datalist>
                                                <div className='text-xs flex flex-wrap gap-1 mt-1'>
                                                    {
                                                        lawyer.specialties.map((specialty, index) => <div className='flex items-center justify-between'>
                                                            <span key={index} className='px-1 rounded border  flex items-center gap-1'>{specialty} <RxCross1 onClick={() => handleRemoveSpecialty(specialty)} className='cursor-pointer' /></span>
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                            <span className='text-xs text-error text-left'>{specialtiesError === 0 ? 'Please add atleast one specialty' : specialtiesError}</span>
                                        </label>
                                        <label class="col-span-2 flex flex-col items-start">
                                            <span class="text-start font-medium text-base-100 dark:text-primary w-60">
                                                Professional Summary
                                            </span>
                                            <textarea
                                                type="text"
                                                class="input-box w-full h-28"
                                                name="summary"
                                                defaultValue={lawyer.summary}
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

export default LawyerUpdateModal