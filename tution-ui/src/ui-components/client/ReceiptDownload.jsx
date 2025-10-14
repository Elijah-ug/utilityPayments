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
import { Receipt } from './Receipt';
import { Download } from 'lucide-react';
import { MdClose } from 'react-icons/md';

export const ReceiptDownload = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-gray-500">
            Open Dialog
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          {/* <DialogHeader> */}
            <DialogTitle>Edit profile</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription> */}
          {/* </DialogHeader> */}
          <div className="grid gap-4 p-2">
            {/* <h2>Hello there</h2> */}
            <Receipt />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <MdClose />
              {/* <Button variant="outline" className="bg-gray-600 hover:bg-gray-600 border-none">Cancel</Button> */}
            </DialogClose>
            <Download className="cursor-pointer" />
            {/* <Button type="submit" className="bg-gray-500">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
