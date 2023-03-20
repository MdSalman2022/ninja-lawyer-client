import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../../assets/firebase.config";
import { sendToServer } from "./LoginPostDB";

// Function to confirm otp entered by user
async function confirmOTP(otp, phoneNumber) {
  let message;
  let confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(otp)
    .then((result) => {
      // User signed in successfully.
      let user = result.user;
      console.log(user, "111111");
      message = { message: true, UID: user.id };
      // Post to sever
      const postData = {
        UID: user.uid,
        phone: phoneNumber,
      };
      sendToServer(user.id, postData);
    })
    .catch((error) => {
      console.log(error);
      message = { message: false };
    })
    .finally(() => {
      return message;
    });
}

// Function to verify re-captcha. It's nexessary for google phone auth
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

export { reVerify, confirmOTP };
