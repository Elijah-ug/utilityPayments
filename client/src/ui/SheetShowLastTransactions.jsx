import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { getCompanyProfiles } from "@/global/company/profile/getCompanyThunk";
import { getCompanyReceiptThunk } from "@/global/company/public/receipts/companyReceiptsThunk";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheck, FaLeftLong, FaRightToBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoCopy } from "react-icons/go";

export function SheetShowLastTransactions() {
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState("");
  const { profile } = useSelector((state) => state.company);
  const { address } = useSelector((state) => state.wallet);
  const { mappedReceipts } = useSelector((state) => state.companyReceipts);
  console.log(mappedReceipts)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyReceiptThunk());
    dispatch(getCompanyProfiles({ address }));
  }, [address]);

  const handleCopyAddress = (selectedAddr) => {
    if (selectedAddr) {
       setCopiedAddress(selectedAddr)
      navigator.clipboard.writeText(selectedAddr);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
    console.log(selectedAddr);

  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 border-none ml-12 mt-2">Show Ledger <FaRightToBracket/> </Button>
      </SheetTrigger>
      <SheetContent  className="bg-gray-800 border-none w-full sm:w-1/2 lg:w-[700px] max-w-none sm:max-w-none">
        <SheetHeader className="bg-gray-700">
          <SheetTitle className="text-green-400">Transactions History</SheetTitle>
          <SheetDescription className="text-white text-md flex gap-3">
            <span>Payments made to:</span>
            <span className="">{profile.companyAddr}</span>
          </SheetDescription>
        </SheetHeader>
        <div>
          {mappedReceipts.length > 0 ? mappedReceipts.map((receipt, index) =>
          (<div key={index} className="rounded grid flex-1 auto-rows-min gap-2 mx-4 bg-blue-500 py-2 transition-all duration-300 hover:scale-103 ease-in-out">
            {/* first */}
            <div className="flex items-center justify-around">
              <div className="">
              <div className="flex gap-2">
              <span>Index:</span>
              <span>{ receipt.id}</span>
            </div>

             <div className="flex gap-2">
              <span>Amount:</span>
              <span>{ receipt.amount}</span>
            </div>
              </div>

               {/* charge + net */}
            <div className="">
              <div className="flex gap-2">
              <span>Platform Fee:</span>
              <span>{ receipt.platformFee}</span>
            </div>

            <div className="flex gap-2">
              <span>Net Received:</span>
              <span>{ receipt.netPaid}</span>
            </div>
              </div>

{/* addresses */}
            <div className="">
              <div className="flex gap-2">
              <span>Payer:</span>
              <span className="flex gap-1.5">
                {receipt?.payer?.slice(0, 7)}...{receipt?.payer?.slice(-5)}
                <span className="cursor-pointer">
                  {copied && copiedAddress === receipt.payer ?
                  (<FaCheck className="text-green-400" />) : <GoCopy onClick={() => handleCopyAddress(receipt.payer)} />}
                </span>
              </span>
            </div>

            <div className="flex gap-2">
              <span>Company:</span>
              <span className="flex gap-1">
                {receipt?.company?.slice(0, 7)}...{receipt?.company?.slice(-5)}
                <span className="cursor-pointer">
                  {copied && copiedAddress === receipt.company?
                  (<FaCheck className="text-green-400" />) : <GoCopy onClick={() => handleCopyAddress(receipt.company)} />}
                </span>
              </span>
            </div>
            </div>


            </div>
            <div className="flex items-center justify-center gap-2">
              <span>Time:</span>
              <span>{ receipt.timestamp}</span>
            </div>
            </div>)
          ): (<div className="flex items-center justify-center text-lg">You have an Empty Ledger</div>) }
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 border-none"> <FaLeftLong/> Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
