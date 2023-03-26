import React, { useContext, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
// import { lawyersList } from './LawyerList'
import { IoLocationSharp } from "react-icons/io5";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import Fuse from 'fuse.js'


function TalkToLawyerList() {
    const { user } = useContext(AuthContext);
    const { userData } = useContext(StateContext);

    const [isProblem, isProblemActive] = useState(true);
    const [isLanguage, isLanguageActive] = useState(false);
    const [isGender, isGenderActive] = useState(false);
    const [isExperience, isExperienceActive] = useState(false);
    const [isLocation, isLocationActive] = useState(true);
    const [specialtiesArray, setSpecialtiesArray] = useState(["nothing"]);
    const [problemSeeMore, setProblemSeeMore] = useState(false);
    const [languageSeeMore, setLanguageSeeMore] = useState(false);
    const [mylocation, setMyLocation] = useState(userData.state);
    const [lawyerList, setLawyerList] = useState([]);
    const [cityName, setCityName] = useState("");
    const date = new Date();

    const languageSuggestions = [
        "English",
        "Hindi",
        "Telegu",
        "Assamese",
        "Kannada",
        "Marathi",
        "Odia",
        "Bengali",
        "Tamil",
        "Malayalam",
    ];
    const specialtiesSuggestions = [
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

    console.log(lawyerList);

    const apiKey = "aHhIRnFkYWRqTU5FVjhKd3labW1UMTR2Zm1TMXpaQmwzRERVUzlLSg==";

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateId, setStateId] = useState("");

    let citiesList = [];


    useEffect(() => {
        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/`, {
            headers: {
                "X-CSCAPI-KEY": apiKey,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.find((state) => state.name === userData.state) &&
                    setStateId(data.find((state) => state.name === userData.state).iso2);
                setStates(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        states.map((state) => {
            fetch(
                `https://api.countrystatecity.in/v1/countries/IN/states/${state.iso2}/cities`,
                {
                    headers: {
                        "X-CSCAPI-KEY": apiKey,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    citiesList.push(
                        data.map((city, index) => {
                            return {
                                id: index + 1,
                                name: city.name,
                                state: state.iso2,
                                stateName: state.name,
                            };
                        })
                    );
                    console.log(citiesList)
                    let newCities = citiesList.flat().map((item, index) => ({
                        id: index + 1,
                        city: item.name,
                        state: item.stateName,
                    }))
                    console.log(newCities)
                    setCities(newCities);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        });
    }, [states]);


    const handleDelete = (id) => {
        fetch(
            `https://ninja-lawyer-server.vercel.app/api/users/lawyer/delete/${id}`,
            {
                method: "DELETE",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    const remaining = lawyerList.filter((lawyer) => lawyer._id !== id);
                    setLawyerList(remaining);
                    toast.success(`${id} lawyer deleted successfully}`);
                    console.log(result);
                }
            });
    };

    // location input box handle
    // const handleLocation = (e) => {
    //     let { value } = e.target;
    //     if (e.key === "Enter" && value.trim() !== "") {
    //         value = value.substring(0, 1).toUpperCase() + value.substring(1);
    //         value = value.replace(/\s+/g, "_");
    //         setCityName(value);
    //         console.log(value);
    //     }
    // };

    // lawyer list fetch
    useEffect(() => {
        !cityName &&
            fetch(
                `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search?state=${userData.state}`
            )
                .then((res) => res.json())
                .then((data) => setLawyerList(data));
    }, [cityName, userData.state]);

    useEffect(() => {
        cityName &&
            fetch(
                `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search?city=${cityName}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setLawyerList(data);
                    console.log(data);
                });
    }, [cityName]);

    //   Get cehcbox of specialties
    const handleCheck = async (specialty) => {
        if (specialtiesArray.includes(specialty)) {
            let i = 0;
            for (i = 0; i < specialtiesArray.length; i++) {
                if (specialtiesArray[i] === specialty) {
                    specialtiesArray.splice(i, 1);
                }
            }
        } else {
            const newItems = [...specialtiesArray, specialty];
            setSpecialtiesArray(newItems);
        }
        //
        const fetchPerams = handleArrayOfSpecialties();
        fetch(
            `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search-specialties/${fetchPerams}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("___--___", data);
                setLawyerList(data);
            });
    };

    function handleArrayOfSpecialties() {
        let string = specialtiesArray[0];
        let returnString = "";
        for (let i = 1; i < specialtiesArray.length; i++) {
            string = string + "," + specialtiesArray[i];
        }
        for (let i = 0; i < string.length; i++) {
            if (string[i] !== " ") {
                returnString = returnString + string[i];
            } else {
                returnString = returnString + "_";
            }
        }
        return returnString;
    }

    console.log(cities)



    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const [showResults, setShowResults] = useState(false);
    const fuse = new Fuse(cities, { keys: ['city'], threshold: 0.5 });

    const handleSearch = (event) => {
        setQuery(event.target.value);
        console.log(event.target.value)
        setActiveIndex(-1);
        setShowResults(true);
    };

    const handleKeyDown = (event) => {
        let value = event.target.value;
        console.log(value)
        switch (event.keyCode) {
            case 38: // Arrow up
                event.preventDefault();
                setShowResults(true);
                setActiveIndex((prevIndex) =>
                    prevIndex <= 0 ? results.length - 1 : prevIndex - 1
                );
                break;
            case 40: // Arrow down
                event.preventDefault();
                setShowResults(true);
                setActiveIndex((prevIndex) =>
                    prevIndex === results.length - 1 ? 0 : prevIndex + 1
                );
                break;
            case 13: // Enter
                if (activeIndex >= 0 && activeIndex < results.length) {
                    const { city, state } = results[activeIndex].item;
                    const query = `${city}, ${state}`;
                    setActiveIndex(-1);
                    setQuery(query);
                    console.log(city)
                    setCityName(city);
                    setShowResults(false);
                } else {
                    value = value.substring(0, 1).toUpperCase() + value.substring(1).replace(/\s+/g, "_");
                    setCityName(value.split(',')[0]);
                    setShowResults(false);
                    setActiveIndex(-1);
                }
                break;
            default:
                break;
        }
    };

    const results = fuse.search(query, { limit: 4 });
    results.sort((a, b) => b.score - a.score);

    const handleSearchResult = (data, index) => {
        setQuery(`${data.city}, ${data.state}`);
        setCityName(data.city);
        setActiveIndex(index);
        setShowResults(false);
    };

    console.log(cityName)
    return (
        <div className="bg-primary dark:bg-base-100">
            <div className="container mx-auto py-10">
                {/* <h1 className='text-black'>Total lawyer: {lawyerList.length}</h1> */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 xl:gap-20 justify-items-center z-50">
                    <div className="w-full col-span-1 lg:col-span-1 bg-primary dark:bg-base-100 z-50  rounded-xl">
                        <div className="border  dark:border-gray-700 rounded-xl p-5 flex flex-col gap-5 select-none ">
                            <div className="flex flex-col">
                                <span>Location</span>
                                <input
                                    className="input-box"
                                    type="text"
                                    value={query}
                                    onChange={handleSearch}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => setActiveIndex(-1)}
                                    onFocus={() => setShowResults(true)}
                                />
                                {showResults && results.length > 0 && (
                                    <ul className={`input-box p-0`}>
                                        {results.map((item, index) => (
                                            <li
                                                onClick={() => handleSearchResult(item.item, index)}
                                                className={` hover:bg-accent hover:text-white py-2 px-2 ${index === activeIndex ? 'bg-accent text-white' : ''}`}
                                                key={item.id}
                                            >
                                                {item.item.city}, {item.item.state}
                                            </li>
                                        ))}
                                    </ul>)}
                                {/* <input
                  onKeyDown={handleLocation}
                  type="text"
                  className="input-box dark:border-gray-700"
                  list="languages"
                  id="languageInput"
                  defaultValue={userData.state}
                /> */}
                                {/* <datalist id="languages" className="w-full">
                   
                    {
                        cities.map((item, index) => {
                              return <option key={item.id} value={item.city}>{item.city}</option>
                          })
                    }
                </datalist> */}
                            </div>
                            <span
                                onClick={() => isProblemActive(!isProblem)}
                                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border  dark:border-gray-700 p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
                            >
                                Problem Type{" "}
                                <FaChevronDown
                                    className={`transition-all duration-300 ${isProblem && "text-accent rotate-180"
                                        }`}
                                />{" "}
                            </span>
                            <ul
                                className={`transition-all duration-300 p-1 flex flex-col items-start  ${isProblem ? "flex" : "hidden "
                                    }`}
                            >
                                {specialtiesSuggestions.splice(0, 4).map((specialty, index) => {
                                    return (
                                        <label
                                            key={index}
                                            className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                                        >
                                            <input
                                                type="checkbox"
                                                className="accent-accent"
                                                onClick={() => handleCheck(specialty)}
                                            />{" "}
                                            {specialty}
                                        </label>
                                    );
                                })}
                                <label
                                    onClick={() => setProblemSeeMore(!problemSeeMore)}
                                    className={`${problemSeeMore ? "hidden" : "flex"
                                        } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                                >
                                    <FaChevronDown />
                                    Show more
                                </label>
                                {specialtiesSuggestions.map((specialty, index) => {
                                    return (
                                        <label
                                            key={index}
                                            className={`${problemSeeMore ? "flex" : "hidden"
                                                } gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="accent-accent"
                                                onClick={() => handleCheck(specialty)}
                                            />{" "}
                                            {specialty}
                                        </label>
                                    );
                                })}
                                <label
                                    onClick={() => setProblemSeeMore(!problemSeeMore)}
                                    className={`${problemSeeMore ? "flex" : "hidden"
                                        } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                                >
                                    <FaChevronUp />
                                    Show less
                                </label>
                            </ul>
                            <span
                                onClick={() => isLanguageActive(!isLanguage)}
                                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border  dark:border-gray-700 p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
                            >
                                Language{" "}
                                <FaChevronDown
                                    className={`transition-all duration-300 ${isLanguage && "text-accent rotate-180"
                                        }`}
                                />{" "}
                            </span>
                            <ul
                                className={`transition-all duration-300 p-1 flex flex-col items-start ${isLanguage ? "flex" : "hidden"
                                    }`}
                            >
                                {languageSuggestions.splice(0, 4).map((language, index) => {
                                    return (
                                        <label
                                            key={index}
                                            className="flex gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary"
                                        >
                                            <input type="checkbox" className="accent-accent" />{" "}
                                            {language}
                                        </label>
                                    );
                                })}
                                <label
                                    onClick={() => setLanguageSeeMore(!languageSeeMore)}
                                    className={`${languageSeeMore ? "hidden" : "flex"
                                        } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                                >
                                    <FaChevronDown />
                                    Show more
                                </label>
                                {languageSuggestions.map((language, index) => {
                                    return (
                                        <label
                                            key={index}
                                            className={`${languageSeeMore ? "flex" : "hidden"
                                                } gap-x-5 items-center justify-between p-1 text-base-100 dark:text-primary`}
                                        >
                                            <input type="checkbox" className="accent-accent" />{" "}
                                            {language}
                                        </label>
                                    );
                                })}
                                <label
                                    onClick={() => setLanguageSeeMore(!languageSeeMore)}
                                    className={`${languageSeeMore ? "flex" : "hidden"
                                        } gap-x-5 items-center p-1 text-base-100 dark:text-primary cursor-pointer hover:text-accent`}
                                >
                                    <FaChevronUp />
                                    Show less
                                </label>
                            </ul>

                            <span
                                onClick={() => isGenderActive(!isGender)}
                                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border  dark:border-gray-700 p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
                            >
                                Gender{" "}
                                <FaChevronDown
                                    className={`transition-all duration-300 ${isGender && "text-accent rotate-180"
                                        }`}
                                />{" "}
                            </span>
                            <ul
                                className={`transition-all duration-300 p-1 flex flex-col items-start ${isGender ? "flex" : "hidden"
                                    }`}
                            >
                                <label
                                    className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                                >
                                    <input type="checkbox" className="accent-accent" /> Male
                                </label>
                                <label
                                    className={`flex gap-5 items-center justify-between p-1 rounded-lg text-base-100 dark:text-primary font-semibold`}
                                >
                                    <input type="checkbox" className="accent-accent" /> Female
                                </label>
                            </ul>
                        </div>
                    </div>

                    {/* Lawyers profile */}

                    <div onClick={() => setShowResults(false)} className="w-full col-span-1 md:col-span-2 xl:col-span-3 px-5 md:px-0">
                        {/* <h1 className="text-center">No lawyers found in your city.</h1>  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center place-content-center">
                            <div className="col-span-3 w-full flex justify-end items-end gap-2">
                                <div className="input-box flex items-center gap-2  border-none shadow-none dark:bg-base-100">
                                    Available
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-sm toggle-success"
                                    />
                                </div>
                                <select className="input-box dark:border-gray-700 dark:bg-base-100">
                                    <option selected>Popularity</option>
                                    <option>Price(Low to High)</option>
                                    <option>Price(High to Low)</option>
                                    <option>User Rating</option>
                                    <option>Experience</option>
                                </select>
                            </div>
                            {lawyerList?.length === 0 ? (
                                <div className="col-span-3 flex flex-col h-full w-full ">
                                    <h1 className="text-center text-3xl">
                                        No lawyers found in your city.
                                    </h1>
                                </div>
                            ) : (
                                lawyerList?.map((lawyer, index) => (
                                    <div
                                        key={lawyer.index}
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TalkToLawyerList;
