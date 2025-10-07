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

export const RegisterSchool = () => {
    const {writeContractAsync: register, pending: registerPending} = useWriteContract()
  return (
    <Card className="w-full max-w-sm bg-gray-600 border-none text-white">
      <CardHeader>
        <CardTitle>School registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Enter school name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Wallet Address</Label>
              <Input id="address" type="text" placeholder="Enter school wallet address" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tution">Tution</Label>
              <Input id="tution" type="number" placeholder="Enter school tution" required />
            </div>
           
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full">
          Add school
        </Button>
       
      </CardFooter>
    </Card>
  );
};
