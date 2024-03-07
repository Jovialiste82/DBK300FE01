import React, { useState, useEffect } from "react";

const AdPlaceholder = ({
  usersCount,
  isLoadingUsersCount,
  isErrorUsersCount,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setTimeout(() => setCountdown(5), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-500 flex flex-col justify-center items-center text-white p-4">
      <p className="text-center mb-4">
        Do you want your business to sponsor this room and display your ad?
      </p>
      <p className="text-center mb-4">Contact me to know more:</p>
      <a
        href="mailto:contact@philippecharpentier.dev"
        className="text-center font-bold mb-4 underline"
      >
        contact@philippecharpentier.dev
      </a>
      <p className="text-center">
        This room has{" "}
        {isLoadingUsersCount
          ? "a few"
          : isErrorUsersCount
          ? "a few"
          : `a total of ${usersCount.usersCount} member${
              usersCount.usersCount > 1 ? "s" : ""
            }`}{" "}
      </p>
      <p className="text-center mt-4">Ad will close in: {countdown}</p>
    </div>
  );
};

export default AdPlaceholder;
