import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-0 lg:px-4  ">
      <div className=" p-4 flex flex-row items-center justify-evenly  bg-gray-900 text-white shadow-lg">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/pastes"}>Paste</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
