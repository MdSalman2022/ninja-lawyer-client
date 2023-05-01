import React, { useEffect, useState, useContext } from "react";
import {
  AiOutlineCamera,
  AiOutlineDatabase,
  AiOutlineEdit,
} from "react-icons/ai";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGenderMale } from "react-icons/bs";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { updateData, putDataToServer, putUserDataToServer } from "./ProfilePageUpdateData";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import ProfileImage from "../../../components/Dashboard/Profile/ProfileImage";
import { RxAvatar, RxCross1 } from 'react-icons/rx'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { MdLocationPin } from 'react-icons/md'
import { BiTime } from "react-icons/bi";
import { TiContacts } from 'react-icons/ti'
import { GiSkills } from 'react-icons/gi'
import { GrLanguage } from 'react-icons/gr'
import { Link } from "react-router-dom";
import { IoIosCall } from 'react-icons/io'

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { heightFull, setHeightFull, userData, setUserData, cityName, setCityName, setStateName, statesName } = useContext(StateContext);
  const [states, setStates] = useState([])

  const [stateId, setStateId] = useState('');
  const [cities, setCities] = useState([]);


  // useEffect(() => {
  //   const getProfile = (id) => {
  //     console.log("yes");
  //     fetch(`https://ninja-lawyer-server.vercel.app/api/users/${user.displayName === 'lawyer' ? 'get-lawyer' : 'get'}/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => { 
  //         setUserData(data);
  //       });
  //   };
  //   // call get
  //   if (user?.uid) {
  //     getProfile(user.uid);
  //   }
  // }, [user]);

  // console.log(userData)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "onSubmit",
  });


  let [specialties, setSpecialties] = useState(userData.specialties ? userData.specialties : []);
  let [languages, setLanguages] = useState(userData.languages ? userData.languages : []);


  const handleState = (iso) => {
    setStateId(iso)
    const name = states.find(state => state.iso2 === iso).name
    setStateName(name)
    userData.state = name
  }

  const handleCity = (data) => {
    console.log(data)
    setCityName(data)
    userData.city = data
  }

  console.log(userData)


  const handleUpdate = async (data) => {
    let { name, email, contact, rate, barID, id, barYear, summary, city, state } = data
    if (cityName) {
      city = cityName
    } else {
      city = userData.city
    }
    if (statesName) {
      state = statesName
    } else {
      state = userData.state
    }

    if (languages?.length === 0) {
      languages = userData?.languages
    }
    else if (userData.languages === '' || userData.languages === undefined) {
      languages = [...languages]
    }
    else {
      languages = [...languages, ...userData?.languages]
    }

    if (specialties?.length === 0) {
      specialties = userData?.specialties
    } else if (userData.specialties === '' || userData.specialties === undefined) {
      specialties = [...specialties]
    } else {
      specialties = [...specialties, ...userData?.specialties]
    }


    if (user.displayName !== 'lawyer') {

      const update_data = {
        name: name !== '' ? name : userData.name,
        email: email !== '' ? email : userData.email,
        contact: contact !== '' ? contact : userData.contact,
        state,
        city,
      }
      console.log(update_data)
      const update = updateData(update_data, user.uid);
      console.log(update_data);
      const updateResult = putUserDataToServer(user.uid, update, user);
      console.log(updateResult, "----");
      toast.success('Profile Updated Successfully')
      setUserData(update_data)
      setHeightFull(!heightFull)
    }
    else if (user.displayName === 'lawyer') {
      const update_data = {
        name: name !== '' ? name : userData.name,
        email: email !== '' ? email : userData.email,
        contact: contact !== '' ? contact : userData.contact,
        state,
        city,
        languages: languages,
        specialties: specialties,
        rate: rate !== '' ? rate : userData.rate,
        barYear: barYear !== '' ? barYear : userData.barYear,
        barID: barID !== '' ? barID : userData.barID,
        id: id !== '' ? id : userData.id,
        summary: summary !== '' ? summary : userData.summary,
      }
      console.log(update_data)

      let update = updateData(update_data, user.uid);
      console.log(update_data);
      const updateResult = putDataToServer(user.uid, update, user);
      console.log(updateResult, "----");
      toast.success('Profile Updated Successfully')
      setUserData(update_data)
      setHeightFull(!heightFull)
    }
  }


  // specialties and languages function 
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
  // console.log(languages)
  // console.log(specialties)


  const apiKey = 'aHhIRnFkYWRqTU5FVjhKd3labW1UMTR2Zm1TMXpaQmwzRERVUzlLSg==';

  useEffect(() => {
    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/`, {
      headers: {
        'X-CSCAPI-KEY': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        setStates(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])



  useEffect(() => {
    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateId}/cities`, {
      headers: {
        'X-CSCAPI-KEY': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        setCities(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [stateId])


  console.log(userData?.barId, userData?.barYear)


  const formattedDate = new Date(userData?.timestamp)?.toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });


  useEffect(() => {
    setHeightFull(false)
  }, [])


  return (
    <div
      className={`flex flex-col gap-5 text-base-100 dark:text-primary pb-10`}
    >
      <div className="flex flex-col items-start gap-5">
        <div className="grid grid-cols-5 gap-10">
          <div className="cols-span-1 flex flex-col gap-5 bg-white items-center rounded-lg h-full  w-fit p-10" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 7px 29px 0px' }}>
            <ProfileImage props={user?.uid} />
            <p>Profile Completeness: <span className="text-green-500">50%</span></p>
          </div>
          <div className="col-span-4 flex flex-col gap-10 bg-white  p-10 rounded-lg relative" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 7px 29px 0px' }}>
            <div className="absolute right-5 top-5 space-x-5">
              {user.displayName === 'lawyer' && <Link to={`/profile/${userData.UID}`} className="primary-outline-btn">Public View</Link>}
              <button onClick={() => setHeightFull(!heightFull)} className="primary-btn" style={{ boxShadow: 'rgba(255, 0, 0, 0.2) 0px 7px 29px 0px' }}>Edit Profile</button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <div className="p-2 bg-gray-200 rounded-full">
                  <RxAvatar className="text-2xl" />
                </div>
                {userData.name}
              </div>
              <div className="flex items-center gap-5">
                <div className="p-2 bg-gray-200 rounded-full">
                  <MdLocationPin className="text-2xl" />
                </div>
                {userData.city}, {userData.state}, India
              </div>
              <div className="flex items-center gap-5">
                <div className="p-2 bg-gray-200 rounded-full">
                  <FiMail className="text-2xl" />
                </div>
                {userData.email}
              </div>
              <div className="flex items-center gap-5">
                <div className="p-2 bg-gray-200 rounded-full">
                  <IoIosCall className="text-2xl" />
                </div>
                {userData.contact ? userData.contact : user.phoneNumber}
              </div>
            </div>

          </div>
          {user.displayName === 'lawyer' &&
            <div className="col-span-3 flex flex-col gap-10 bg-white  p-10 rounded-lg relative" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 7px 29px 0px' }}>




              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">UID:</span> {user.uid}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Experience:</span> 3 years
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    Practice Areas:
                  </span>
                  <div className="flex">
                    {userData.specialties ?
                      userData?.specialties?.slice(0, 3)?.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== userData.specialties.length - 1 && ", "}
                        </span>
                      ))
                      :
                      "No Specialties"
                    }

                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    Languages:
                  </span>
                  <div className="flex">
                    {userData.languages ?
                      userData?.languages?.slice(0, 3)?.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== userData.languages.length - 1 && ", "}
                        </span>
                      ))
                      :
                      "No Specialties"
                    }
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="font-semibold">Summary:</span> {userData.summary}
                </div>
              </div>
            </div>}

          {user.displayName === 'lawyer' &&
            <div className="col-span-2 flex flex-col gap-10 bg-white  p-10 rounded-lg relative" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 7px 29px 0px' }}>


              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Status:</span> {userData.verified === true ? <span className="text-success "> Verified</span> : <span className="text-accent"> Not Verified</span>}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Bar ID:</span> {userData.barID}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Bar Year:</span> {userData.barYear}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Rate:</span> ₹{userData.rate}<sub>/min</sub>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Joined On:</span> {formattedDate}
                </div>
              </div>
            </div>}
        </div>


      </div>


      {/* Profile edit section  */}
      <div className={`${!heightFull && "hidden"}`}>
        <div className={`pb-5 `}>
          <form
            className="grid grid-cols-3 gap-5 mt-5 "
            onSubmit={handleSubmit(handleUpdate)}
            novalidate="" action=""
          >
            <h1 className="col-span-3 ext-3xl font-bold">Edit Profile</h1>

            <div className="col-span-3 flex justify-end gap-3">
              <button onClick={() => setHeightFull(!heightFull)} type="reset" className="primary-outline-btn ">Cancel</button>
              <button type="submit" className="primary-btn " >Save</button>
            </div>

            <label className="col-span-2 grid grid-cols-2">
              <span className=" font-medium text-base-100 dark:text-primary w-32">
                Name
              </span>
              <input
                type="text"
                className="input-box w-full"
                name="name"
                defaultValue={userData.name}
                {...register("name", {
                  required: userData.name ? false : true, maxLength: 80
                })}
              />
              {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
            </label>

            <label className="col-span-2 grid grid-cols-2">
              <span className=" font-medium text-base-100 dark:text-primary w-32">
                Email
              </span>
              <input
                type="text"
                className="input-box w-full text-gray-400 border-gray-400"
                name="email"
                defaultValue={userData.email}
                {...register("email", { required: userData.email ? false : true, maxLength: 80 })}
                readOnly
              />
            </label>

            <label className="col-span-2 grid grid-cols-2">
              <span className=" font-medium text-base-100 dark:text-primary w-32">
                Phone number
              </span>
              {(userData?.contact?.slice(0, 4) === '+880' || user.phoneNumber?.slice(0, 4) === '+880') &&
                <div className="relative">
                  <span className="absolute h-[90%] w-fit left-0 top-1 p-2 border rounded-l-lg bg-gray-50 text-gray-700 border-gray-400">{user?.phoneNumber ? user?.phoneNumber.slice(0, 4) : userData?.contact?.slice(0, 4)}</span>
                  <input
                    type="text"
                    className="input-box w-full text-gray-400 border-gray-400 pl-16 text-[15px]"
                    name="contact"
                    defaultValue={user?.phoneNumber ? user?.phoneNumber?.slice(4) : userData?.contact?.slice(4)}
                    {...register("contact", { required: userData.contact ? false : true, maxLength: 80 })}
                    readOnly
                  />
                </div>
              }
              {(userData?.contact?.slice(0, 3) === '+91' || user.phoneNumber?.slice(0, 3) === '+91') &&
                <div className="relative">
                  <span className="absolute h-[90%] w-fit left-0 top-1 p-2 border rounded-l-lg bg-gray-50 text-gray-700 border-gray-400">{user?.phoneNumber ? user?.phoneNumber.slice(0, 3) : userData?.contact?.slice(0, 3)}</span>
                  <input
                    type="text"
                    className="input-box w-full text-gray-400 border-gray-400 pl-12 text-[15px]"
                    name="contact"
                    defaultValue={user?.phoneNumber ? user?.phoneNumber?.slice(3) : userData?.contact?.slice(3)}
                    {...register("contact", { required: userData.contact ? false : true, maxLength: 80 })}
                    readOnly
                  />
                </div>
              }
              {(userData?.contact?.slice(0, 4) !== '+880' && user.phoneNumber?.slice(0, 4) !== '+880' && userData?.contact?.slice(0, 3) !== '+91' && user.phoneNumber?.slice(0, 3) !== '+91') &&
                <div className="relative">
                  <input
                    type="text"
                    className="input-box w-full text-gray-400 border-gray-400 pl-3 text-[15px]"
                    name="contact"
                    defaultValue={user?.phoneNumber ? user?.phoneNumber : userData?.contact}
                    {...register("contact", { required: userData.contact ? false : true, maxLength: 80 })}
                    readOnly
                  />
                </div>
              }
            </label>

            <label className="col-span-2 grid grid-cols-2">
              <span className=" font-medium text-base-100 dark:text-primary w-32">
                State
              </span>
              <select name="state" id="" className="input-box" onChange={(e) => handleState(e.target.value)}
                required
              >
                {
                  userData.state &&
                  <option value={states.find(state => state.name === userData.state)?.iso2} selected>
                    {userData.state}
                  </option>
                }
                {
                  states.length > 0 &&
                  states.filter(state => state.name !== userData.state).map((state) => (
                    <option key={state.id} value={state?.iso2}>{state.name}</option>
                  ))
                }
              </select>
            </label>

            <label className="col-span-2 grid grid-cols-2">
              <span className=" font-medium text-base-100 dark:text-primary w-32">
                City
              </span>
              <select name="city" id="" className="input-box" onChange={(e) => handleCity(e.target.value)}
                required
              >
                {userData.city && !cities.length && (
                  <option value={userData.city} selected>
                    {userData.city}
                  </option>
                )}
                {cities.length > 0 &&
                  cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* lawyer data */}
            {
              user?.displayName === "lawyer" &&
              <div className="col-span-2 grid grid-cols-2 gap-5">
                <label className="col-span-2 grid grid-cols-2">
                  <span className=" font-medium text-base-100 dark:text-primary w-32">
                    Rate
                  </span>
                  <input
                    type="number"
                    className="input-box w-full"
                    name="rate"
                    defaultValue={userData.rate}
                    {...register("rate", { required: userData.rate ? false : true, maxLength: 80 })}
                  />
                </label>
                <label className="col-span-2 grid grid-cols-2">
                  <span className=" font-medium text-base-100 dark:text-primary w-32">
                    Bar Council ID
                  </span>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      className="input-box w-full"
                      name="barID"
                      defaultValue={userData.barID}

                      {...register("barID", { required: userData.barID ? false : true, maxLength: 80 })}
                    />
                    <button type="disabled" className="primary-btn">Upload</button>
                  </div>
                </label>
                {/* <label className="col-span-2 grid grid-cols-2">
                  <span className=" font-medium text-base-100 dark:text-primary w-44">
                    Bar Council ID Image
                  </span>
                  <div className="flex items-center gap-3">
                    <img className="w-20" src={`https://thumbs.dreamstime.com/b/document-icon-vector-stack-paper-sheets-illustration-131104983.jpg`} alt="" />

                    <button type="disabled" className="primary-btn">Upload</button>
                  </div>

                </label> */}
                <label className="col-span-2 grid grid-cols-2">
                  <span className=" font-medium text-base-100 dark:text-primary w-32">
                    Id no.
                  </span>
                  <input
                    type="text"
                    className="input-box w-full"
                    name="id"
                    defaultValue={userData.id}
                    {...register("id", {
                      required: userData.id ? false : true, maxLength: 80
                    })}
                  />
                </label>
                <label className="col-span-2 grid grid-cols-2">
                  <span className=" font-medium text-base-100 dark:text-primary w-32">
                    Year
                  </span>
                  <input
                    type="number"
                    className="input-box w-full"
                    name="barYear"
                    defaultValue={userData.barYear}
                    {...register("barYear", {
                      required: userData.barYear ? false : true, maxLength: 80
                    })}
                  />
                </label>

                <label className="col-span-2 grid grid-cols-2">
                  <span className="text-start font-medium text-base-100 dark:text-primary w-32 flex">
                    Language
                  </span>
                  <div className=''>
                    <input onKeyDown={handleLanguages} onChange={handleLanguageInputValue} value={languageInputValue} list="languages" id="languageInput" className={`input-box w-full ${languageError === 0 ? 'border border-red-500' : ''}`} required={languages.length > 0 ? false : true || userData.languages.length > 0 ? false : true} />
                    <datalist id="languages" className='text-left w-full' >
                      {
                        languageSuggestions.map((language, index) => <option key={index} value={language} />)
                      }
                    </datalist>
                    <div className='text-xs flex flex-wrap gap-1 mt-1'>
                      {languages &&
                        languages?.map((language, index) => <div className='flex items-center justify-between'>
                          <span key={index} className='px-1 rounded border  flex items-center gap-1'>{language} <RxCross1 onClick={() => handleRemoveLanguage(language)} className='cursor-pointer' /></span>
                        </div>)
                      }
                      {
                        userData.languages &&
                        userData?.languages.map((language, index) => <div className='flex items-center justify-between'>
                          <span key={index} className='px-1 rounded border  flex items-center gap-1'>{language} <RxCross1 onClick={() => handleRemoveLanguage(language)} className='cursor-pointer' /></span>
                        </div>)
                      }
                    </div>
                  </div>
                  <span className='col-span-2 flex justify-end text-xs text-error'>{languageError === 0 ? 'Please add atleast one language' : languageError}</span>
                </label>
                <label className="col-span-2 grid grid-cols-2">
                  <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                    Specialties
                  </span>
                  <div className=''>
                    <input onKeyDown={handleSpecialties} onChange={handleSpecialtyInputValue} value={specialtiesInputValue} list="specialties" id="specialtyInput" className={`input-box w-full ${specialtiesError === 0 ? 'border border-red-500' : ''}`} required={specialties.length > 0 ? false : true || userData.specialties.length > 0 ? false : true} />
                    <datalist id="specialties" className='text-left w-full' >
                      {
                        specialtiesSuggestions.map((specialty, index) => <option key={index} value={specialty} />)
                      }
                    </datalist>
                    <div className='text-xs flex flex-wrap gap-1 mt-1'>
                      {specialties &&
                        specialties.map((specialty, index) => <div className='flex items-start justify-start'>
                          <span key={index} className='px-1 rounded border  flex items-start justify-start text-left gap-1'>{specialty} <RxCross1 onClick={() => handleRemoveSpecialty(specialty)} className='cursor-pointer' /></span>
                        </div>)
                      }
                      {
                        userData.specialties &&
                        userData.specialties.map((specialty, index) => <div className='flex items-start justify-start'>
                          <span key={index} className='px-1 rounded border  flex items-start justify-start text-left gap-1'>{specialty} <RxCross1 onClick={() => handleRemoveSpecialty(specialty)} className='cursor-pointer' /></span>
                        </div>)
                      }
                    </div>
                  </div>
                  <span className='col-span-2 flex justify-end text-xs text-error text-left'>{specialtiesError === 0 ? 'Please add atleast one specialty' : specialtiesError}</span>
                </label>
                <label className="col-span-2 grid grid-cols-2 ">
                  <span className="text-start font-medium text-base-100 dark:text-primary w-60">
                    Professional Summary
                  </span>
                  <textarea
                    type="text"
                    className="input-box w-full h-28"
                    name="summary"
                    placeholder='Write your professional summary'
                    {...register("summary", { required: userData.name ? false : true })}
                    defaultValue={userData.summary}
                  />
                </label>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;