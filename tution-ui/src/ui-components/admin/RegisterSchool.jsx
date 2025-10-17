import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { contractAddress } from '@/contract/address/address';
import { tokenContractConfig, wagmiContractConfig } from '@/contract/utils/contractAbs';
import { config } from '@/contract/utils/wagmiConfig';
import { useEffect, useState } from 'react';
import { parseEther, stringToHex } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useAccount, usePublicClient, useReadContract, useWriteContract } from 'wagmi';
import { useAddSchoolMutation } from '../rtkQuery/school';
import { Error } from './Error';

export const RegisterSchool = () => {
  const [schoolAddr, setSchoolAddr] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [tution, setTution] = useState('');
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [newSchool, { isLoading, isSuccess, error }] = useAddSchoolMutation();

  const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS;
  const isAdmin = address?.toLowerCase() === adminAddress?.toLowerCase();
  console.log('adminAddress==>', adminAddress, isAdmin);
  const {
    writeContractAsync: schoolRegistration,
    pending,
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
        args: [schoolAddr, paddedName],
      });
      console.log('waiting for mining');
      const receipt = await waitForTransactionReceipt(publicClient, { hash: register });
      if (receipt.status === 'reverted') {
        console.log('Transaction reverted');
        // return;
      }
      // send schools to db
      await newSchool({
        school: schoolAddr,
        name: schoolName,
        isActive: false,
        isRegistered: true,
      });
      console.log('✅ Transaction confirmed && school added to db:', receipt);

      return receipt;
    } catch (error) {
      console.error('Registration error:', error, error.message);
      console.error('Registration error:', error.cause ?? error);
    }
  };
  return (
    <div className="">
      {isAdmin ? (
        <Card className="w-full max-w-sm bg-gray-600 border-none text-white">
          <CardHeader>
            <CardTitle>School registration</CardTitle>
            {isLoading && <CardAction>Adding school to db</CardAction>}
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

                <Button type="submit" className="w-full">
                  {pending ? 'Registering...' : 'Add school'}
                </Button>
              </div>
            </form>
          </CardContent>
          {/* <CardFooter className="flex-col gap-2"></CardFooter> */}
        </Card>
      ) : (
        <Error />
      )}
    </div>
  );
};
