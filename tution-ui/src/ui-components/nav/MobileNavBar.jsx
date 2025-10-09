import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const MobileNavBar = () => {
  return (
    <div className="sm:hidden flex items-center justify-between p-3">
      <Sheet className="bg-gray-600">
        <SheetTrigger asChild>
          {/* <Button >Open</Button> */}
          <FaBars variant="outline" className="text-2xl" />
        </SheetTrigger>
        <SheetContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="left"
          className="bg-gray-800 text-white overflow-y-auto max-h-screen  "
        >
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <SheetDescription>TutionBlocks</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col ml-10 gap-8 mt-4 text-md pb-5 ">
            <NavLink to="/">
              <SheetClose replace asChild>
                <span>Home</span>
              </SheetClose>
            </NavLink>

            <NavLink to="school">
              <SheetClose replace asChild>
                <span>School Dashboard</span>
              </SheetClose>
            </NavLink>

            <NavLink to="client">
              <SheetClose asChild>
                <span> Client Dashboard</span>
              </SheetClose>
            </NavLink>

            <NavLink to="client">
              <SheetClose asChild>
                <span> Admin Dashboard</span>
              </SheetClose>
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>

      <div className="">
        <ConnectButton />
      </div>
    </div>
  );
};
