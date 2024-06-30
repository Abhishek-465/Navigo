import { FaRegCirclePlay, FaHospital, FaSchool, FaBriefcaseMedical, FaBuilding, FaRegCircle } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import Typed from "typed.js";
import React, { useEffect, useRef } from "react";

export default function Home() {
  // Create Ref element.
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hospitals", "Universities", "Amenities", "Everything"], // Strings to display
      // Speed settings, try different values until you get good results
      startDelay: 0,
      typeSpeed: 125,
      backSpeed: 105,
      backDelay: 1000,
      loop: true, // Loop the typing animation
      showCursor: false,
      smartBackspace: true,
    });

    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-50 to-blue-100 dark:from-transparent dark:to-transparent">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="poppins-semibold text-[28px] sm:text-[38px] mt-16 sm:mt-32 dark:text-white text-center px-4 sm:px-0">
          <h1 className="text-transparent bg-gradient-to-b from-blue-700 to-gray-900 dark:bg-gradient-to-b dark:from-gray-400 dark:to-white bg-clip-text">
            Rediscover Your Neighborhood <br /> Nearby <span className="text-blue-950 dark:text-gray-300" ref={el}></span> with Ease!
          </h1>
        </div>
        <div className="text-[16px] px-[20px] sm:px-0 text-center mt-6 text-gray-600 dark:text-gray-300">
          <p>Instant Convenience, Unbeatable Info, Nearby Essentials with Heart</p>
        </div>
        <button className="bg-cyan-700 mt-[26px] text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
          Nearby Places
        </button>
        <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300 hover:text-blue-700 cursor-pointer mt-4">
          <div className="w-5 h-5 mt-1 rounded-full">
            <FaRegCirclePlay className="w-full h-full" />
          </div>
          <span>Watch the demo</span>
        </div>
      </div>
      <div className="w-full bg-white dark:bg-gray-800 py-4">
        <Marquee gradient={false} speed={50}>
        <div className="flex items-center mx-4">
            <FaHospital className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Health</span>
          </div>
          <div className="flex items-center mx-4">
            <FaSchool className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Schools</span>
          </div>
          <div className="flex items-center mx-4">
            <FaBriefcaseMedical className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Medical</span>
          </div>
          <div className="flex items-center mx-4">
            <FaBuilding className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Police</span>
          </div>
          <div className="flex items-center mx-4">
            <FaRegCircle className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Community</span>
          </div>
          <div className="flex items-center mx-4">
            <FaHospital className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Health</span>
          </div>
          <div className="flex items-center mx-4">
            <FaSchool className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Schools</span>
          </div>
          <div className="flex items-center mx-4">
            <FaBriefcaseMedical className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Medical</span>
          </div>
          <div className="flex items-center mx-4">
            <FaBuilding className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Police</span>
          </div>
          <div className="flex items-center mx-4">
            <FaRegCircle className="text-4xl text-blue-700 dark:text-blue-300 mx-2" />
            <span className="text-lg text-gray-800 dark:text-gray-300">Community</span>
          </div>
        </Marquee>
      </div>
    </div>
  );
}
