import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import RazorPay from '../../../components/Dashboard/CaseDetailsPage/RazorPay';

const ModalReview = ({ orderInfo, lawyerUID, setModalOpen, modalOpen, paymentModal, setPaymentModal, reviewModalOpen, setReviewModalOpen }) => {

    const { user } = useContext(AuthContext)

    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleRating = newRating => {
        if (newRating === rating) {
            // if the user clicks the same star, clear the rating
            setRating(0);
        } else {
            setRating(newRating);
        }
    };


    const handleReview = reviewData => {


        const review = {
            UID: user.uid,
            rating: rating,
            review: reviewData.comment,
            orderId: orderInfo._id,
        };
        console.log(review);
        setModalOpen(false)

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/add/${lawyerUID}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(review),
        })
            .then(res => res.json())
            .then(data => {
                console.log("review:", data);
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/status/change?lawyerid=${lawyerUID}&orderid=${orderInfo._id}&offerstatus=completed&payment=true`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({}),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // toast.success("Order Status Changed"); 
                        toast.success("Review Posted");
                        // setReviewModalOpen(true)
                        window.location.reload()

                    });
            });
    };

    console.log(modalOpen)
    console.log(lawyerUID)


    const handleOrderStatus = (status) => {
        console.log(status)
        setPaymentModal(false)
        setModalOpen(false)

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/status/change?lawyerid=${lawyerUID}&orderid=${orderInfo._id}&offerstatus=accepted&payment=true`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("Payment successful");
            });
    }



    if (modalOpen === true) {
        return (
            <div className='fixed z-10 inset-0 overflow-auto'>
                <div className='flex items-center justify-center min-h-screen'>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" aria-hidden="true"></div>
                    <div className='bg-primary dark:bg-base-100 rounded-lg overflow-hidden shadow transform transition-all sm:max-w-2xl sm:w-full'>
                        {/* {paymentModal === true && 
                                    <div className='flex justify-center items-center'>
                                        <button onClick={()=>{
                                            setPaymentModal(false)
                                            setModalOpen(false)
                                            handleOrderStatus("accepted")
                                            }} className="primary-btn">
                                            Pay
                                        </button>
                                        <RazorPay setPaymentModal={setPaymentModal} setModalOpen={setModalOpen}  handleOrderStatus={handleOrderStatus}/>
                                    </div>
                                }     */}
                        {reviewModalOpen && paymentModal === false &&
                            <div className=" my-5">
                                <div className="mb-3 pl-5">
                                    <div className="flex items-center gap-5 ">

                                        <div className="flex gap-2">
                                            {[...Array(5)].map((_, i) => {
                                                const ratingValue = i + 1;
                                                let star;
                                                if (ratingValue <= rating) {
                                                    star = (
                                                        <FaStar
                                                            size={30}
                                                            color="#FFD700"
                                                            className="cursor-pointer"
                                                        />
                                                    );
                                                } else {
                                                    star = (
                                                        <FaStar
                                                            size={30}
                                                            color="gray"
                                                            className="cursor-pointer"
                                                        />
                                                    );
                                                }
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleRating(ratingValue)}
                                                        className="focus:outline-none"
                                                    >
                                                        {star}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <span className="text-xl font-bold">
                                            {rating === 1
                                                ? "Very bad"
                                                : rating === 2
                                                    ? "Bad"
                                                    : rating === 3
                                                        ? "Average"
                                                        : rating === 4
                                                            ? "Good"
                                                            : rating === 5 && "Superb"}
                                        </span>
                                    </div>
                                </div>
                                {rating === 0 && (
                                    <p className="my-4 text-xs font-normal text-error pl-5">
                                        Rating is required
                                    </p>
                                )}
                                <form onSubmit={handleSubmit(handleReview)} className='p-5'>
                                    <p>Review detail</p>
                                    <input
                                        className="hidden"
                                        type="number"
                                        value={rating}
                                        name="rating"
                                        {...register("rating", {
                                            required: "Rating is required",
                                            min: 1,
                                            max: 5,
                                        })}
                                    />
                                    {errors.rating && (
                                        <p className="decoration-red-5 text-blue-100 underline">
                                            {errors.rating.message}
                                        </p>
                                    )}
                                    <textarea
                                        name="comment"
                                        className="h-32 w-full bg-primary rounded-lg border p-3 focus:border-primary"
                                        {...register("comment", { required: "Review is required" })}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setModalOpen(false)}
                                            className="primary-outline-btn"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="primary-btn"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </div>}
                    </div>

                </div>
            </div>
        )
    } else {
        return null
    }
}

export default ModalReview