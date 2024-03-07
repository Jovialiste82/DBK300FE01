import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";

const HomeScreen = () => {
  return (
    <>
      <BackgroundImage />
      <div className="flex flex-col relative min-h-screen bg-gradient-to-br from-purple-800 to-blue-500 opacity-80 z-20">
        <main className="flex-grow flex items-center justify-center w-full">
          {/* Section for the main content */}
          <section>
            <div className="p-6 bg-white rounded-lg shadow-xl max-w-md m-4 md:m-8 ">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
                Welcome to DobKonektor!
              </h1>
              <h2 className="text-xl md:text-2xl  text-blue-900 mb-6 text-center">
                "Linking Lives, Beyond Dates!"
              </h2>
              <nav className="flex flex-col space-y-4">
                {/* Navigation links with semantic nav tag */}
                <Link
                  to="/login"
                  className="px-4 py-2 md:px-6 md:py-3 bg-blue-700 rounded-md shadow-md text-white font-semibold transition duration-200 ease-in-out transform hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 md:px-6 md:py-3 bg-blue-700 rounded-md shadow-md text-white font-semibold transition duration-200 ease-in-out transform hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
                >
                  Signup
                </Link>
                <a
                  href="https://youtu.be/dq2_KauzgIk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 md:px-6 md:py-3 bg-blue-700 rounded-md shadow-md text-white font-semibold transition duration-200 ease-in-out transform hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
                >
                  Demo
                </a>
              </nav>
            </div>
          </section>
        </main>
        {/* Footer for the copyright text */}
        <footer className="text-center pb-4">
          <a
            href="https://philippecharpentier.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white transition duration-200 ease-in-out transform hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-50"
          >
            &copy; Copyright 2024 - Philippe Charpentier
          </a>
        </footer>
      </div>
    </>
    // Using a main tag for semantic purposes, representing the dominant content of the document
  );
};

export default HomeScreen;
