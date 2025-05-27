// src/components/Loading/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border-4 border-white border-opacity-100 border-t-4 border-t-[#DC0000] rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
