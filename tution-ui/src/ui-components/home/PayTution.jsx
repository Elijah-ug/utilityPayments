import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract } from "wagmi";

export const PayTution = () => {
  const { writeContractAsync: register, pending: registerPending } = useWriteContract();
  return (
    <Card className="w-full max-w-sm bg-gray-600 border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[450px]">
      <CardHeader>
        <CardTitle>Tution Payment</CardTitle>
      </CardHeader>
       
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="Enter amount" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Wallet Address</Label>
              <Input id="address" type="text" placeholder="Enter school wallet address" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" type="text" placeholder="Enter student's name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Input id="class" type="text" placeholder="Enter student's class" required />
            </div>

            <div className="grid gap-2">
              <Button type="submit" className="w-full">
                Pay Tution
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
