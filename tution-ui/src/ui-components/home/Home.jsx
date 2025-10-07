import React from "react";
import { PayTution } from "./PayTution";
import { RegisteredSchools } from "./RegisteredSchools";
import { Summary } from "./Summary";
import { Demo } from "./Demo";

export const Home = () => {
  return (
    <div className="min-h-screen py-5 ">
      <div className="py-10">
        <Summary />
      </div>
      <div className="">
        <Demo />
      </div>
      
        <div className="grid sm:grid-cols-3 gap-5 py-20">
        <div className="">
          <PayTution />
        </div>
        <div className="sm:col-span-2 ">
          <RegisteredSchools />
        </div>
      </div>
     
    </div>
  );
};
