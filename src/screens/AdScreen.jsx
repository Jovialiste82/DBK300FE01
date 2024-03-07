import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";

const CreditsScreen = () => {
  const [sectionMsg, setSectionMsg] = useState("RBAC Advertiser Screen");

  return (
    <main className="flex flex-col relative flex-auto  w-full overflow-hidden">
      {/* Background Image */}
      <BackgroundImage />

      <div className=" max-w-7xl flex-1 w-full mx-auto p-8 flex flex-col gap-4 z-20">
        {/* Room Title Container */}
        <SectionMsg sectionMsg={sectionMsg} />

        {/* Posts & Menu Panel Container */}
        <div className="flex flex-1 gap-8">
          {/* Main Container */}
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            <h1 className="text-black">
              RBAC Advertiser Screen not ready yet !
            </h1>
          </div>

          {/* Sliding Menu for smaller screens */}
          <SlidingMenu />

          {/* Menu Panel for larger screens */}
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default CreditsScreen;
