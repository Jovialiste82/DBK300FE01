import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SlidingMenu from "./SlidingMenu";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header onToggleMenu={toggleMenu} />
      <SlidingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
