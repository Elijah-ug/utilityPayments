import { getReceiptThunk } from '@/global/public/user/receiptThunk';
import { formatEther, parseEther } from 'ethers';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Receipts() {
  const { receipts } = useSelector((state) => state.receipt);
  const { address } = useSelector((state) => state.wallet);
  const { blockchainData } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(getReceiptThunk({address}))
    }
  }, [address])
  const equalData = receipts?.payer === blockchainData?.from

  const isCurrentReceipt = blockchainData.length > 0 && blockchainData.some(
    (tx) => tx.timestamp === receipts.timestamp && tx.from === receipts.payer)
  console.log("isCurrentReceipt: ", blockchainData);
  // const receiptsNetPaid = parseEther(receipts?.netPaid?.toString());
  // const totalNetPaid = blockchainData.length && formatEther(parsedGassUsed + receiptsNetPaid)

  return (
      <div className="mt-4">
      {/* {receipts && isCurrentReceipt > 0 && */}
      {/* // blockchainData.map((data, index) */}
      {/* key={data.txHash}  */}
      <div className="mb-1">
        <h3 className="text-center ">Your Last transaction </h3>
      </div>
        <div className="grid grid-cols-2 gap-2 bg-gray-800 p-2 rounded transition-all duration-300 hover:scale-103 ease-in-out">

        <div className="flex gap-2 items-center">
          <span>Amount:</span>
          <span className="text-sm text-gray-300">{ receipts.amount}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span>Procesing Fee:</span>
          <span className="text-sm text-gray-300">{ receipts.platformFee}</span>
        </div>

        {/* <div className="flex gap-2">
          <span>Gas Used:</span>
          <span>{ blockchainData.gasUsed}</span>
        </div> */}

        <div className="flex gap-2 items-center">
          <span>Net Paid:</span>
          <span className="text-sm text-gray-300">{ receipts.netPaid}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span>Payer:</span>
          <span className="text-sm text-gray-300">{ receipts?.payer?.slice(0, 7)}...{ receipts?.payer?.slice(-5)}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span>Company:</span>
          <span className="text-sm text-gray-300">{ receipts?.company?.slice(0, 7)}...{ receipts?.company?.slice(-5)}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span>Date:</span>
          <span className="text-sm text-gray-300 ">{ receipts.timestamp}</span>
        </div>

      </div>
          {/* )} */}
    </div>
  )
}
