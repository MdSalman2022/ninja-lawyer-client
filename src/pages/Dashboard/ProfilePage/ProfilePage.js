import React, { useEffect, useState, useContext } from "react";
import {
  AiOutlineCamera,
  AiOutlineDatabase,
  AiOutlineEdit,
} from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGenderMale } from "react-icons/bs";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { updateData, putDataToServer } from "./ProfilePageUpdateData";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import ProfileImage from "../../../components/Dashboard/Profile/ProfileImage";
import { RxCross1 } from 'react-icons/rx'

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const { heightFull, setHeightFull } = useContext(StateContext);

  useEffect(() => {
    const getProfile = (id) => {
      console.log("yes");
      fetch(`https://ninja-lawyer-server.vercel.app/api/users/${user.displayName === 'lawyer' ? 'get-lawyer' : 'get'}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserData(data);
        });
    };
    // call get
    if (user?.uid) {
      getProfile(user.uid);
    }
  }, [user]);

  const [edit, setEdit] = useState(false);

  function handleUpdate(e) {
    e.preventDefault();
    const data = updateData(e, user.uid);
    console.log(data);
    const updateResult = putDataToServer(user.uid, data);
    console.log(updateResult, "----");
    setHeightFull(!heightFull)
  }


  // specialties and languages function 

  const [specialties, setSpecialties] = useState([]);
  const [languages, setLanguages] = useState([]);
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

  return (
    <div
      className={`flex flex-col gap-5 text-base-100 dark:text-primary pb-10`}
    >
      <div className="shadow-lg rounded-xl bg-primary dark:bg-base-100 dark:border flex flex-col">
        {/* <div className="relative bg-gradient-to-r from-base-100 to-primary h-52 w-full rounded-t-xl">
          <div className="w-full h-full group">
            <AiOutlineCamera className="absolute left-[50%] top-[45%] text-5xl text-white  hidden group-hover:flex hover:text-primary hover:bg-gray-400 hover:border hover:border-gray-400 hover:shadow-xl cursor-pointer rounded-full p-2" />
          </div>
          <div className="absolute -bottom-16 left-10 border-4 rounded-full border-primary group cursor-pointer">
            <div className="absolute rounded-full h-32 w-32 bg-black bg-opacity-70 hidden group-hover:flex"></div>
            <AiOutlineCamera className="absolute left-[38%] top-[40%] text-3xl text-white hidden group-hover:flex" /> */}
        {/* <img
              className="rounded-full h-32 w-32 object-cover"
              src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png"
              alt=""
            /> */}
        <ProfileImage props={user?.uid} />
        {/* </div>
        </div> */}
        <div className="mt-[3%] p-10 flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl pb-2 flex items-center gap-2">
              {userData.name}
              <AiOutlineEdit
                onClick={() => setHeightFull(!heightFull)}
                className="hover:bg-gray-200 p-1 rounded-full text-3xl cursor-pointer"
              />
            </h2>
            <span className="flex items-center gap-2">
              {" "}
              <img
                className="w-5"
                src="https://i.ibb.co/R2B63FR/Flag-India.webp"
                alt=""
              />{" "}
              {userData.city}, {userData.state}, India
            </span>
            {
              user.displayName === "lawyer" && <button onClick={() => setHeightFull(!heightFull)} className="primary-btn">Get Verified</button>
            }
            {/* <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">@bhupen</span>
              <span className="font-semibold flex items-center">
                <AiOutlineDatabase className="" />
                Data Analyst at Dell Technologies
              </span>
            </div> */}
          </div>
          <div className="flex flex-col items-end gap-5 font-semibold">
            <span className="flex items-center gap-3">
              {userData.phone}
              <FiPhoneCall />{" "}
            </span>
            <span className="flex items-center gap-3">
              {userData.email}
              <HiOutlineMail />
            </span>
            <span className="flex items-center gap-3">
              {" "}
              Male
              <BsGenderMale />
            </span>
          </div>
        </div>
      </div>

      <div className={`${!heightFull && "hidden"}`}>
        <div className={`pb-5`}>
          <form
            className="col-span-1 grid grid-cols-3 gap-5 mt-5"
            onSubmit={handleUpdate}
          >
            <div className=" col-span-3 flex justify-between gap-2">

              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setHeightFull(!heightFull)}
                  className="primary-outline-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                >
                  Save
                </button>
              </div>
            </div>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Name
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="name"
                defaultValue={userData.name}
              />
            </label>
            {/* <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Last Name
              </span>
              <input type="text" class="input-box w-full" />
            </label> */}
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Email
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="email"
                defaultValue={userData.email}
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                Phone number
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="contact"
                defaultValue={userData?.phone ? userData.phone : userData.contact}
                required
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                State
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="state"
                defaultValue={userData.state}
                required
              />
            </label>
            <label class="col-span-2 grid grid-cols-2">
              <span class=" font-medium text-base-100 dark:text-primary w-32">
                City
              </span>
              <input
                type="text"
                class="input-box w-full"
                name="city"
                defaultValue={userData.city}
                required
              />
            </label>

            {
              user?.displayName === "lawyer" &&
              <div className="col-span-2 grid grid-cols-2 gap-5">
                <label class="col-span-2 grid grid-cols-2">
                  <span class=" font-medium text-base-100 dark:text-primary w-32">
                    Rate
                  </span>
                  <input
                    type="number"
                    class="input-box w-full"
                    name="rate"
                    defaultValue={userData.rate}
                    required
                  />
                </label>
                <label class="col-span-2 grid grid-cols-2">
                  <span class=" font-medium text-base-100 dark:text-primary w-32">
                    Bar Council ID
                  </span>
                  <input
                    type="text"
                    class="input-box w-full"
                    name="bar"
                    defaultValue={userData.bar}
                    required
                  />
                </label>
                <label class="col-span-2 grid grid-cols-2">
                  <span class=" font-medium text-base-100 dark:text-primary w-44">
                    Bar Council ID Image
                  </span>
                  <div className="flex items-center gap-3">
                    <img className="w-20" src={`https://thumbs.dreamstime.com/b/document-icon-vector-stack-paper-sheets-illustration-131104983.jpg`} alt="" />

                    <button className="primary-btn">Upload</button>
                    <button className="primary-outline-btn">Cancel</button>
                  </div>

                </label>
                <label class="col-span-2 grid grid-cols-2">
                  <span class=" font-medium text-base-100 dark:text-primary w-32">
                    Id no.
                  </span>
                  <input
                    type="text"
                    class="input-box w-full"
                    name="id"
                    defaultValue={userData.id}
                    required
                  />
                </label>
                <label class="col-span-2 grid grid-cols-2">
                  <span class=" font-medium text-base-100 dark:text-primary w-32">
                    Year
                  </span>
                  <input
                    type="text"
                    class="input-box w-full"
                    name="year"
                    defaultValue={userData.year}
                    required
                  />
                </label>

                <label class="col-span-2 grid grid-cols-2">
                  <span class="text-start font-medium text-base-100 dark:text-primary w-32 flex">
                    Language
                  </span>
                  <div className=''>
                    <input onKeyDown={handleLanguages} onChange={handleLanguageInputValue} value={languageInputValue} list="languages" id="languageInput" className={`input-box w-full ${languageError === 0 ? 'border border-red-500' : ''}`} required={languages.length > 0 ? false : true} />
                    <datalist id="languages" className='text-left w-full' >
                      {
                        languageSuggestions.map((language, index) => <option key={index} value={language} />)
                      }
                    </datalist>
                    <div className='text-xs flex flex-wrap gap-1 mt-1'>
                      {
                        languages.map((language, index) => <div className='flex items-center justify-between'>
                          <span key={index} className='px-1 rounded border  flex items-center gap-1'>{language} <RxCross1 onClick={() => handleRemoveLanguage(language)} className='cursor-pointer' /></span>
                        </div>)
                      }
                    </div>
                  </div>
                  <span className='col-span-2 flex justify-end text-xs text-error'>{languageError === 0 ? 'Please add atleast one language' : languageError}</span>
                </label>
                <label class="col-span-2 grid grid-cols-2">
                  <span class="text-start font-medium text-base-100 dark:text-primary w-32">
                    Specialties
                  </span>
                  <div className=''>
                    <input onKeyDown={handleSpecialties} onChange={handleSpecialtyInputValue} value={specialtiesInputValue} list="specialties" id="specialtyInput" className={`input-box w-full ${specialtiesError === 0 ? 'border border-red-500' : ''}`} required={specialties.length > 0 ? false : true} />
                    <datalist id="specialties" className='text-left w-full' >
                      {
                        specialtiesSuggestions.map((specialty, index) => <option key={index} value={specialty} />)
                      }
                    </datalist>
                    <div className='text-xs flex flex-wrap gap-1 mt-1'>
                      {
                        specialties.map((specialty, index) => <div className='flex items-start justify-start'>
                          <span key={index} className='px-1 rounded border  flex items-start justify-start text-left gap-1'>{specialty} <RxCross1 onClick={() => handleRemoveSpecialty(specialty)} className='cursor-pointer' /></span>
                        </div>)
                      }
                    </div>
                  </div>
                  <span className='col-span-2 flex justify-end text-xs text-error text-left'>{specialtiesError === 0 ? 'Please add atleast one specialty' : specialtiesError}</span>
                </label>
                <label class="col-span-2 grid grid-cols-2 ">
                  <span class="text-start font-medium text-base-100 dark:text-primary w-60">
                    Professional Summary
                  </span>
                  <textarea
                    type="text"
                    class="input-box w-full h-28"
                    name="summary"
                    placeholder='Write your professional summary'
                    required
                  />
                </label>
              </div>
            }



            {/* <button type="submit" className="btn btn-dark">
              {" "}
              Submit{" "}
            </button> */}



          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
