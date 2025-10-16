import React from 'react';
import { ClientInfo } from './ClientInfo';
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
      </nav>
    </div>
  );
};
