import React, { useEffect } from "react";
import UtilityServiceProviders from "./UtilityServiceProviders";
import { PayUtility } from "./PayUtility";
import { useDispatch, useSelector } from "react-redux";
import { checkDataFromAcrossThunk } from "@/global/public/debug/checkDataFromAcrossThunk";
import Receipts from "./Receipts";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { usePayBlocks } from "@/utils/contractConfig";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "@/wagmiConfig";

export default function UtilityPayments() {
  // const { address } = useSelector((state) => state.wallet);
  const { address } = useAccount();
  const {
    data: receipt,
    error: receiptError,
    pending: receiptPending,
  } = useReadContract({
    ...usePayBlocks,
    functionName: "getReceipt",
    args: [address],
  });
 
  console.log("receiptPending==> ", receiptPending);
  console.log("receiptsError==> ", receiptError);
  console.log("receipt=>: ", receipt);
  console.log("address=>", address);
  return (
    <div className="flex justify-between mx-6">
      <UtilityServiceProviders />
      <div className="grid">
        <PayUtility />
        <Receipts />
      </div>
    </div>
  );
}
