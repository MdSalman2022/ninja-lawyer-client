import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../assets/firebase.config";

function ModalBox({
    offer,
    handleComplete,
    CaseComplete,
    client,
    client_uid,
    paymentModal,
    setPaymentModal,
    reviewModalOpen,
}) {
    const { user } = useContext(AuthContext);
    const { userData } = useContext(StateContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileURL, setFileURL] = useState("");
    const [uploadDone, setUploadDone] = useState(false);

    const handleFileInputChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    var documentName = "";
    const [docName, setDocName] = useState("");

    const fileUpload = async () => {
        const storage = getStorage(app);
        const storageRef = ref(storage, selectedFile.name);
        await uploadBytes(storageRef, selectedFile).then((snapshot) => {
            console.log("Uploaded a blob or file!", snapshot);
            setDocName(selectedFile.name);
            toast.success("Image Uploaded Successfully");
        });
        await getDownloadURL(storageRef)
            .then((url) => {
                setFileURL(url);
                console.log("url:", url);
                console.log("name", documentName);
                setSelectedFile(false);
                setUploadDone(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    const [offerStatus, setOfferStatus] = useState(offer.status);

    const onSubmit = (data) => {
        console.log(data);
        // setPaymentModal(true)
        setIsOpen(false);

        const {
            UID,
            lawyer_name,
            budget,
            case_name,
            description,
            duration,
            specialty,
            client_name,
        } = data;

        const order_info = {
            UID: client_uid,
            lawyer_name,
            client_name: client,
            budget,
            case_name,
            description,
            duration,
            specialty,
            offerId: offer._id,
            document: fileURL,
            document_name: docName,
        };

        console.log(order_info);
        console.log(offer._id);
        console.log(user.uid);
        try {
            fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/orders/add/${userData.UID}`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(order_info),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setOfferStatus("pending");
                    if (data.acknowledged === true) {
                        fetch(
                            `${process.env.REACT_APP_SERVER_URL}/api/offers/status/change?offerid=${offer._id}&lawyerid=${user.uid}&offerstatus=pending`,
                            {
                                method: "PUT",
                                headers: {
                                    "content-type": "application/json",
                                },
                                body: JSON.stringify({}),
                            }
                        )
                            .then((res) => res.json())
                            .then((offer) => {
                                console.log(offer);
                                toast.success(`${order_info.case_name} offer sent`);
                                console.log("lawyer data: ", data);
                            });
                    } else {
                        toast.error("Something went wrong");
                    }
                });
        } catch (error) {
            console.log(errors);
        }
    };

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

    console.log(offerStatus);
    console.log(offerStatus);
    return (
        <>
            {user.displayName === "lawyer" && (
                <>
                    {offerStatus === "offer" && (
                        <button
                            className="font-bold primary-outline-btn"
                            onClick={() => setIsOpen(true)}
                        >
                            Send Offer
                        </button>
                    )}
                    {offerStatus === "pending" && (
                        <button className="font-bold primary-outline-btn border-gray-500 text-gray-500 hover:bg-transparent hover:text-gray-500">
                            Offer Sent
                        </button>
                    )}
                    {offerStatus === "accepted" && (
                        <button className="font-bold text-black">Ongoing</button>
                    )}
                    {offerStatus === "completed" && (
                        <button className="font-bold text-black">Complete</button>
                    )}
                    {offerStatus === "rejected" && (
                        <button className="font-bold text-black">Rejected</button>
                    )}
                </>
            )}
            {user.displayName !== "lawyer" && (
                <>
                    {offerStatus === "pending" && (
                        <button className="text-black">Offer recieved</button>
                    )}
                    {offerStatus === "offer" && (
                        <button className="text-black">No Offer</button>
                    )}
                    <div className="relative">
                        {offerStatus === "accepted" && (
                            <button
                                onClick={() => setCompleteOpen(!completeOpen)}
                                className={`font-bold  text-black ${CaseComplete === false
                                    ? "flex items-center justify-center"
                                    : "hidden"
                                    } gap-2`}
                            >
                                Ongoing
                            </button>
                        )}
                        {offerStatus === "completed" && (
                            <button className={`font-bold  text-black`}>Completed</button>
                        )}
                        {/* {offerStatus === 'accepted' && <button className={`${CaseComplete === true ? 'flex' : 'hidden'} primary-outline-btn border-success hover:bg-green-600 hover:border-green-600 text-success `}>Completed</button>}  */}
                        {offerStatus === "rejected" && (
                            <button className="font-bold text-black">Rejected</button>
                        )}
                    </div>
                </>
            )}

            {isOpen ? (
                <div className="fixed z-10 inset-0 overflow-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>

                        <div className="bg-primary dark:bg-base-100 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
                            <div className="bg-primary dark:bg-base-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* <p className="text-3xl pb-5 text-start">Offer from lawyer1</p> */}
                                <div className="sm:max-w-2xl sm:w-full">
                                    {/* for client to accept or reject offer from lawyer */}
                                    {user.displayName !== "lawyer" && paymentModal === false && (
                                        <form
                                            className="grid grid-cols-2 gap-5 "
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <div className=" col-span-2 flex flex-col flex-wrap gap-5">
                                                <div className="flex flex-col">
                                                    <span className="text-3xl">
                                                        {offer.case_name} Case
                                                    </span>
                                                    <span className="text-accent">{offer.name}</span>
                                                </div>
                                                {/* <ul>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                    <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, aliquid? Magni doloribus </li>
                                                </ul> */}
                                                <div className="w-fit">
                                                    <div className="whitespace-pre-wrap">
                                                        {splitTextIntoLines(offer.description, 10)}
                                                    </div>
                                                </div>
                                                <p className="text-2xl text-accent font-bold">
                                                    ₹{offer.amount}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="primary-outline-btn"
                                            >
                                                Reject Offer
                                            </button>
                                            <button type="submit" className="primary-btn">
                                                Accept Offer
                                            </button>
                                        </form>
                                    )}

                                    {user.displayName !== "lawyer" && paymentModal === true && (
                                        <div className="flex justify-center items-center">
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="primary-btn"
                                            >
                                                Pay
                                            </button>
                                        </div>
                                    )}

                                    {/* for lawyer to send offer to client */}
                                    {user.displayName === "lawyer" && (
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
                                                    defaultValue={client}
                                                    {...register("client_name", {
                                                        required: false,
                                                        maxLength: 400,
                                                    })}
                                                    readOnly
                                                />
                                                {errors.name && (
                                                    <p className="text-accent underline decoration-red-5">
                                                        {errors.name.client_name}
                                                    </p>
                                                )}
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
                                                    {...register("lawyer_name", {
                                                        required: true,
                                                        maxLength: 400,
                                                    })}
                                                    readOnly
                                                />
                                                {errors.name && (
                                                    <p className="text-accent underline decoration-red-5">
                                                        {errors.name.lawyer_name}
                                                    </p>
                                                )}
                                            </label>
                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Case Specialties
                                                </span>
                                                <select
                                                    className="input-box w-full"
                                                    {...register("Specialty")}
                                                >
                                                    {specialtiesList.map((specialty, index) => (
                                                        <option key={index} value={specialty}>
                                                            {specialty}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>

                                            <label className="col-span-1 flex flex-col items-start justify-start ">
                                                <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                    Case name
                                                </span>
                                                <input
                                                    type="text"
                                                    className="input-box w-full"
                                                    name="case_name"
                                                    placeholder="Divorce case"
                                                    {...register("case_name", {
                                                        required: true,
                                                        maxLength: 400,
                                                    })}
                                                />
                                                {errors.name && (
                                                    <p className="text-accent underline decoration-red-5">
                                                        {errors.name.case_name}
                                                    </p>
                                                )}
                                            </label>
                                            <div className="col-span-2 flex items-center gap-5">
                                                <div className="flex flex-col items-start justify-start ">
                                                    <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                        <p>Upload Document</p>
                                                    </span>
                                                    <div className="input-box h-10 relative group">
                                                        <MdOutlineUploadFile className="group-hover:text-accent absolute left-[45%] text-2xl" />
                                                        {/* setUploadDone */}
                                                        <input
                                                            type="file"
                                                            className="h-full w-full opacity-0"
                                                            disabled={uploadDone}
                                                            onChange={handleFileInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        {selectedFile ? <p>{selectedFile.name}.</p> : <></>}
                                                        {selectedFile ? (
                                                            <p>Click below button to finalize upload.</p>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {selectedFile ? (
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={fileUpload}
                                                            >
                                                                Upload
                                                            </button>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                                <label className="flex flex-col items-start justify-start ">
                                                    <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                        Case duration
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="input-box w-full"
                                                        name="duration"
                                                        placeholder="No. of days "
                                                        {...register("duration", {
                                                            required: true,
                                                            maxLength: 400,
                                                        })}
                                                    />
                                                    {errors.name && (
                                                        <p className="text-accent underline decoration-red-5">
                                                            {errors.name.duration}
                                                        </p>
                                                    )}
                                                </label>
                                                <label className="flex flex-col items-start justify-start ">
                                                    <span className="text-start font-medium text-base-100 dark:text-primary w-32">
                                                        Offer Price
                                                    </span>
                                                    <div className="relative flex w-full">
                                                        <span className="absolute left-2 top-3">₹</span>
                                                        <input
                                                            type="number"
                                                            className="input-box w-full pl-5"
                                                            name="budget"
                                                            placeholder="15000"
                                                            {...register("budget", {
                                                                required: true,
                                                                maxLength: 80,
                                                            })}
                                                        />
                                                        {errors.name && (
                                                            <p className="text-accent underline decoration-red-5">
                                                                {errors.name.budget}
                                                            </p>
                                                        )}
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
                                                    name="description"
                                                    placeholder=" I am offering my legal services to assist individuals"
                                                    {...register("description", {
                                                        required: true,
                                                        maxLength: 10000,
                                                    })}
                                                />
                                                {errors.name && (
                                                    <p className="text-accent underline decoration-red-5">
                                                        {errors.name.description}
                                                    </p>
                                                )}
                                            </label>

                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="primary-outline-btn"
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" className="primary-btn">
                                                Send Offer
                                            </button>
                                        </form>
                                    )}
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
