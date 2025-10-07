import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import { NavLink } from "react-router-dom";

export const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleHideShowLinks = () => {};
  return (
    <div className="sm:hidden flex items-center justify-between p-3">
      <div className="">
        <ConnectButton />
      </div>
      <div className="relative ">
        <div onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <MdClose /> : <FaBars />}
        </div>

        {isOpen && (
          <div className=" absolute rounded top-8 right-0 flex flex-col items-center gap-5 bg-purple-400 p-2 px-6 text-blue-600 font-semibold ">
            <NavLink onClick={() => setIsOpen(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="school">
              School Dashboard
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="client">
              Client Dashboard
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="admin">
              {" "}
              Admin Dashboard
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
