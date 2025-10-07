import React from "react";
import { FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="w-full bg-gray-900 px-10 py-5 text-sm">
      <div className="flex items-center justify-around py-5">
        <div className="">
          <p>Tution payment gateway on the blockchain </p>
        </div>
        <div className="flex items-center gap-5 transition-all duration-300 ease-in-out">
          <Link to="" className="bg-blue-400 p-2 rounded hover:scale-103">
            <FaXTwitter />
          </Link>
          <Link to="" className="bg-blue-400 p-2 rounded hover:scale-103">
            <FaTelegram />
          </Link>
          <Link to="" className="bg-blue-400 p-2 rounded hover:scale-103">
            <FaLinkedin />
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-center pt-3">
        <p>&copy; {date} Copyright rules preserved </p>
      </div>
    </div>
  );
};
