import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import React from 'react';
import { useAccount, useReadContract } from 'wagmi';

export const AcademicTerm = () => {
  const { address } = useAccount();
  const {
    data: term,
    error,
    isLoading,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getacademicTerm',
    args: [address],
  });
  console.log('term ==> ', term);

  return <div>AcademicTerm</div>;
};
