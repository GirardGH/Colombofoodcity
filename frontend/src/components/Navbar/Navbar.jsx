/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from "react";
import MagnifyingGlassIcon from "../../../node_modules/heroicons/react/24/outline/MagnifyingGlassIcon";
import ShoppingBagIcon from "../../../node_modules/heroicons/react/24/outline/ShoppingBagIcon";
import UserIcon from "../../../node_modules/heroicons/react/24/outline/UserIcon";

export default function Navbar() {
  return (
    <div className="flex flex-col laptop:flex-col-reverse">
      <div className="bg-white flex justify-end laptop:justify-center items-center w-[100svw]">
        <div className="hidden laptop:block laptop:w-fit laptop:h-fit laptop:px-8 laptop:mr-auto">
          <MagnifyingGlassIcon className="w-8 h-8" />
        </div>
        <div className="py-2 px-4 mr-auto laptop:mr-0">
          <img
            src="https://res.cloudinary.com/db2sa2bxv/image/upload/v1676456828/logoCFC_yswlhx.svg"
            alt="logo"
            className="w-24 h-24 mx-2 my-2"
          />
        </div>
        <div className="flex px-4 laptop:px-8 laptop:ml-auto">
          <div className="w-fit h-fit px-1 laptop:hidden">
            <MagnifyingGlassIcon className="w-8 h-8" />
          </div>
          <div className="w-fit h-fit px-1 laptop:pr-6">
            <UserIcon className="w-8 h-8" />
          </div>
          <div className="w-fit h-fit px-1">
            <ShoppingBagIcon className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="bg-black flex justify-center items-center h-10">
        <div className="px-2">
          <p className="text-white text-sm">SHOP</p>
        </div>
        <div className="px-2">
          <p className="text-white text-sm">RECETTES</p>
        </div>
        <div className="px-2">
          <p className="text-white text-sm">LE MAGASIN</p>
        </div>
      </div>
    </div>
  );
}
