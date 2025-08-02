import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { parseEther } from "ethers"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function PayUtility() {
    const dispatch = useDispatch();
    const [companyAddr, setCompanyAddr] = useState("");
    const [amount, setAmount] = useState("");

  const handlePayUtility = () => {
    console.log(typeof (amount), amount);
    if (!companyAddr || !amount || isNaN(amount)) {
      alert("Some input missing");
    }
    const parsedAmount = parseEther(amount)
    console.log(typeof (parsedAmount), parsedAmount);
    console.log(typeof (companyAddr), companyAddr);


    setCompanyAddr("");
    setAmount("");
    }
  return (
    <Card className="w-md bg-gray-800 border-none text-gray-300 h-4/5">
      <CardHeader>
        <CardTitle>Register Utility Service Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="address">Company Address</Label>
              <Input value={companyAddr} onChange={(e) => setCompanyAddr(e.target.value)}
                id="address" type="text" placeholder="0x..." required />
            </div>

             <div className="grid gap-2">
              <Label htmlFor="name">Amount</Label>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)}
                id="amount" type="number" placeholder="0.01" required />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="">
            <Button onClick={handlePayUtility}
            type="submit" className="w-full">
            Pay Utility
           </Button>
      </CardFooter>
    </Card>
  )
}
