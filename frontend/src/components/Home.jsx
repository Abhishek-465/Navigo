import React from "react";

const Home = () => {
  return (
    <div className=" h-[100vh] flex flex-col items-center ">
      <div className=" poppins-extrabold text-[35px] mt-32 dark:text-white text-center">
        <h1>
          Rediscover Your Neighborhood: <br /> Find Nearby Amenities with Ease!
        </h1>
      </div>
      <div className="tex-[20px] mt-6 text-gray-500 ">
        <p>
          Instant Convenience, Unbeatable Info, Nearby Essentials with Heart
        </p>
      </div>
      <button className="bg-cyan-500 mt-[19px] text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
        Your Text Here
      </button>
      {/* <div className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer">
        <ReAactIcon icon={faPlayCircle} className="w-5 h-5" />
        <span>Watch My Video</span>
      </div> */}
    </div>
  );
};

export default Home;
