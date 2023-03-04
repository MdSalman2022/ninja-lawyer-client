import React from "react";
import "./middle.css";

export default function Middle() {
  return (
    <div>
      <p>Middle section</p>
      <div className="middle-container flex flex-row p-6">
        {/* <img src={require("../../media/banner.jpg")} alt="" /> */}
        <div className="flex flex-col middle-left w-6/12">
          <p className="text-3xlC font-bold">
            Find and Consult with best lawyers in the country!
          </p>
          <p className="text-ii mt-2">
            Lorem ipsum dolor sit amet consectetur elit. Eius maiores ratione
            omnis quia quas eveniet voluptas qui quod beatae.
          </p>
          <button class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-blue-500 rounded w-6/12">
            Button
          </button>
        </div>
        <div className="middle-right w-6/12">
          <p>SSS</p>
        </div>
      </div>
    </div>
  );
}
