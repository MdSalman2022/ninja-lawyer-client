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
import LawyerCard from "./LawyerCard";
import { Player } from "@lottiefiles/react-lottie-player";


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


    // api call for states 
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

    // api call to create new array of cities and states 
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
                    // console.log(citiesList)
                    let newCities = citiesList.flat().map((item, index) => ({
                        id: index + 1,
                        city: item.name,
                        state: item.stateName,
                    }))
                    // console.log(newCities)
                    setCities(newCities);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        });
    }, [states]);


    // delete lawyer 
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


    // api call for lawyers

    const allLawyers = () => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/users/get-lawyers/all`)
            .then((res) => res.json())
            .then((data) => setLawyerList(data));
    }

    // useEffect(() => {
    //     fetch(`https://ninja-lawyer-server.vercel.app/api/users/get-lawyers/all`)
    //         .then((res) => res.json())
    //         .then((data) => setLawyerList(data));
    // }, []);

    const [searchLawyerByLocation, setSearchLawyerByLocation] = useState([]);

    const [filteredLawyers, setFilteredLawyers] = useState([]);

    const allLawyersByCity = () => {
        if (cityName) {
            fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/search?city=${cityName}`)
                .then((res) => res.json())
                .then((data) => setSearchLawyerByLocation(data))
        }
    };

    const fetchPerams = handleArrayOfSpecialties();
    console.log("fetch params", fetchPerams)
    useEffect(() => {
        cityName &&
            fetch(
                `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search?city=${cityName}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setSearchLawyerByLocation(data);
                    console.log(data);
                });
    }, [cityName]);


    //   Get cehcbox of specialties

    const handleCheck = async (specialty) => {
        if (specialtiesArray.includes(specialty)) {
            setSpecialtiesArray((prevSpecialtiesArray) =>
                prevSpecialtiesArray.filter((s) => s !== specialty)
            );
        } else {
            setSpecialtiesArray((prevSpecialtiesArray) => [
                ...prevSpecialtiesArray,
                specialty,
            ]);
        }
    };


    useEffect(() => {
        console.log(fetchPerams)
        if (fetchPerams === "nothing") {
            allLawyers();
            allLawyersByCity();
        } else {
            fetch(
                `https://ninja-lawyer-server.vercel.app/api/users/lawyer/search-specialties/${fetchPerams}`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log("fetchparams", data);
                    setLawyerList(data);
                    allLawyersByCity();
                    // const filteredLawyers =
                    setFilteredLawyers(searchLawyerByLocation.filter(lawyer => {
                        return data.some(d => d._id === lawyer._id);
                    }))
                    console.log("filtered lawyers", filteredLawyers)
                    setSearchLawyerByLocation(filteredLawyers);
                });
        }
    }, [specialtiesArray]);



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

    // console.log(cities)

    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const [showResults, setShowResults] = useState(false);
    const fuse = new Fuse(cities, { keys: ['city'], threshold: 0.5 });

    const handleSearch = (event) => {
        if (event.target.value === "") {
            setShowResults(false);
            setQuery("");
            setCityName("");

        } else {
            setQuery(event.target.value);
            console.log(event.target.value)
            setActiveIndex(-1);
            setShowResults(true);
            setLawyerList(lawyerList.filter(lawyer => lawyer.city !== cityName));
        }

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
                    let city = value.split(',')[0].replace('_', ' ');
                    setLawyerList(lawyerList.filter(lawyer => lawyer.city !== city.replace('_', ' ')));
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
        setLawyerList(lawyerList.filter(lawyer => lawyer.city !== data.city));
        setShowResults(false);

    };

    console.log(cityName)




    const sortedList = lawyerList.sort((a, b) => {
        if (a.city === cityName && b.city !== cityName) {
            return -1;
        } else if (a.city !== cityName && b.city === cityName) {
            return 1;
        } else if (a.city === cityName && b.city === cityName) {
            return 0;
        } else if (a.city === userData.city && b.city !== userData.city) {
            return -1;
        } else if (a.city !== userData.city && b.city === userData.city) {
            return 1;
        } else if (a.city === userData.city && b.city === userData.city) {
            return 0;
        } else if (a.state === userData.state && b.state !== userData.state) {
            return -1;
        } else if (a.state !== userData.state && b.state === userData.state) {
            return 1;
        } else {
            return 0;
        }
    });



    return (
        <div className="bg-primary dark:bg-base-100">
            <div className="container mx-auto py-10">
                {/* <h1 className='text-black'>Total lawyer: {lawyerList.length}</h1> */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 xl:gap-20 justify-items-center z-50">
                    <div className="w-full col-span-1 lg:col-span-1 bg-primary dark:bg-base-100 z-50  rounded-xl">
                        <div className="border  dark:border-gray-700 rounded-xl p-5 flex flex-col gap-5 select-none ">
                            <div className="flex flex-col ">
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
                                <div className="relative">
                                    {showResults && results.length > 0 && (
                                        <ul className={`input-box p-0 absolute w-full z-50 shadow-lg`}>
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
                                </div>
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

                            {/* <span
                                onClick={() => isGenderActive(!isGender)}
                                className="flex items-center justify-between bg-secondary dark:bg-transparent dark:border  dark:border-gray-700 p-3 rounded-lg text-base-100 dark:text-primary font-semibold"
                            >
                                Gender{" "}
                                <FaChevronDown
                                    className={`transition-all duration-300 ${isGender && "text-accent rotate-180"
                                        }`}
                                />{" "}
                            </span> */}
                            {/* <ul
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
                            </ul> */}
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
                            <div className="col-span-3 flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center place-content-center">
                                    {
                                        cityName && fetchPerams === "nothing" && (
                                            searchLawyerByLocation?.length === 0 ? (
                                                <div className="col-span-3 flex flex-col gap-10">
                                                    <h1 className="text-3xl">No lawyers found in {cityName}</h1>
                                                    <Player className='w-[200px]' autoplay loop src="https://assets6.lottiefiles.com/private_files/lf30_cgfdhxgx.json"></Player>
                                                </div>
                                            ) : (
                                                searchLawyerByLocation?.map((lawyer, index) => (
                                                    <LawyerCard lawyer={lawyer} key={index} />
                                                ))
                                            )
                                        )
                                    }

                                </div>
                                {cityName && fetchPerams === "nothing" &&
                                    <h1 className="text-3xl text-accent font-semibold">Lawyers from other cities: </h1>
                                }
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center place-content-center">
                                    {sortedList?.length > 0 && (
                                        sortedList?.map((lawyer, index) => (
                                            <LawyerCard lawyer={lawyer} key={index} cityName={cityName} />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TalkToLawyerList;
