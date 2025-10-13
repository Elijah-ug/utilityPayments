import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { contractAddress } from '@/contract/address/address';
import { tokenContractConfig, wagmiContractConfig } from '@/contract/utils/contractAbs';
import { config } from '@/contract/utils/wagmiConfig';
import { useEffect, useState } from 'react';
import { parseEther, stringToHex } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useAddSchoolMutation } from '../rtkQuery/school';

export const RegisterSchool = () => {
  const [schoolAddr, setSchoolAddr] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [tution, setTution] = useState('');
  const { address } = useAccount();

  const [newSchool, { isLoading, isSuccess, error }] = useAddSchoolMutation();
  const {
    writeContractAsync: schoolRegistration,
    error: registrationError,
    isError,
  } = useWriteContract();
  const handleRegisterSchool = async (e) => {
    e.preventDefault();
    try {
      const parsetTution = parseEther(tution.toString());
      const paddedName = stringToHex(schoolName, { size: 32 });
      const register = await schoolRegistration({
        ...wagmiContractConfig,
        functionName: 'registerSchool',
        args: [schoolAddr, paddedName, parsetTution],
      });
      console.log('waiting for mining');
      // send schools to db
      await newSchool({
        school: schoolAddr,
        name: schoolName,
        tution: tution,
        isActive: false,
        isRegistered: true,
      });
      console.log('✅ Transaction confirmed:');
      const receipt = await waitForTransactionReceipt(config, { hash: register });
      console.log('✅ Transaction confirmed:', receipt);

      return receipt;
    } catch (error) {
      console.error('Registration error:', error, error.message);
      console.error('Registration error:', error.cause ?? error);
    }
  };
  return (
    <Card className="w-full max-w-sm bg-gray-600 border-none text-white">
      <CardHeader>
        <CardTitle>School registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSchool}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                id="name"
                type="text"
                placeholder="Enter school name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                value={schoolAddr}
                onChange={(e) => setSchoolAddr(e.target.value)}
                id="address"
                type="text"
                placeholder="Enter school wallet address"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tution">Tution</Label>
              <Input
                value={tution}
                onChange={(e) => setTution(e.target.value)}
                id="tution"
                type="number"
                placeholder="Enter school tution"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add school
            </Button>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2"></CardFooter> */}
    </Card>
  );
};
