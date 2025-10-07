import React from "react";
import { ClientInfo } from "./ClientInfo";
import { Receipt } from "./Receipt";

export const ClientDashboard = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-around">
        <ClientInfo />
        <Receipt />
      </div>
    </div>
  );
};
