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

export const Demo = () => {
  const { writeContractAsync: register, pending: registerPending } = useWriteContract();
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-4xl bg-gray-600 border-gray-200/40 shadow-sm shadow-gray-500 text-white">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p> Schools are registered by providing their wallet address and school name.
                Registered schools take the responsibility to set the tution fee, start and end dates of the term. A registered school also has the ability to deactivate it's services on the platform
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                Parents/Students don't need to do much other than depositing to the platform to be able to pay tution to a specific school. During payment, they provide School Address, student's Name, Student's Class and Amount to be paid. All this is recorded on-chain for integrity and transparency
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                All transactions done at the platform are found at the Transactions Dane page of this site which also link to basescan 
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
