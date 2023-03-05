import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { auth } from "../../../assets/firebase.config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function Login() {
  const { darkmode } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [otpDisplay, setOTPDisplay] = useState(false);

  function reVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }
  }

  function mobileLogin(e) {
    e.preventDefault();
    const form = e.target;
    const number = form.phoneNumber.value;
    console.log(number);
    reVerify();
    const appVerifier = window.recaptchaVerifier;
    //
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("yes, sent");
        setOTPDisplay(true);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function verifyOTP() {
    let otpLet = otp;
    if (otp.length === 6) {
      console.log(otpLet);
      // let confirmationResult = window.confirmationResult;
      // confirmationResult
      //   .confirm(otp)
      //   .then((result) => {
      //     // User signed in successfully.
      //     const user = result.user;
      //     console.log(user);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }

  return (
    <div>
      <section className="bg-primary dark:bg-base-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/">
            <img
              className={`w-32 md:w-44 mb-3 md:mb-6 ${!darkmode && "hidden"}`}
              src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png"
              alt=""
            />
          </Link>
          <Link to="/">
            <img
              className={`w-32 md:w-44 mb-3 md:mb-6 ${darkmode && "hidden"}`}
              src="https://i.ibb.co/smWpwrC/png.png"
              alt=""
            />
          </Link>
          <div className="w-full bg-white rounded-lg shadow-lg dark:shadow-none dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-base-100 dark:border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={mobileLogin}>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+990123456789"
                    required=""
                  />
                  <button
                    type="submit"
                    id="phoneLoginButton"
                    className="mt-3 transition-all duration-300 w-full text-white bg-base-100 hover:bg-accent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-base-100 dark:bg-primary dark:hover:bg-accent dark:focus:ring-primary dark:hover:text-primary"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
              {/* Expandable OTP confirmation field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your OTP
                </label>
                <input
                  type="number"
                  name="OTP"
                  id="OTP"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+990123456789"
                  required=""
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
                <button
                  id="OTPSubmit"
                  onClick={verifyOTP}
                  className="mt-3 transition-all duration-300 w-full text-white bg-base-100 hover:bg-accent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-base-100 dark:bg-primary dark:hover:bg-accent dark:focus:ring-primary dark:hover:text-primary"
                >
                  Confirm
                </button>
              </div>
              {/* Devider between forms */}
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  or
                </span>
              </div>
              {/* Email login */}
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-black hover:underline dark:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="transition-all duration-300 w-full text-white bg-base-100 hover:bg-accent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-base-100 dark:bg-primary dark:hover:bg-accent dark:focus:ring-primary dark:hover:text-primary"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-accent hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div id="recaptcha-container"></div>
      </section>
    </div>
  );
}
