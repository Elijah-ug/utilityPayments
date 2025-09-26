import { useEffect } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfiles } from "@/global/company/profile/getCompanyThunk";
import { listedCompanies } from "@/global/public/companies/listedCompaniesThunk";
import { useState } from "react";
import { SheetShowLastTransactions } from "./SheetShowLastTransactions";
import { getCompanyReceiptThunk } from "@/global/company/public/receipts/companyReceiptsThunk";
import { useAccount, useReadContract } from "wagmi";
import { useBasePayBlocks, usePayBlocks } from "@/utils/contractConfig";

export default function CompanyDashboard() {
  // const { profile } = useSelector((state) => state.company);
  // const { address } = useSelector((state) => state.wallet);

  // const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false)
  // useEffect(() => {
  //       dispatch(getCompanyProfiles({ address }));
  //       dispatch(listedCompanies());
  //   dispatch(getCompanyReceiptThunk());
  //     }, [address]);
  // const handleShowReceipts = () => {
  //     setIsOpen(!isOpen);
  //   console.log(isOpen)
  // }
  const { address } = useAccount();
  const {
    data: profile,
    error,
    pending,
  } = useReadContract({
    ...useBasePayBlocks,
    functionName: "getCompany",
    args: [address],
  });
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
  const {
    data: balance,
    error: balaError,
    pending: balaPending,
  } = useReadContract({
    ...usePayBlocks,
    functionName: "getCompanyBalance",
    args: [address],
  });

  return (
    <div>
      {profile?.isActive && (
        <div className="">
          {" "}
          <div className="text-center mb-4">{profile.companyAddr}</div>
          <div className="flex justify-between mx-10">
            <div className="left">
              <Profile profile={profile} balance={balance} />
            </div>
          </div>
          <SheetShowLastTransactions profile={profile} receipt={receipt} />
        </div>
      )}
    </div>
  );
}
