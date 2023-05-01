import React, { useContext, useEffect, useState } from 'react'
import { FaChevronUp, FaStar } from 'react-icons/fa'
import { GrAttachment } from 'react-icons/gr'
import { Link, useLoaderData } from 'react-router-dom';
import ModalReview from './ModalReview';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import RazorPay from '../../../components/Dashboard/CaseDetailsPage/RazorPay';
import LawyerReview from '../../TalkToLawyer/LawyerReview';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { BiDislike, BiLike } from 'react-icons/bi';
import LawyerReviewReply from '../../../components/Dashboard/CaseDetailsPage/LawyerReviewReply';

function CaseDetailsPage() {

    const { user } = useContext(AuthContext)
    const { userData } = useContext(StateContext)
    const data = useLoaderData()

    console.log("order info")
    console.log(data)

    const [modalOpen, setModalOpen] = useState(false)

    const [paymentModal, setPaymentModal] = useState(false);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const [reviewInfo, setReviewInfo] = useState({});


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/get/all/${data.lawyerUID}`)
            .then(res => res.json())
            .then(review => {
                setReviewInfo(review.reviews.find(item => item?.orderId === data?._id));
            });
    }, [])

    console.log("this is the review info" + reviewInfo)

    const handleOrderStatus = (status) => {
        console.log(status)
        setPaymentModal(false)
        setModalOpen(false)

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/status/change?lawyerid=${data.lawyerUID}&orderid=${data._id}&offerstatus=${status}&payment=${status === "accepted" ? true : false}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                if (status === "accepted") {
                    toast.success("Offer Accepted");
                    data.status = 'accepted'
                    window.location.reload()
                }
                else {
                    toast.error("Offer Rejected");
                    data.status = 'rejected'
                }
            });
    }


    const [userName, setUserName] = useState([]);
    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${user.displayName === "lawyer" ? "get" : "get-lawyer"}/${user.displayName === 'lawyer' ? data.UID : data.lawyerUID}`

        console.log(url)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserName(data);
            });
    }, [])

    console.log("reviewer info" + userName)



    return (
        <div className='py-5 text-black space-y-5 '>
            <div className="flex items-center gap-5">
                <div className="flex">
                    <ModalReview orderInfo={data} lawyerUID={data.lawyerUID} setModalOpen={setModalOpen} modalOpen={modalOpen} setPaymentModal={setPaymentModal} paymentModal={paymentModal} reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
                    {data.status === "pending" &&
                        <RazorPay orderInfo={data} handleOrderStatus={handleOrderStatus} orderStatus={data.status} />}
                    {/* {data.status === 'pending' && user.displayName !== 'lawyer' && 
                <Link to="/dashboard/case/payment">
                <button 
                // onClick={()=>{
                //     setModalOpen(true)
                //     setPaymentModal(true)
                //     data.status = 'accepted'
                //     }} 
                className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-r-none border-r-none">Accept</button>
                </Link>}
                {
                data.status === 'pending' && user.displayName !== 'lawyer' && 
                <button
                onClick={()=>{
                    data.status = 'rejected'
                    handleOrderStatus("rejected")
                }}
                className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-l-none border-l-none ">Reject</button>
            } */}
                    {data.status === 'accepted' && user.displayName !== 'lawyer' &&
                        <button onClick={() => {
                            setModalOpen(true)
                            setReviewModalOpen(true)
                        }} className="primary-outline-btn col-span-5 flex justify-start w-fit">Completed</button>}
                    {data.status === 'completed' && <p>Your Order is completed</p>}
                </div>
            </div>
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3 flex flex-col gap-3 drop-shadow-lg p-5 bg-white  ">
                    <div>
                        <h1 className="text-3xl font-semibold">{data.case_name}</h1>
                        <p className='font-semibold text-accent'>{data.lawyer_name}</p>
                    </div>

                    <p className="font-bold">Offer description</p>

                    <div className='flex flex-wrap'>
                        <p className='break-all'>{data.description}</p>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-5 justify-start">
                    <div className="bg-white drop-shadow-xl p-5">
                        <div className="flex justify-between"><p className="text-lg font-bold">Case Details</p> <span><FaChevronUp /></span></div>
                        <div className="grid grid-cols-2">
                            <p>Order by</p>
                            <p className='text-accent font-semibold'>{data.client_name}</p>
                            <p>Duration</p>
                            <p className='font-semibold'>{data.duration} days</p>
                            <p>Offer price</p>
                            <p className='font-semibold'>₹{data.budget}</p>
                            <p>Order number</p>
                            <p className='font-semibold flex items-center'># {data._id}</p>
                        </div>
                    </div>
                    <div className="bg-white drop-shadow-xl p-5">
                        <div className="flex justify-between"><p className="text-lg font-bold">Attachments</p> <span><FaChevronUp /></span></div>
                        <p>1. documents.pdf</p>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-5 ">
                    <p><span className="text-accent font-semibold">{data.client_name}</span> placed the order</p>
                    <div className='flex items-center gap-3'><p>The case started</p> <p className='text-xs'>(April 17, 7:00PM)</p></div>
                    {/* <p className='flex items-center primary-outline-btn w-fit gap-5 cursor-pointer'>Add documents <span><GrAttachment className=''/></span></p> */}

                    {data.status !== 'completed' && <div className='flex flex-col gap-3'>
                        <textarea className='input-box' name="" id="" cols="30" rows="10"></textarea>
                        <div className="flex justify-end gap-5">
                            <button className='flex items-center primary-outline-btn w-fit gap-5 cursor-pointer'>Add documents <span><GrAttachment className='' /></span></button>
                            <button className="primary-btn">Send</button>
                        </div>
                    </div>}
                    {
                        data.status === 'completed' &&
                        <div>
                            <LawyerReviewReply userName={userName} reviewInfo={reviewInfo} orderInfo={data} />
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}

export default CaseDetailsPage