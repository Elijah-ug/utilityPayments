import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";

export const Receipt = () => {
  return (
    <div>
      <Card className="w-full max-w-lg bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
        <CardHeader>
          <CardTitle>Client Receipt </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 relative">
            <div className="flex items-center gap-2">
              <span>Payer Address:</span>
              <span>0x28Aa0...A0220</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Receiver Address:</span>
              <span>0x28Aa0...A0220</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Student Name:</span>
              <span>Mugisha Elijah</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Download your receipt here</span>
              <Download className="cursor-pointer" />
            </div>

            {/* <div className="flex items-center gap-2">
                <span>Class:</span>
                <span>S.6 S</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Amount:</span>
                <span>1.3 AFB</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span>1.7 AFB</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Tution Fee:</span>
                <span>3 AFB</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Paid At:</span>
                <span>5/11/2025</span>
              </div>

              <div className="flex items-center gap-2 relative top-3">
                <span>Not Cleared:</span>
              </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
