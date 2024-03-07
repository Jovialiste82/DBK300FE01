// frontend/src/components/BackgroundImage.jsx
import React from "react";

const BackgroundImage = () => {
  return (
    <div className="absolute inset-0 w-full min-h-screen opacity-20 z-10">
      <img
        src="/Optimized-pexels-jordan-benton-1095601.jpg"
        alt="Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BackgroundImage;
