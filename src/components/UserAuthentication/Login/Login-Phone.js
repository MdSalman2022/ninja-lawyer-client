import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../../assets/firebase.config";

// Function to confirm otp entered by user
function confirmOTP(otp) {
  let message;
  let confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(otp)
    .then((result) => {
      // User signed in successfully.
      let user = result.user;
      user.email = user.phoneNumber;
      console.log(user);
      message = true;
    })
    .catch((error) => {
      console.log(error);
      message = false;
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
