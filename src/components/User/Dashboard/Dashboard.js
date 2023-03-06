import React from "react";

export default function UserDashboardComp() {
  return (
    <div className="h-screen text-center pt-7">
      <h1>This is user dashboard</h1>
      <DemoDashboard></DemoDashboard>
    </div>
  );
}

function DemoDashboard() {
  return (
    <>
      <section className="flex font-medium pt-6 justify-center h-ful">
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">2d ago</span>
            <span className="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              className="rounded-full w-28 "
              alt="profile picture"
              srcSet=""
            />
          </div>
          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              Jennifer <br /> Hale
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
          <div className="h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 " />
          </div>
          <div className="mt-3 text-white text-sm">
            <span className="text-gray-400 font-semibold">Profile:</span>
            <span>40%</span>
          </div>
        </section>
      </section>
    </>
  );
}
