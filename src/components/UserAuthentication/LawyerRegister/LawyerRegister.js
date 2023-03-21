import React from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../assets/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import { sendToServerLawyer } from "../Login/LoginPostDB";
import { useForm } from "react-hook-form";

export default function LawyerRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // For navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (data) => {
    const {
      fname,
      lname,
      email,
      password,
      confirm_password,
      gender,
      state,
      city,
      bar,
      id,
      year,
    } = data;

    const name = fname + " " + lname;

    console.log(data);

    if (password === confirm_password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          //   Lawyer set user role
          updateProfile(auth.currentUser, {
            displayName: "lawyer",
          })
            .then(() => {
              console.log("added user role");
            })
            .catch((error) => {
              console.log("cannot add user role", error);
            });
          console.log(user);
          // Post to sever
          const postData = {
            UID: user.uid,
            email: email,
            name,
            gender,
            state,
            city,
            bar,
            id,
            year,
            verified: false,
          };
          sendToServerLawyer(user.id, postData);
          console.log("sent to server");
          // Navigate function once user logs in
          navigate(from, { replace: true });
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <section className="bg-primary dark:bg-base-100 pb-7">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-base-100 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="grid grid-cols-2 gap-5 pb-0">
                <Link
                  to="/register"
                  className="transition-all duration-300 border rounded-lg p-2 text-center hover:bg-accent hover:text-primary cursor-pointer"
                >
                  User
                </Link>
                <div className="transition-all duration-300 border rounded-lg p-2 text-center bg-accent text-primary cursor-pointer">
                  Lawyer
                </div>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className=" grid grid-cols-2 gap-5"
                onSubmit={handleSubmit(handleSignUp)}
              >
                <label htmlFor="">
                  First Name
                  <input
                    type="text"
                    name="fname"
                    className="input-box w-full"
                    {...register("fname", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Last Name
                  <input
                    type="text"
                    name="lname"
                    className="input-box w-full"
                    {...register("lname", { required: true, maxLength: 80 })}
                  />
                </label>
                <label className="col-span-2" htmlFor="">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="input-box w-full "
                    {...register("email", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Password
                  <input
                    type="password"
                    name="fname"
                    className="input-box w-full"
                    {...register("password", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Confirm password
                  <input
                    type="password"
                    name="confirm_password"
                    className="input-box w-full"
                    {...register("confirm_password", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                </label>
                <label class="col-span-1 flex flex-col items-start">
                  <span class="text-start font-medium text-base-100 dark:text-primary ">
                    Gender
                  </span>
                  <select
                    className="input-box w-full "
                    {...register("gender", { required: true })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                <label htmlFor="">
                  State
                  <input
                    type="text"
                    name="state"
                    className="input-box w-full"
                    {...register("state", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  City
                  <input
                    type="text"
                    name="city"
                    className="input-box w-full"
                    {...register("city", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Bar Council ID
                  <input
                    type="text"
                    name="bar"
                    className="input-box w-full"
                    {...register("bar", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Id no
                  <input
                    type="text"
                    name="id"
                    className="input-box w-full"
                    {...register("id", { required: true, maxLength: 80 })}
                  />
                </label>
                <label htmlFor="">
                  Year
                  <input
                    type="text"
                    name="year"
                    className="input-box w-full"
                    {...register("year", { required: true, maxLength: 80 })}
                  />
                </label>
                <div className="flex items-start col-span-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="col-span-2 w-full text-white bg-base-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:text-black dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-accent hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
