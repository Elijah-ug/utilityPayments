import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkDataFromAcrossThunk } from "@/global/public/debug/checkDataFromAcrossThunk";
import { payUtilityThunk } from "@/global/public/payment/payUtilityThunk";
import { usePayBlocks } from "@/utils/contractConfig";
import { parseEther } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWriteContract } from "wagmi";

export function PayUtility() {
  const dispatch = useDispatch();
  const [companyAddr, setCompanyAddr] = useState("");
  const [amount, setAmount] = useState("");
  const { blockchainData } = useSelector((state) => state.payment);

  // const handlePayUtility = () => {
  //   console.log(typeof amount, amount);
  //   if (!companyAddr || !amount || isNaN(amount)) {
  //     alert("Some input missing");
  //   }
  //   const parsedAmount = parseEther(amount).toString();
  //   dispatch(payUtilityThunk({ companyAddr, amount: parsedAmount }));
  //   setCompanyAddr("");
  //   setAmount("");
  // };
  // useEffect(() => {
  //   dispatch(checkDataFromAcrossThunk({ companyAddr }))
  // }, [companyAddr]);
  const { writeContractAsync: payUtility, error: payErr, isPending: payPending } = useWriteContract();
  const handlePayUtility = async () => {
    if (!companyAddr || !amount || isNaN(amount)) {
      alert("Some input missing");
    }
    const parsedAmount = parseEther(amount).toString();
    const pay = await payUtility({
      ...usePayBlocks,
      functionName: "payUtility",
      args: [companyAddr],
      value: parsedAmount,
    });
    await waitForTransactionReceipt(config, { hash: pay });
    console.log("Paid successfully");
  };
  return (
    <Card className="w-md bg-gray-800 border-none text-gray-300 ">
      <CardHeader>
        <CardTitle>Pay for Utility Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="address">Company Address</Label>
              <Input
                value={companyAddr}
                onChange={(e) => setCompanyAddr(e.target.value)}
                id="address"
                type="text"
                placeholder="0x..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Amount</Label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                type="number"
                placeholder="0.01"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="">
        <Button onClick={handlePayUtility} type="submit" className="w-full">
          {payPending ? "Paying utility" : "Pay Utility"}
        </Button>
      </CardFooter>
    </Card>
  );
}
