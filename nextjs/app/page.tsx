"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";


const App = () => {
  const [token, settoken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokens: string | null = localStorage.getItem("token");
      settoken(tokens);
    } else {
      alert("please login!")
    }
  }, []);
  return (
<div className="bg-white overflow-hidden h-screen">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[550px]">
          <p className="text-4xl text-stone-700 hover:text-stone-900 pl-5 md:pl-10 pt-5 md:pt-10 ">
            Mira AI
          </p>
          <div className="mt-11 ml-5 md:ml-10">
            <p className="font-extrabold text-gray-800 font-serif text-xl md:text-2xl mb-10  decoration-sky-600 hover:decoration-blue-400">
              We will help you find the right career path.
            </p>
            <p className="tracking-wide font-serif text-sm md:text-lg text-gray-900 text-justify md:mb-5">
              Discover tailored career advice at your fingertips. Our chatbot
              transforms the maze of career choices into a clear path for your
              success. Whether you&apos;re delving into AI and ML or exploring other
              possibilities, this is your destination for insightful and
              actionable career counseling. Uncover the guidance you need to
              stride confidently towards a fulfilling and rewarding professional
              journey. Your future begins here!
            </p>
          </div>
          {token?(
            <Link href='/dashboard' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-5 md:ml-10  md:mb-0 md:mt-14">
            Try It Now
          </Link>
          ):
          (
            <Link href='/signin' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-5 md:ml-10  md:mb-0 md:mt-14">
            Try It Now
          </Link>
          )}
        </div>
        <div className="md:w-full">
          <img
            className="w-full h-auto"
            src="https://dreamcaatcheer.com/wp-content/uploads/2023/04/career-counselling.jpg"
            alt="Career Counselling"
          />
        </div>
      </div>
    </div>
  );
};

export default App;