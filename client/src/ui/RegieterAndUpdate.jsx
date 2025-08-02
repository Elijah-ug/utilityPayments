import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs"
import { registerCompany } from "@/global/admin/settings/registerCompanyThunk"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFees } from "@/global/admin/settings/updateFeesThunk"

export function RegisterAndEdit() {
    const dispatch = useDispatch();
    const [companyAddr, setCompanyAddr] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [utilityService, setUtilityService] = useState("");
  const [fees, setFees] = useState("");
  const { receipts } = useSelector((state) => state.receipt);

    const handleAddCompany = () => {
        if (!companyAddr || !companyName || !utilityService) {
          alert("Some input missing");
          }
        dispatch(registerCompany({ companyAddr, companyName, utilityService }));
        setCompanyAddr("");
        setCompanyName("");
        setUtilityService("");
    }
    // fees updates

        const handleUpdateFees = () => {
            let fee = parseInt(fees)
            if (isNaN(fee) || fee <= 0) {
                console.log("Little fee or isNaN");
                console.log(typeof(fee))
            }
            fee = fee.toString();
          dispatch(updateFees({ fees: fee }));
          console.log(typeof (fee), fee);
          setFees("")
        }
  return (
    <div className="flex flex-col w-full max-w-sm gap-6">
      <Tabs defaultValue="account" className="w-md ">
        <TabsList className="bg-gray-400">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="h-[50vh]">
          <Card className="bg-gray-600 border-none h-full text-white">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription  className="text-white">
               Register Utility Service Provider
              </CardDescription>
            </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
              <Label htmlFor="tabs-demo-address">Company Address</Label>
              <Input value={companyAddr} onChange={(e) => setCompanyAddr(e.target.value)}
                id="tabs-demo-address" type="text" placeholder="0x..." required />
                    </div>

              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Company Name</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                     id="tabs-demo-name" defaultValue="Pedro Duarte" />
                </div>

              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-utilityService">Utility Service</Label>
                <Input value={utilityService} onChange={(e) => setUtilityService(e.target.value)}
                id="tabs-demo-utilityService" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddCompany}>Save changes</Button>
                      </CardFooter>
       {/* update platform rate */}
          </Card>
        </TabsContent>
        <TabsContent value="password" className="h-[50vh]">
          <Card className="bg-gray-600 border-none h-full text-white">
            <CardHeader>
              <CardTitle>Rate Update</CardTitle>
              <CardDescription className="text-white">
                Updat platform rates for both companies and clients
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-fees">Change Rates</Label>
                <Input value={fees} onChange={(e) => setFees(e.target.value)}
                   id="tabs-demo-fees" type="number" placeholder="0.1" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateFees} type="submit" className="w-full">
            Update Rates
           </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
