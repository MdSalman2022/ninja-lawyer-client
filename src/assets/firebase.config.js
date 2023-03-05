import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxwj1wMRzjPJqdQ5612mHf3PCLM7RD_0E",
  authDomain: "ninjalawyersweb.firebaseapp.com",
  projectId: "ninjalawyersweb",
  storageBucket: "ninjalawyersweb.appspot.com",
  messagingSenderId: "407640334252",
  appId: "1:407640334252:web:151ef68cdc8784514f2409",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
