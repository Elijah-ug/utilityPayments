import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Summary = () => {
  return (
    <div className="py-5  flex items-center justify-center  backdrop-blur-sm ">
      <div className="grid sm:grid-cols-3 gap-17 w-full">
        <Card className="w-full max-w-xl bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
          <CardHeader>
            <CardTitle>Problem Being Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>Unreliable bank payments with limited working hours and delays.</p>
              <p>Lengthy payment process requiring KYC and active bank accounts.</p>
              <p>High transaction fees during tuition payments.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
          <CardHeader>
            <CardTitle>Solution To The Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>Automated on-chain tuition payments available 24/7.</p>
              <p>Simple wallet-based process — no banks or paperwork.</p>
              <p>Low-cost transactions with instant digital receipts.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
          <CardHeader>
            <CardTitle>Challenges </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>Low blockchain literacy among users and institutions.</p>
              <p>Limited internet access in some regions affects adoption.</p>
              <p>Regulatory uncertainty around digital payment systems.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
