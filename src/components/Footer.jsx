import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-100 w-full h-10">
      <div className="w-full flex justify-center items-center h-full ">
        <div className="text-center">
          <a
            href="https://philippecharpentier.dev"
            className="text-xs text-gray-600 hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; Copyright 2024 - Philippe Charpentier
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
