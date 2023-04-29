import React, { useEffect } from 'react'
import { useContext } from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { FaRegComment, FaStar } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai'
import { StateContext } from '../../contexts/StateProvider/StateProvider';
import { HiOutlineStar } from 'react-icons/hi'
import { FaStarHalfAlt } from 'react-icons/fa'

function countAndPercentages(reviews) {
    let starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Count the number of reviews for each star rating
    reviews?.forEach(review => {
        starCounts[review.rating]++;
    });

    // Calculate the percentages for each star rating
    let totalReviews = reviews?.length;

    const fiveStarReviews = reviews.filter(({ rating }) => rating === 5)?.length;
    const fourStarReviews = reviews.filter(({ rating }) => rating === 4)?.length;
    const threeStarReviews = reviews.filter(({ rating }) => rating === 3)?.length;
    const twoStarReviews = reviews.filter(({ rating }) => rating === 2)?.length;
    const oneStarReviews = reviews.filter(({ rating }) => rating === 1)?.length;

    const fiveStarPercentage = (fiveStarReviews / totalReviews) * 100;
    const fourStarPercentage = (fourStarReviews / totalReviews) * 100;
    const threeStarPercentage = (threeStarReviews / totalReviews) * 100;
    const twoStarPercentage = (twoStarReviews / totalReviews) * 100;
    const oneStarPercentage = (oneStarReviews / totalReviews) * 100;

    const starPercentages = {
        5: fiveStarPercentage,
        4: fourStarPercentage,
        3: threeStarPercentage,
        2: twoStarPercentage,
        1: oneStarPercentage,
    };

    const objects = Object.entries(starPercentages).map(([rating, value]) => {
        return { rating: parseInt(rating), value: Math.floor(value) };
    });

    return objects;
}


const LawyerReview = ({ lawyer, serviceTaken }) => {

    const { user, allUsers } = useContext(AuthContext);
    const { userData } = useContext(StateContext);

    const [stars, setStars] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [writeReview, setWriteReview] = useState(false);
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [allReviews, setALLReviews] = useState([]);
    const [reviewLength, setReviewLength] = useState(0);
    const [userIds, setUserIds] = useState([]);
    const [userName, setUserName] = useState([]);



    const [limit, setLimit] = useState(3);


    const [totalReviews, setTotalReviews] = useState([]);

    const [averageRating, setAverageRating] = useState(0);
    const [formattedRating, setFormattedRating] = useState(0);

    useEffect(() => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/reviews/get/all/${lawyer.UID}`)
            .then(res => res.json())
            .then(data => {
                setReviewLength(data.reviews?.length);
                setTotalReviews(data.reviews);
                console.log(data);

                // Calculate the average rating
                if (data.reviews.length > 0) {
                    let rating = data.reviews.reduce((sum, review) => sum + review.rating, 0) / data.reviews.length;
                    setAverageRating(rating);
                    console.log(rating)
                    // Format the rating to 2 decimal places
                    setFormattedRating(rating.toFixed(2));
                } else {
                    setAverageRating(rating)
                    setFormattedRating(rating);
                }
            })
            .catch(err => console.log(err));
    }, [lawyer, user, rating])

    console.log(totalReviews)
    console.log(averageRating)
    console.log(formattedRating)



    // Getting reviews of lawyer from server
    useEffect(() => {
        if (reviewByRating === 0) {
            fetch(`https://ninja-lawyer-server.vercel.app/api/reviews/get?id=${lawyer.UID}&page=1&limit=${limit}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setALLReviews(data);
                    console.log(data.map(review => review.UID));
                    setUserIds(data.map(review => review.UID));
                })
                .catch(err => console.log(err));
        }
    }, [user, lawyer.UID, limit, reviewLength]);


    const [reviewByRating, SetReviewByRating] = useState(0)

    // if you select on a specific rating it will fetch this api
    useEffect(() => {
        if (reviewByRating > 0) {
            fetch(`https://ninja-lawyer-server.vercel.app/api/reviews/search?id=${lawyer.UID}&page=1&limit=${limit}&ratings=${reviewByRating}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setALLReviews(data);
                    console.log(data.map(review => review.UID));
                    setUserIds(data.map(review => review.UID));
                })
                .catch(err => console.log(err));
        }
    }, [reviewByRating, lawyer, limit]);


    console.log(allReviews)

    const ratingSummary = totalReviews?.length > 0 && countAndPercentages(totalReviews);



    useEffect(() => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/reviews/users/get?ids=${userIds}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserName(data.map(reviewer => ({
                    uid: reviewer.UID,
                    name: reviewer.name
                })));
                allReviews?.map(review => {
                    const user = data.find(user => user.UID === review.UID);
                    review.name = user.name;
                })
            })
    }, [user, allReviews, reviewLength, userIds])


    console.log(userIds)
    console.log(userName)

    // Rating stars function 
    const handleRating = newRating => {
        if (newRating === rating) {
            // if the user clicks the same star, clear the rating
            setRating(0);
        } else {
            setRating(newRating);
        }
    };


    // Post review to database function
    const handleReview = reviewData => {
        setWriteReview(!writeReview);

        const review = {
            UID: user.uid,
            rating: rating,
            review: reviewData.comment,
        };
        console.log(review);

        fetch(`https://ninja-lawyer-server.vercel.app/api/reviews/add/${lawyer.UID}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(review),
        })
            .then(res => res.json())
            .then(data => {
                console.log("review:", data);
                toast.success("Review Posted");
                console.log(userData.name);
                handleRating(0);

                let newreview = {
                    UID: user.uid,
                    name: userData.name,
                    rating: rating,
                    review: reviewData.comment,
                    timestamp: new Date(),
                };
                console.log(reviewLength)

                if (reviewLength > 0) {
                    setALLReviews([newreview, ...allReviews]);
                    setTotalReviews([...totalReviews, newreview]);
                } else {
                    setALLReviews([newreview]);
                    setTotalReviews([newreview]);
                    setReviewLength(reviewLength + 1);
                }


                let newRating;
                if (totalReviews.length === 0) {
                    newRating = rating;
                } else {
                    newRating = (averageRating * totalReviews.length + rating) / (totalReviews.length + 1);
                }
                // Format the rating to 2 decimal places
                let newFormattedRating = newRating.toFixed(2);
                setAverageRating(newRating);
                setFormattedRating(newFormattedRating);

                console.log(averageRating)
                console.log(formattedRating)
            });
    };


    // convert timestamp to date
    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.getFullYear();

        return `${day} ${month}, ${year}`;
    }





    useEffect(() => {
        const fullStars = Math.floor(formattedRating);
        const hasHalfStar = formattedRating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


        const starsArr = [];

        for (let i = 0; i < fullStars; i++) {
            starsArr.push(<FaStar key={i} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            starsArr.push(
                <FaStarHalfAlt key={fullStars} className="text-yellow-400" />
            );
        }

        for (let i = 0; i < emptyStars; i++) {
            starsArr.push(
                <HiOutlineStar
                    key={fullStars + (hasHalfStar ? 1 : 0) + i}
                    className="text-gray-400"
                />
            );
        }

        setStars(starsArr);

    }, [allReviews]);



    return (
        <div className="mb-5 text-neutral dark:text-base-100">
            <p className="mb-5 text-center text-3xl font-bold lg:text-left">
                Reviews
            </p>
            <div className="flex grid-cols-4 flex-col gap-5 p-5 lg:grid lg:gap-5 lg:p-0">
                <div className="col-span-1 lg:w-full ">
                    <div className="rounded-lg border">
                        <div className="grid grid-cols-3 p-5">
                            <div className=" col-span-1 flex flex-col items-start">
                                <p className="text-5xl font-bold">{formattedRating}</p>
                                <span className="flex text-warning">
                                    <span className="flex items-center text-xl">{stars}</span>
                                </span>
                                <p>{reviewLength > 0 ? reviewLength + " reviews" : 'No review yet'} </p>
                            </div>
                            <div className="col-span-2 flex flex-col items-start">
                                {ratingSummary &&
                                    ratingSummary.reverse().map((review, index) => (
                                        <div onClick={() => SetReviewByRating(review.rating)} key={review.rating} className="grid grid-cols-6 justify-items-end content-center place-items-center gap-2 h-full  w-full">
                                            <span className='col-span-1'>{review.rating}</span>
                                            <input type="range" name="rating" min="1" max="100" value={review.value} class="col-span-4 w-full h-2 bg-warning accent-warning rounded-full appearance-none " />
                                            <span className='col-span-1'>{review.value}%</span>
                                        </div>
                                    ))

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    {/* review start selection */}
                    {/* {serviceTaken &&
                        <div className="flex flex-col justify-between gap-5 lg:flex-row">

                            <span
                                onClick={() => setWriteReview(!writeReview)}
                                className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border p-2 hover:border-accent hover:text-accent "
                            >
                                <AiOutlineEdit /> Write a review
                            </span>
                        </div>
                    } */}

                    <div className="reviews py-5">
                        {/* write review */}

                        {writeReview && (
                            <div className=" my-5">
                                <div className="mb-3">
                                    <div className="flex items-center gap-5">
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
                                    <p className="my-4 text-xs font-normal text-error">
                                        Rating is required
                                    </p>
                                )}
                                <form onSubmit={handleSubmit(handleReview)}>
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
                                        <div
                                            onClick={() => setWriteReview(!writeReview)}
                                            className="primary-outline-btn"
                                        >
                                            Cancel
                                        </div>
                                        <button
                                            type="submit"
                                            className="primary-btn"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                        }
                        <div className="flex flex-col gap-5">
                            {allReviews?.length > 0 ?
                                allReviews?.map(r => (
                                    <div className="review bg-white flex flex-col gap-3 rounded-lg border p-5">
                                        <div className="flex justify-between">
                                            <span className="flex items-center gap-2">
                                                <img
                                                    className="w-10 rounded-full"
                                                    src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                                                    alt=""
                                                />
                                                <span>{userName.map(item => item.uid === r.UID && item.name)}</span>
                                            </span>
                                            <div className='flex flex-col items-end gap-2'>
                                                <p className='flex items-center border rounded-lg font-bold py-2 px-3 gap-2'>{r.rating}<FaStar className='text-xl text-warning' /></p>
                                                <span>{formatDate(r.timestamp)}</span>
                                            </div>

                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center text-warning">
                                                {/* {r.rating === 1 ? (
                                                    <FaStar />
                                                ) : r.rating === 2 ? (
                                                    <>
                                                        <FaStar />
                                                        <FaStar />
                                                    </>
                                                ) : r.rating === 3 ? (
                                                    <>
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                    </>
                                                ) : r.rating === 4 ? (
                                                    <>
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                    </>
                                                ) : (
                                                    r.rating === 5 && (
                                                        <>
                                                            <FaStar />
                                                            <FaStar />
                                                            <FaStar />
                                                            <FaStar />
                                                            <FaStar />
                                                        </>
                                                    )
                                                )} */}
                                            </span>
                                            <span>{r.review}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
                                                <BiLike />
                                            </span>
                                            <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
                                                <BiDislike />
                                            </span>
                                        </div>


                                    </div>
                                ))
                                :
                                (
                                    <div className='flex items-center justify-center'>
                                        <h1 className='text-3xl font-bold'>No {reviewByRating > 0 && reviewByRating + " star"}  reviews yet</h1>
                                    </div>
                                )

                            }

                            <div className={`${reviewLength > 3 ? "flex" : "hidden"} justify-center`}>
                                <button onClick={() => setLimit(limit + 3)} className='primary-btn'>Load More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LawyerReview