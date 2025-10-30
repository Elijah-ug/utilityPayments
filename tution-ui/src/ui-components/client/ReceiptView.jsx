import React from 'react';
import { formatEther, hexToString } from 'viem';

export const ReceiptView = ({ receipt, date, hexToString, isPending, hasReceipt }) => {
  console.log('address==>', hasReceipt);
  return (
    <div className="text-blue-700">
      <h3>Wired here</h3>
      {isPending ? (
        <h3>Loading...</h3>
      ) : (
        receipt && (
          <div className="flex flex-col gap-3">
            <div className="">
              <span>Payer</span>
              <span>
                { `${receipt.payer.slice(0, 7)}...${receipt?.payer.slice(-5)}`}
              </span>
            </div>

            <div className="">
              <span>Payer</span>
              <span>{`${receipt.school.slice(0, 7)}...${receipt?.school.slice(-5)}`}</span>
            </div>

            <div className="">
              <span>Student Name</span>
              <span>{hexToString(receipt.student)}</span>
            </div>

            <div className="">
              <span>Class:</span>
              <span>{hexToString(receipt.class)}</span>
            </div>

            <div>
              <span>Amount Paid:</span>
              <span>{formatEther(receipt.amount)} AFB</span>
            </div>

            <div>
              <span>Remaining Balance:</span>
              <span>{formatEther(receipt.balance)} AFB</span>
            </div>

            <div>
              <span>Payment Date:</span>
              <span>{date}</span>
            </div>

            <div>
              <span>Status:</span>
              <span>{receipt.cleared ? 'Cleared' : 'Not cleared'}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};
