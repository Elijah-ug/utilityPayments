import { Info } from "./Info";
import React from "react";
import { SchoolAccess } from "./SchoolAccess";

export const SchoolDashboard = () => {
  return (
    <div className="min-h-screen  py-10 ">
      <div className="flex flex-col sm:flex-row gap-9 items-center justify-around ">
        <SchoolAccess />
        <Info />
      </div>
    </div>
  );
};
