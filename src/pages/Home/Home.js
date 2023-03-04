import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import Middle from "../../components/MiddleSection/Middle";
import Login from "../../components/UserAuthentication/Login/Login";

function Home() {
  return (
    <div>
      <HeroSection />
      <Middle />
      <Login />
    </div>
  );
}

export default Home;
