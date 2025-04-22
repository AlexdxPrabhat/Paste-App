import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-evenly gap-8">
        <NavLink to="/" className="hover:text-blue-300 transition-colors font-bold">
          Home
        </NavLink>
        <NavLink to="/pastes" className="hover:text-blue-300 transition-colors font-bold">
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
