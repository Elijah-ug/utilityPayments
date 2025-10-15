import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";
import { wagmiContractConfig } from "@/contract/utils/contractAbs";
import { parseEther } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "@/contract/utils/wagmiConfig";

export const SchoolAccess = () => {
  const [tution, setTution]=useState("")
  // const [startDate, setStartDate]=useState("")
  //   const [endDate, setEndDate]=useState("")
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const {address} = useAccount()
  

  const {writeContractAsync, pending} = useWriteContract()
  const handleNewTermUpdate=async(e)=>{
    e.preventDefault()
    try {
      const startDate = new Date("2025-10-15");
const endDate = new Date("2025-10-16");
const parsedStartDate = Math.floor(startDate.getTime() / 1000)
const parsedEndDate = Math.floor(endDate.getTime() / 1000)
      const parsedTution = parseEther(tution.toString())
      const term = await writeContractAsync({
        ...wagmiContractConfig,
        functionName: "AcademicTermUpdate",
        args: [parsedTution, parsedStartDate, parsedEndDate]
      })
      console.log("dates==>", parsedTution, parsedStartDate, parsedEndDate)
      console.log("Tx hash==>", term)
      return term
    } catch (error) {
      console.log(error)
    }
  }

  const handleWithdraw=async()=>{
    try {
      const parsedWithdraw = parseEther(withdrawAmount.toString());
      const withdrawTx = await writeContractAsync({
                ...wagmiContractConfig,
                functionName: 'schoolWithdrawal',
                args: [parsedWithdraw],
                account: address
              });
              const withdraw = await waitForTransactionReceipt(config, { hash: withdrawTx });
              if(withdraw.status === "reverted"){
                console.log("!withdraw Failed ");
              }
      
              const txDetails = {
                txHash: String(withdraw.transactionHash),
                gasUsed: withdraw.gasUsed?.toString(),
                to: String(withdraw.to),
                from: String(withdraw.from),
              };
      
              console.log('withdrawReceipt successful:', txDetails);
              setWithdrawAmount('');
              return txDetails;
    } catch (error) {
      console.log("Error==>", error)
    }
  }

  return (
    // <div className="flex items-center justify-center">
    <div className="flex items-center justify-center w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="newterm" className="h-[360px] w-full">
        <TabsList className="bg-gray-500">
          <TabsTrigger value="newterm">New Term</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="newterm" className="h-full">
          <Card className="flex flex-col justify-between bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            {/* <CardHeader>
              <CardTitle>New Term</CardTitle>
            </CardHeader> */}
            <CardContent className=" flex-1">
              <form onSubmit={handleNewTermUpdate}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="tution">Tution</Label>
                    <Input value={tution} onChange={(e)=>setTution(e.target.value)} id="tution" type="number" placeholder="Enter school tution" required />
                  </div>

                  {/* <div className="grid gap-1">
                    <Label htmlFor="startdate">Start Date</Label>
                    <Input value={startDate} onChange={(e)=>setStartDate(e.target.value)} id="startdate" type="text" placeholder="Enter beginning of term date" required />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="enddate">End Date</Label>
                    <Input value={endDate} onChange={(e)=>setEndDate(e.target.value)} id="enddate" type="text" placeholder="Enter end of term date" required />
                  </div> */}
                  <Button type="submit"  className="bg-gray-500 hover:bg-gray-400">Deposit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="h-full">
          <Card className="flex flex-col justify-between bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 flex-1">
              <div className="grid gap-3">
                <Input value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)} id="tabs-demo-withdraw" type="number" placeholder="Enter amount" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleWithdraw} className="bg-gray-500 hover:bg-gray-400 w-full">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
    // </div>
  );
};
