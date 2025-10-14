import { AppWindowIcon, CodeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { contractAddress } from '@/contract/address/address';
import { tokenContractConfig, wagmiContractConfig } from '@/contract/utils/contractAbs';
import { useAccount, usePublicClient, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, stringToHex } from 'viem';
import { config } from '@/contract/utils/wagmiConfig';
import { waitForTransactionReceipt } from 'viem/actions';
import { useAddTransactionMutation } from '../rtkQuery/transaction';

export const FinancialMgt = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [currentAllowance, setCurrentAllowance] = useState(0n);
  const [schoolAddr, setSchoolAddr] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [addTransaction, { isLoading, isSuccess, error }] = useAddTransactionMutation();

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...tokenContractConfig,
    functionName: 'allowance',
    args: [address, contractAddress],
  });

  const { writeContractAsync: transactionHandler, pending } = useWriteContract();
  console.log("Pending==>", pending)
  const handleFinancialMgt = async (name) => {
    console.log('name==>', name);
    try {
      if (name === 'deposit') {
        const parsedAmount = parseEther(depositAmount.toString());
        if (!depositAmount || isNaN(parseFloat(depositAmount))) {
          console.log('Invalid deposit amount');
          return;
        }

        const approveTx = await transactionHandler({
          ...tokenContractConfig,
          functionName: 'approve',
          args: [contractAddress, parsedAmount],
        });

        console.log('waiting for the tx to be approved');
        const txHash = await waitForTransactionReceipt(publicClient, { hash: approveTx });
        await refetchAllowance();
        console.log('approveTx: ==> ', txHash);
        // deposit
        const depositTx = await transactionHandler({
          ...wagmiContractConfig,
          functionName: 'clientDeposit',
          args: [parsedAmount],
        });
        setDepositAmount('');
        console.log('waiting for the deposit tx to be mined');
        const depositHash = await waitForTransactionReceipt(config, { hash: depositTx });
        await refetchAllowance();
        console.log('depositHash: ==> ', depositHash);

        return depositHash;
      } else if (name === 'withdraw') {
        const parsedWithdraw = parseEther(withdrawAmount.toString());
        if (!withdrawAmount || isNaN(parseFloat(withdrawAmount))) {
          console.log('Invalid withdrawAmount');
          return;
        }
        const withdrawTx = await transactionHandler({
          ...wagmiContractConfig,
          functionName: 'clientWithdraw',
          args: [parsedWithdraw],
        });
        const withdraw = await waitForTransactionReceipt(publicClient, { hash: withdrawTx });

        const txDetails = {
          txHash: String(withdraw.transactionHash),
          gasUsed: withdraw.gasUsed?.toString(),
          to: String(withdraw.to),
          from: String(withdraw.from),
        };

        console.log('withdrawReceipt successful:', txDetails);
        setWithdrawAmount('');
        return txDetails;
      } else if (name === 'payment') {
        // console.log('data==>', payAmount, schoolAddr, studentClass, studentName);
        const parsedTution = parseEther(payAmount.toString());
        const parsedName = stringToHex(studentName, { size: 32 });
        const parsedClass = stringToHex(studentClass, { size: 32 });

        if (
          !payAmount ||
          isNaN(parseFloat(payAmount)) ||
          !schoolAddr ||
          !studentName ||
          !studentClass
        ) {
          return console.log('some invalid input');
        }
        console.log('wait');
        const payTution = await transactionHandler({
          ...wagmiContractConfig,
          functionName: 'tutionPayment',
          args: [parsedTution, schoolAddr, parsedName, parsedClass],
          account: address,
        });

        const tutionTx = await waitForTransactionReceipt(config, { hash: payTution });
        const txHash = String(tutionTx.transactionHash);
        const gasUsed = tutionTx.gasUsed?.toString();
        const to = String(tutionTx.to);
        const from = String(tutionTx.from);

        await addTransaction({ txHash, gasUsed, to, from });
        const txDetails = { txHash, gasUsed, to, from };
        console.log('data==>', payAmount, schoolAddr, studentClass, studentName);
        setPayAmount('');
        setSchoolAddr('');
        setStudentClass('');
        setStudentName('');
        await refetchAllowance();
        console.log(' ✅ Tution Payment successful:', txDetails);

        return txDetails;
      }
    } catch (error) {
      console.log(error);
      console.error('Error ==>', error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="deposit" className="h-[360px] w-full">
        <TabsList className="bg-gray-500">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="tution-payment">Pay Tution</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="h-full">
          <Card className="bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Input
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  id="tabs-demo-deposit"
                  type="number"
                  placeholder="Enter amount"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleFinancialMgt('deposit')}
                className="bg-gray-500 hover:bg-gray-400"
              >
                Deposit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="h-full">
          <Card className="bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Input
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  id="tabs-demo-withdraw"
                  type="number"
                  placeholder="Enter amount"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleFinancialMgt('withdraw')}
                className="bg-gray-500 hover:bg-gray-400"
              >
                Withdraw
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tution-payment" className="h-full">
          <Card className="bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            {/* <CardHeader>
              <CardTitle>Pay Tution</CardTitle>
            </CardHeader> */}
            <CardContent className="grid gap-4">
              <div className="grid gap-3">
                <Input
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  id="tabs-demo-pay-tution"
                  type="number"
                  placeholder="Enter amount"
                />

                <Input
                  value={schoolAddr}
                  onChange={(e) => setSchoolAddr(e.target.value)}
                  id="tabs-demo-address"
                  type="text"
                  placeholder="Enter school wallet address"
                />

                <Input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  id="tabs-demo-name"
                  type="text"
                  placeholder="Enter student's name"
                />

                <Input
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  id="tabs-demo-class"
                  type="text"
                  placeholder="Enter student's class/level"
                />

                <Button
                  onClick={() => handleFinancialMgt('payment')}
                  className="bg-gray-500 hover:bg-gray-400"
                >
                  {pending ? 'Paying...' : 'Pay Tution'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
