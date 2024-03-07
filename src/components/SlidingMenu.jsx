import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";

const SlidingMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // Destructure to get the trigger function for the logout mutation
  const [logout] = useLogoutMutation();

  // Get the menu from the useAuth hook
  const { menu } = useAuth();

  // Handler function for logout action
  const handleLogout = async () => {
    try {
      // Clear local storage

      localStorage.clear();

      // Call the logout function
      // Proceed with other logout actions
      const result = await logout().unwrap();

      navigate(`/login`);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
      navigate(`/login`);
    }
  };

  // Handler function for menu item click
  const handleMenuItemClick = (path) => {
    // If the clicked item is not "Logout", close the menu
    if (path !== "/logout") {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-full bg-black shadow-lg flex flex-col opacity-70`}
        onClick={onClose} // Close menu when overlay is clicked
      ></div>
      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-11/12 bg-gray-100 shadow-lg flex flex-col overflow-scroll`}
      >
        <div className="flex justify-between py-4 px-8 items-center bg-gray-100 text-black">
          <span className="text-xl font-bold">DK</span>
          <HiX className="text-3xl cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex-1 flex flex-col  items-center mt-10">
          <ul className="space-y-3 w-3/5">
            {menu.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-4 rounded ${
                  index !== menu.length - 1 ? "border-b border-gray-300" : ""
                } hover:bg-blue-500 hover:text-white transition-colors duration-300 text-center`}
              >
                {/* Check if the item is a logout item */}
                {item.title === "Logout" ? (
                  // If it is, use onClick handler for logout action
                  <button onClick={handleLogout}>{item.title}</button>
                ) : (
                  // If not, render a Link to the respective path
                  <Link
                    to={`${item.path}`}
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SlidingMenu;
