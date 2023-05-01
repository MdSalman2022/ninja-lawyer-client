import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiDislike, BiLike } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const LawyerReviewReply = ({ userName, reviewInfo, orderInfo }) => {

  const { user } = useContext(AuthContext)
  const { userData } = useContext(StateContext)



  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  //Rating function for giving rating to lawyer (unused)
  const handleRating = newRating => {
    if (newRating === rating) {
      // if the user clicks the same star, clear the rating
      setRating(0);
    } else {
      setRating(newRating);
    }
  };

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();

    return `${day} ${month}, ${year}`;
  }


  const handleReview = reviewData => {

    const review = {
      reply: reviewData.comment,
      lawyerID: user.uid,
      _id: reviewInfo._id,
    };
    console.log(review);

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/reply/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success("Reply Added Successfully")
        window.location.reload()
      })
      .catch(err => console.log(err));


  };

  console.log(reviewInfo)

  if (reviewInfo) {
    return (
      <div className="review bg-white flex flex-col gap-3 rounded-lg border">
        <p className='rounded-t-lg h-10 bg-gray-100 flex items-center px-3 font-bold uppercase text-gray-600'><span className='text-accent'>{orderInfo?.client_name?.split(" ")[0]}</span>'s Review </p>
        <div>
          <div className="flex justify-between px-5">
            <span className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                alt=""
              />
              {user?.displayName !== 'lawyer' ? <span>{userData?.name}</span> : <span>{orderInfo?.client_name}</span>}
            </span>
            <div className='flex flex-col items-end gap-2'>
              <p className='flex items-center border rounded-lg font-bold py-2 px-3 gap-2'>{reviewInfo?.rating}<FaStar className='text-xl text-warning' /></p>
              <span>{formatDate(reviewInfo?.timestamp)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-5">
            <span className="flex items-center text-warning">

            </span>
            <span>{reviewInfo?.review}</span>
          </div>
          <div className="flex items-center gap-3 p-5">
            <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
              <BiLike />
            </span>
            <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
              <BiDislike />
            </span>
          </div>

          {/* lawyer reply */}
          {((user.displayName !== 'lawyer' && reviewInfo.reply) || (user.displayName === 'lawyer')) &&
            <div className="border m-5 rounded-lg space-y-2">
              <p className='h-10 bg-gray-100 flex items-center px-3 font-bold uppercase text-gray-600'><span className='text-accent'> {
                user?.displayName === 'lawyer' ? <span>{userData?.name?.split(" ")[0]}</span> : <span>{orderInfo?.lawyer_name?.split(" ")[0]}</span>
              }</span>'s Reply </p>
              {reviewInfo?.reply && <div className="flex justify-between p-5">
                <div className="flex flex-col gap-3">
                  <span className="flex items-center gap-2">
                    <img
                      className="w-10 rounded-full"
                      src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                      alt=""
                    />
                    {
                      user?.displayName === 'lawyer' ? <span>{userData?.name}</span> : <span>{orderInfo?.lawyer_name}</span>
                    }
                  </span>
                  <span>{reviewInfo?.reply}</span>
                </div>

                <div className='flex flex-col items-end gap-2'>
                  {/* <p className='flex items-center border rounded-lg font-bold py-2 px-3 gap-2'>{reviewInfo.rating}<FaStar className='text-xl text-warning' /></p> */}
                  <span>{formatDate(reviewInfo?.timestamp)}</span>
                </div>
              </div>}


              {/* For lawyer to reply to user review */}
              {(user?.displayName === 'lawyer' && !reviewInfo?.reply) &&
                <div className='p-5 space-y-3'>
                  <p className='font-semibold text-lg'>You may respond to this review(This will be public)</p>
                  <form onSubmit={handleSubmit(handleReview)}>
                    <p className='font-semibold'>Review detail</p>
                    <textarea
                      name="comment"
                      className="h-32 w-full bg-primary rounded-lg border p-3 focus:border-primary"
                      {...register("comment", { required: "Review is required" })}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="primary-btn"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>}
            </div>}
        </div>
      </div>
    )
  } else {
    return null
  }

}

export default LawyerReviewReply