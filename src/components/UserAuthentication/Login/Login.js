import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { auth } from "../../../assets/firebase.config";
import {
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { reVerify, confirmOTP } from "./Login-Phone";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import { sendToServer, sendUserLogs } from "./LoginPostDB";
import { toast } from "react-hot-toast";

export default function Login() {
  const { user, loading } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [otpDisplay, setOTPDisplay] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");  
  const [countryCode, setCountryCode] = useState("+91");


  // For navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Useeffect to check if users' logged in already
  useEffect(() => {
    if (user) {
      console.log("already logged");
      navigate(from, { replace: true });
    } else {
      console.log("not logged");
      console.log(user);
    }
  }, [user]);
  // Spinner
  if (loading) {
    return (
      <div className="h-screen bg-primary dark:bg-base-100">
        <h1 className="dark:text-white text-black text-center pt-5 text-2xl">
          Loading...
        </h1>
      </div>
    );
  }

  // Navigate function once user logs in
  function navigateDashboard() {
    toast.success("Logged in successfully");
    navigate(from, { replace: true });
  }

  // Google login setup
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigateDashboard();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, errorCode);
      });
  }

  function emailLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // Post to sever
        const postData = {
          UID: user.uid,
          email: email,
        };
        sendToServer(user.id, postData);
        sendUserLogs(user, "login")

        navigateDashboard();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "Code: ", errorCode);
      });
  }

  function mobileLogin(e) {
    e.preventDefault();
    const form = e.target;
    const number = countryCode + form.phoneNumber.value; // concatenate countryCode with phoneNumber
    setPhoneNumber(number);
    setOTPDisplay(true);
    reVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        toast.success("OTP code sent");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("yes, sent");

      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function verifyOTP() {
    let otpLet = otp;
    if (otpLet.length === 6) {
      console.log(otpLet);
      const getOTPConfirmation = await confirmOTP(otpLet, phoneNumber);

      console.log(getOTPConfirmation, "-0-");
      if (getOTPConfirmation.message === true) {
        console.log("Sent true");
        toast.success("Logged in successfully");


        const url = `https://ninja-lawyer-server.vercel.app/api/users/logs/post?UID=${user.uid}&action=login`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        const data = await response.json();
        console.log(data);

      } else {
        toast.error("Invalid OTP");
      }
    }
  }

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  }
console.log(countryCode)
console.log(phoneNumber)


  return (
    <div className="h-full py-24 bg-primary dark:bg-base-100 flex flex-col justify-center">
      <section className="pb-7 pt-3">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
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
                  {/* <span className="absolute top-[31px] left-0 px-2 border-r">+91</span> */}
                  <div className=" relative">
                  <select
                    className="absolute h-full w-fit left-0 p-2 border rounded-l-lg bg-gray-50 border-gray-300"
                    name="countryCode"
                    id="countryCode"
                    value={countryCode}
                    onChange={handleCountryCodeChange}>
                    <option value="+91">+91</option>
                    <option value="+880">+880</option>
                  </select>
                    <input
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      className="pl-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      placeholder="0123456789"
                      required=""
                    />
                  </div>
                  </label>
                  {!otpDisplay && (
                    <button
                      type="submit"
                      id="phoneLoginButton"
                      className="mt-3 transition-all duration-300 w-full text-white bg-base-100 hover:bg-accent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-base-100 dark:bg-primary dark:hover:bg-accent dark:focus:ring-primary dark:hover:text-primary"
                    >
                      Send OTP
                    </button>
                  )}
                </div>
              </form>
              {/* Expandable OTP confirmation field */}
              {otpDisplay && (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your OTP
                  </label>
                  <input
                    pattern="[0-9]*"
                    maxlength="6"
                    type="text"
                    name="OTP"
                    id="OTP"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123456"
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
              )}

              {/* Devider between forms */}
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  or
                </span>
              </div>
              {/* Email login */}
              <form className="space-y-4 md:space-y-6" onSubmit={emailLogin}>
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
              </form>
              {/* Social logins */}
              {/* <div className="flex md:flex-row flex-col">
                <button
                  type="button"
                  className="lg:w-2/4 sm:w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 md:mr-2 mb-2"
                  onClick={googleLogin}
                >
                  <span className="text-2xl mr-2 mt-1">
                    <AiFillGoogleCircle />
                  </span>{" "}
                  Google Login
                </button>

                <button
                  type="button"
                  className="lg:w-2/4 sm:w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2"
                >
                  <span className="text-2xl mr-2 mt-1">
                    <AiFillFacebook />
                  </span>{" "}
                  Facebook Login
                </button>
              </div> */}
              {/* End of social logins */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-accent hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div id="recaptcha-container"></div>
      </section>
    </div>
  );
}
