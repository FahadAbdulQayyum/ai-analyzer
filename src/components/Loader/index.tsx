import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm z-50 text-white">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;