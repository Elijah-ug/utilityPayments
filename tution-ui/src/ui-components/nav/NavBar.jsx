import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="hidden sm:flex items-center justify-around p-5">
      <div className="flex items-center justify-center gap-12 bg-purple-700 p-2 px-6 font-semibold rounded-br-4xl rounded-tl-4xl">
        <NavLink to="/">Home</NavLink>
        <NavLink to="school">School Dashboard</NavLink>
        <NavLink to="client">Client Dashboard</NavLink>
        <NavLink to="admin"> Admin Dashboard</NavLink>
      </div>

      <div className="">
        <ConnectButton />
      </div>
    </div>
  );
};
