// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import useAuth from "../hooks/useAuth";

const Header = ({ onToggleMenu }) => {
  const { isLoggedIn } = useAuth();
  return (
    <header className="bg-gradient-to-r from-purple-800 to-blue-500 w-full h-16">
      <div className="max-w-7xl mx-auto w-full text-white p-4">
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-16">
          <Link to={isLoggedIn ? "/lobby" : "/"} className="text-2xl font-bold">
            DobKonektor <span className="text-sm">BETA</span>
          </Link>
          <HiMenuAlt3
            className="text-2xl md:hidden cursor-pointer"
            onClick={onToggleMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
