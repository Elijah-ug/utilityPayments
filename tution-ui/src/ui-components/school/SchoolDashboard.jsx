import { Info } from './Info';
import React from 'react';
import { SchoolAccess } from './SchoolAccess';
import { AcademicTerm } from './AcademicTerm';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const SchoolDashboard = () => {
  const { address } = useAccount();
  console.log('address==>', address);
  return (
    <div className="min-h-screen  py-10 ">
      <div className="flex flex-col sm:flex-row gap-9 items-center justify-around ">
        <Info />
        <SchoolAccess />
      </div>
      <AcademicTerm />
      <Link to="/school-tx-history" state={{ address }}>
        Transactions History
      </Link>
    </div>
  );
};
