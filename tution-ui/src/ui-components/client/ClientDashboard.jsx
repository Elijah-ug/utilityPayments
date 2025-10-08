import React from "react";
import { ClientInfo } from "./ClientInfo";
import { Receipt } from "./Receipt";
import { FinancialMgt } from "./FinancialMgt";

export const ClientDashboard = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-around">
        <ClientInfo />
        <FinancialMgt />
      </div>
      <div className="flex items-center justify-center pt-5">
        <Receipt />
      </div>
    </div>
  );
};
