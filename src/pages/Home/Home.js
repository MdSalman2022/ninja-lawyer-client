import React, { useContext } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import Middle from "../../components/MiddleSection/Middle";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function Home() {

  const { user } = useContext(AuthContext)

  // for different home page
  /* if (user.userType === "lawyer") {
    return (
      <div className="bg-primary dark:bg-base-100 h-screen text-center">
        <h1 className="text-5xl font-bold">Welcome to Lawyer Home page</h1>
      </div>
    )
  }
  else  */
  return (
    <div className="bg-primary dark:bg-base-100">
      <HeroSection />
      <Middle />
    </div>
  );


}

export default Home;
