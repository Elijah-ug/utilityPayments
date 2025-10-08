import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FinancialMgt = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 ">
      <Tabs defaultValue="deposit">
        <TabsList className="bg-gray-500">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <Card className="bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Input id="tabs-demo-deposit" type="number" placeholder="Enter amount" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gray-500 hover:bg-gray-400">Deposit</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card className="bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Input id="tabs-demo-withdraw" type="number" placeholder="Enter amount" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gray-500 hover:bg-gray-400">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
