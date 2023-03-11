import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 backdrop-blur-xl z-10">
      <div className="flex items-center space-x-2">
        <FaSpinner className="animate-spin text-2xl" />
        <span className="font-bold text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;