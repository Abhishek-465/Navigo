import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-[60px]">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      <p className='dark:text-white text-black text-center'>Generating the nearby locations...</p>
    </div>
  );
};

export default Loader;
