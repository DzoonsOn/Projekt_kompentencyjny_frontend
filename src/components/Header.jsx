"use client";
import ArrowRightSVG from "../public/ArrowRight";
import MenuHamburgerSVG from "../public/menu";
import aparat from "../public/aparat.jpg";
import { useState } from "react";

const Header = () => {
  const [ringBell, setRingBell] = useState(1);
  const handleClick = () => {
    setRingBell((year) => year + 1);
  };
  return (
    <div className="w-full">
      <div className="bg-red-600 text-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <span className="text-sm">{ringBell}</span>
          <div className="w-10 h-10">
            <img
              src={aparat}
              alt="Aparat"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="bg-red-400 p-2 rounded">
            <ArrowRightSVG />
          </button>
          <button className="border border-white p-1 rounded">
            <MenuHamburgerSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
