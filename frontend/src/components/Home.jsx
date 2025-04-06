import {
  FaRegCirclePlay,
  FaHospital,
  FaSchool,
  FaBriefcaseMedical,
  FaBuilding,
  FaRegCircle,
} from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import React, { useEffect, useRef } from "react";
import pic from "../assets/unnamed.png";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hospitals", "Universities", "Amenities", "Everything"],
      startDelay: 0,
      typeSpeed: 125,
      backSpeed: 105,
      backDelay: 1000,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const openVideo = () => {
    const videoURL = `${window.location.origin}/video1.mp4`;
    const newWindow = window.open(videoURL, "_blank");
    if (newWindow) newWindow.focus();
    else alert("Please allow popups for this website");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-blue-100 dark:from-transparent dark:to-transparent">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 pt-2 pb-24 sm:pb-40">
        {/* Logo/Image */}
        <img src={pic} alt="logo" className="w-[200px] sm:w-[250px] rounded-full shadow-lg" />

        {/* Title */}
        <div className="mt-12 sm:mt-20 text-center">
          <h1 className="poppins-semibold text-3xl  leading-snug bg-gradient-to-b from-blue-700 to-gray-900 dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
            Rediscover Your Neighborhood <br />
            Nearby <span ref={el} className="text-blue-900 dark:text-gray-200"></span> with Ease!
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl text-center">
          Instant Convenience, Unbeatable Info, Nearby Essentials with Heart
        </p>

        {/* Button */}
        <Link to="/find" className="mt-8">
          <button className="bg-cyan-700 hover:bg-cyan-600 text-white text-base sm:text-lg py-2 px-6 rounded-full shadow transition duration-300">
            Explore Nearby Places
          </button>
        </Link>

        {/* Demo Section */}
        <div
          className="flex items-center space-x-2 mt-6 text-blue-800 dark:text-blue-300 hover:text-blue-600 cursor-pointer transition duration-300"
          onClick={openVideo}
        >
          <FaRegCirclePlay className="w-6 h-6" />
          <span className="text-base sm:text-lg underline underline-offset-2">Watch the demo</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full bg-white dark:bg-gray-800 py-3 border-t dark:border-gray-700">
        <Marquee gradient={false} speed={50} pauseOnHover>
          {[
            { icon: <FaHospital />, label: "Health" },
            { icon: <FaSchool />, label: "Schools" },
            { icon: <FaBriefcaseMedical />, label: "Medical" },
            { icon: <FaBuilding />, label: "Police" },
            { icon: <FaRegCircle />, label: "Community" },
          ]
            .flatMap((item) => [item, item]) // Repeat items for smooth loop
            .map((item, index) => (
              <div key={index} className="flex items-center mx-6 space-x-2">
                <div className="text-3xl sm:text-4xl text-blue-700 dark:text-blue-300">
                  {item.icon}
                </div>
                <span className="text-lg sm:text-xl text-gray-800 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
        </Marquee>
      </div>
    </div>
  );
}
