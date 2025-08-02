import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { getCompanyProfiles } from "@/global/company/profile/getCompanyThunk";
import { getReceiptThunk } from "@/global/company/public/receipt/receiptThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SheetShowLastTransactions() {
    const { profile } = useSelector((state) => state.company);
    const { address } = useSelector((state) => state.wallet);
    // console.log(address)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyProfiles({ address }));
    dispatch(getReceiptThunk());
  }, [address]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-500 ml-10 mt-2">Show Transactions</Button>
      </SheetTrigger>
      <SheetContent  className="bg-gray-700 border-none w-full sm:w-1/2 lg:w-[700px] max-w-none sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="text-white">Transactions History</SheetTitle>
          <SheetDescription className="text-white text-md">
            Payments made to {profile.companyAddr}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline" className="bg-gray-500">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
