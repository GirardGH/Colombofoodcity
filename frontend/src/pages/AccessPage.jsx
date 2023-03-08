import React from "react";
import Navbar from "../components/Navbar/Navbar";
import SignIn from "../components/AccesAccount/SignIn";

export default function AccessPage() {
  return (
    <div>
      <Navbar />
      <div className="bg-[#006837db] bg-[url(https://res.cloudinary.com/db2sa2bxv/image/upload/v1676567757/search-bg-black_io5xh7.avif)] h-24 flex justify-start items-center">
        <h1 className="text-white font-medium text-xl px-8">MON COMPTE</h1>
      </div>
      <div className="lg:flex md:justify-around">
        <div className=" mx-8">
          <SignIn />
        </div>
        <div className="mx-8">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
