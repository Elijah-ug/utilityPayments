import React from 'react';
import { useAccount } from 'wagmi';
import { useGetAllTransactionsQuery } from '../rtkQuery/transaction';
import { useLocation } from 'react-router-dom';

export const SchoolTutionPayments = () => {
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();
  const location = useLocation();
  const address = location.state?.address;
  console.log('address location ==>', address);
  return (
    <div className="flex flex-col gap-1 sm:gap-5 sm:items-center ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        transactions &&
        transactions.map(
          (tx) =>
            tx?.to?.toLowerCase() === address?.toLowerCase() && (
              <div className="bg-gray-600 p-2 rounded-xs">
                <div className="flex items-center gap-2">
                  <span>Transactionx hash:</span>
                  <a
                    className="text-green-400"
                    href={`https://sepolia.basescan.org/tx/${tx.txHash}`}
                    target="_blank"
                  >
                    <span className="lg:hidden">
                      {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-6)}
                    </span>
                    <span className="hidden lg:block">{tx.txHash}</span>
                  </a>
                  {/* <span >{tx.txHash.slice(0,8)}...{tx.txHash.slice(-6)}</span> */}
                </div>

                <div className="flex items-center gap-2 ">
                  <span>Payer:</span>
                  <span className="lg:hidden">
                    {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                  </span>
                  <span className="hidden lg:block">{tx.from}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>School:</span>
                  <span className="lg:hidden">
                    {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                  </span>
                  <span className="hidden lg:block">{tx.to}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Amount:</span>
                  <span>{tx.payAmount ? tx.payAmount + ' AFB' : 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Student Name:</span>
                  <span>{tx.studentName || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Student Class:</span>
                  <span>{tx.studentClass || 'N/A'}</span>
                </div>
              </div>
            )
        )
      )}

      {!isLoading && transactions && (
        <div className="mt-10 flex  gap-1 text-sm text-violet-400">
          <span className="italic text-amber-500"> Note:</span>
          <span>To view the transaction details on basescan, click the transaction hash</span>
        </div>
      )}
    </div>
  );
};
