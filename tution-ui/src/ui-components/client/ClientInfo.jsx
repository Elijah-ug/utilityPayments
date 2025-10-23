import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import { formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export const ClientInfo = () => {
  const { address } = useAccount();
  const {
    data: client,
    isPending,
    isError,
    error,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getClient',
    args: [],
    account: address,
  });

  const {
    data: autoClient,
    isPending: autoPending,
    error: autoError,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getAutoPayer',
    args: [],
    account: address,
  });
  console.log('Pending Auto==>', autoPending);

  console.log('Client/Student==>', autoClient);
  const isSutoClient = autoClient?.client?.toLowerCase() === address?.toLowerCase();
  return (
    <div className="flex items-center justify-center w-full max-w-sm">
      {isPending || autoPending ? (
        <div className=""></div>
      ) : client || autoClient ? (
        <Card className="w-full bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[360px]">
          <CardHeader>
            <CardTitle>Client Profile </CardTitle>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {autoClient.client.toLowerCase() === address.toLowerCase() ? (
                  <div className="flex items-center gap-2">
                    <span>Auto Address:</span>
                    <span>{`${autoClient?.client.slice(0, 7)}...${autoClient?.client.slice(-5)}`}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Address:</span>
                    <span>{`${client?.client.slice(0, 7)}...${client?.client.slice(-5)}`}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span>Balance:</span>
                  <span>
                    {isSutoClient
                      ? `${formatEther(autoClient.balance)} AFB`
                      : `${formatEther(client.balance)} AFB`}
                  </span>
                </div>

                {!isSutoClient && (
                  <div className="flex items-center gap-2">
                    <span>Current Term Payments:</span>
                    <span>{`${formatEther(client.termPayments)} AFB`}</span>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="">Not A client</div>
      )}
    </div>
  );
};
