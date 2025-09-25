// import { getTotalTransactions } from "@/global/public/balances/totalTransactionsThunk";
import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReadContract } from "wagmi";
import { usePayBlocks } from "../utils/contractConfig";
import { formatEther } from "ethers";
export default function Home() {
  // const dispatch = useDispatch();
  // const { totalTransactions } = useSelector((state) => state.volumeTx);

  // useEffect(() => {
  //   dispatch(getTotalTransactions());
  //   // console.log("totalTransactions: ", totalTransactions)
  // }, [dispatch])
  // console.log("totalTransactions: ", totalTransactions)
  const {
    data: totalTransactions,
    error,
    isPending,
  } = useReadContract({
    ...usePayBlocks,
    functionName: "totalPlatformTransactions",
    args: [],
  });
  console.log("totalTransactions: ", formatEther(totalTransactions.toString()));
  return (
    <div className="w-full flex justify-center items-center flex-col gap-12 px-4 my-8">
      <div className="bg-gray-800 text-gray-300 p-8 rounded-2xl max-w-5xl w-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h2 className="font-bold mb-4 text-2xl">UtilityBlocks, The Decentralized Utility Payment System</h2>
        <h2 className=" font-semibold mb-4 text-amber-400">How UtilityBlocks Work</h2>
        <p className="text-base leading-relaxed mb-3">
          <span className="text-cyan-400 font-bold">UtilityBlocks</span> make it easier for people to pay for services
          like electricity, water, internet, and TV — all from a decentralized platform.
        </p>
        <p className="text-base leading-relaxed mb-3">
          Every payment is processed through smart contracts, and the status is updated instantly. Once confirmed, it
          gets recorded both on-chain and inside Users and Utility Provider's dashboard for transparency.
        </p>
        <p className="text-base leading-relaxed mb-3">
          Users can track their utility bills, schedule future payments, and switch providers — all without middlemen or
          delays.
        </p>
        <p className="text-base leading-relaxed">
          NOTE: for users to be able to pay for utility services consumed, the service providers must be registered to
          the plaform. You can check for registered service providers here:
          <Link to="/" className="text-green-400 ml-2">
            All Registered Service Providers
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Platform Transaction Volume </p>
        <p>{totalTransactions && formatEther(totalTransactions.toString()) + " ETH"}</p>
      </div>
    </div>
  );
}
