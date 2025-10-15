import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { wagmiContractConfig } from "@/contract/utils/contractAbs";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

export const ClientInfo = () => {
  const { address } = useAccount();
  const {
    data: client,
    isPending,
    isError,
    error,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getClient",
    args: [],
    account: address,
  });
  console.log("Client/Student==>", client, isPending, isError, error);
  return (
    <div className="flex items-center justify-center w-full max-w-sm">
      <Card className="w-full bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[360px]">
        <CardHeader>
          <CardTitle>Client Profile </CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span>Address:</span>
                <span>{`${client?.client.slice(0, 7)}...${client?.client.slice(-5)}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span>{client && `${formatEther(client.balance)} AFB`}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Current Term Payments:</span>
                <span>{client && `${formatEther(client.termPayments)} AFB`}</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
