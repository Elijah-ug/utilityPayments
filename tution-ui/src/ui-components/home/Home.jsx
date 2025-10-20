import React from 'react';
import { PayTution } from './PayTution';
import { RegisteredSchools } from './RegisteredSchools';
import { Summary } from './Summary';
import { Demo } from './Demo';
import { useReadContract } from 'wagmi';
import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import { formatEther } from 'viem';

export const Home = () => {
  const { data: paymentsMade } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'paymentsMade',
  });
  console.log('paymentsMade==>', paymentsMade);
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
      <div className="flex flex-col items-center text-green-400">
        <span>Payments Made At The Platform:</span>{' '}
        <span>{paymentsMade && formatEther(paymentsMade.toString()) + ' AFB'}</span>
      </div>
    </div>
  );
};
