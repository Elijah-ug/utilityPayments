import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReceiptPDF from './ReceiptPDF';
import { Download } from 'lucide-react';
import { MdClose } from 'react-icons/md';
import { useAccount, useReadContract } from 'wagmi';
import { wagmiContractConfig } from '@/contract/utils/contractAbs';
import { hexToString } from 'viem';
import { ReceiptView } from './ReceiptView';
import { useMemo } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

export const ReceiptDownload = () => {
  const { address } = useAccount();
  const {
    data: receipt,
    isPending,
    error,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getReceipt',
    args: [address],
  });
  const time = new Date(Number(receipt?.time) * 1000);
  const date = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // console.log("isPending==>", receipt)

  console.log('date==>', date);

  const memoizedDoc = useMemo(
    () => <ReceiptPDF receipt={receipt} date={date} isPending={isPending} />,
    [receipt, date, isPending]
  );
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {receipt?.payer.toLowerCase() === address?.toLowerCase() && (
            <Button variant="outline" className="bg-gray-500">
              Open Receipt
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          <DialogTitle>Edit profile</DialogTitle>

          <div className="grid gap-4 p-2">
            <ReceiptView
              receipt={receipt}
              date={date}
              hexToString={hexToString}
              isPending={isPending}
            />
          </div>
          <DialogFooter className="flex items-center gap-10 ">
            <DialogClose asChild>
              <MdClose />
            </DialogClose>
            {receipt?.payer.toLowerCase() === address?.toLowerCase() && <ReceiptPDF />}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
