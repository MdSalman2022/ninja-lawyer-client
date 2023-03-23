import React from "react";
import "./middle.css";
import carSVG from "../../media/carSVG.svg";

export default function Middle() {
  return (
    <div className="py-5">
      <div className="middle-container flex flex-row p-6 ">
        {/* <img src={require("../../media/banner.jpg")} alt="" /> */}
        <div className="flex flex-col justify-center middle-left lg:w-6/12">
          <p className="text-3xlC font-bold">
            Find and Consult with best lawyers in the country!
          </p>
          <p className="text-ii mt-2 mb-3">
            Lorem ipsum dolor sit amet consectetur elit. Eius maiores ratione
            omnis quia quas eveniet voluptas qui quod beatae.
          </p>
          <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-blue-500 rounded w-6/12">
            Button
          </button>
        </div>
        <div className="middle-right lg:w-6/12">
          {/* <img src={require("../../media/car.png")} className="transparentC" /> */}
          <img src={carSVG} className="pl-7 pt-7 pb-7" />
        </div>
      </div>
    </div>
  );
}
