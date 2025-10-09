import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SchoolAccess = () => {
  return (
    // <div className="flex items-center justify-center">
    <div className="flex items-center justify-center w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="newterm" className="h-[360px] w-full">
        <TabsList className="bg-gray-500">
          <TabsTrigger value="newterm">New Term</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="newterm" className="h-full">
          <Card className="flex flex-col justify-between bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            {/* <CardHeader>
              <CardTitle>New Term</CardTitle>
            </CardHeader> */}
            <CardContent className=" flex-1">
              <form>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="tution">Tution</Label>
                    <Input id="tution" type="number" placeholder="Enter school tution" required />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="startdate">Start Date</Label>
                    <Input id="startdate" type="text" placeholder="Enter beginning of term date" required />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="enddate">End Date</Label>
                    <Input id="enddate" type="text" placeholder="Enter end of term date" required />
                  </div>
                  <Button className="bg-gray-500 hover:bg-gray-400">Deposit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="h-full">
          <Card className="flex flex-col justify-between bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white h-full">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 flex-1">
              <div className="grid gap-3">
                <Input id="tabs-demo-withdraw" type="number" placeholder="Enter amount" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gray-500 hover:bg-gray-400 w-full">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    // </div>
  );
};
