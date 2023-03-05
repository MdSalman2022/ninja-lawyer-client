import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import Middle from "../../components/MiddleSection/Middle";

function Home() {
  return (
    <div className="bg-primary dark:bg-base-100">
      <HeroSection />
      <Middle />
    </div>
  );
}

export default Home;
