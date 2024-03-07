// frontend/src/components/AsideMenu.jsx
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";

const AsideMenu = () => {
  const [logout] = useLogoutMutation();

  // Get the menu from the useAuth hook
  const { menu } = useAuth();

  const navigate = useNavigate();

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

  return (
    <aside className="hidden md:block h-100 md:w-1/6 bg-gray-100 p-4 rounded-3xl shadow-lg">
      <ul>
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
              <Link to={`${item.path}`}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
