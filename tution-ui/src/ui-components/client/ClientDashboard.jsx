import React from 'react';
import { ClientInfo } from './ClientInfo';
import { Receipt } from './Receipt';
import { FinancialMgt } from './FinancialMgt';
import { Link, Outlet } from 'react-router-dom';
import { Download } from 'lucide-react';
import { ReceiptDownload } from './ReceiptDownload';

export const ClientDashboard = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="flex flex-col sm:flex-row gap-9 items-center justify-around">
        <ClientInfo />
        <FinancialMgt />
      </div>
      <nav className="flex flex-col items-center justify-center pt-5">
        <ReceiptDownload />
        {/* <Link to="receipt">
          <div className="flex items-center gap-2">
            <span className="text-sm">Check your receipt here</span>
            
          </div>
        </Link>
        <Outlet /> */}
        {/* <Receipt /> */}
      </nav>
    </div>
  );
};
