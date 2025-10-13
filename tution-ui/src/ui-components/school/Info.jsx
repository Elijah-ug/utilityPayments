import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import { formatEther, hexToString } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { useUpdateSchoolMutation } from '../rtkQuery/school';
import { useEffect } from 'react';

export const Info = () => {
  const { address } = useAccount();
  const [newSchool, { isLoading, isSuccess, error: updateError }] = useUpdateSchoolMutation();
  const {
    data: school,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getSchoolInfo',
    args: [address],
    account: address,
  });
  useEffect(() => {
    const updateSchool = async () => {
      return await newSchool({
        name: hexToString(school.name),
        tution: formatEther(school.tution),
        school: school.school,
        isRegistered: school.isRegistered,
        isActive: school.isActive,
        schoolId: school.schoolId,
      });
    };
    updateSchool();
  }, [school]);
  // console.log("tution==>", formatEther(school?.tution));
  return (
    <div className="flex items-center justify-center w-full max-w-sm">
      <Card className="w-full bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[360px]">
        <CardHeader>
          <CardTitle>School Profile For Address </CardTitle>
        </CardHeader>
        <CardDescription className="px-2 text-amber-400">
          <CardTitle>
            {school && `${school?.school.slice(0, 7)}...${school?.school.slice(-5)}`}
          </CardTitle>
        </CardDescription>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span>Name:</span>
                <span>{school && hexToString(school.name)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Activated:</span>
                <span>{school?.isActive ? '✅' : ''}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span>{school && `${formatEther(school.balance)} AFB`}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Tution Fee:</span>
                <span>{school && `${formatEther(school.tution)} AFB`}</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
