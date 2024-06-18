import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../../utils/constants.js";

const LandingPage = () => {
  return (
    <>
      <section className="max-w-5xl mx-auto sm:p-16 pb-12 !pt-[40px] px-8 min-h-[calc(100vh-80px)]">
        <h1 className="sm:text-5xl text-3xl font-semibold sm:leading-snug font-poppins flex items-center">
          Notes App
          <span className="ml-3 px-2 py-1 text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded shadow-md">
            Beta
          </span>
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Aplikasi catatan berbasis cloud dari Nizar masih dalam tahap Beta 1 jadi masih banyak bugnya.
          </p>
          <p>
            Versi : 0.0.1-beta.1
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-8 text-center md:space-x-4">
          <Link
            to='/signup'
            className="w-full md:w-auto max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300 mb-4 md:mb-0"
          >
            Sign Up
          </Link>
          <Link
            to='/login'
            className="w-full md:w-auto max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      </section>
      
      <footer className="w-full py-6 mt-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-8">
          <p className="text-gray-700 mb-4 sm:mb-0">
            <strong>&copy; 2024 Nizar Putra Alghifary</strong>
          </p>
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <Link key={link.name} to={link.link} target="_blank">
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className="w-6 h-6 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;