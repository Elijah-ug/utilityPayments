import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerCompany } from "@/global/admin/settings/registerCompanyThunk"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function RegisterCompany() {
    const dispatch = useDispatch();
    const [companyAddr, setCompanyAddr] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [utilityService, setUtilityService] = useState("");

    const handleAddCompany = () => {
        dispatch(registerCompany({companyAddr, companyName, utilityService }));
    }
  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Register Utility Service Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="address">Company Address</Label>
              <Input value={companyAddr} onChange={(e) => setCompanyAddr(e.target.value)}
                id="address" type="text" placeholder="0x..." required />
            </div>

             <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                id="name" type="text" placeholder="MTN Worknet" required />
            </div>

              <div className="grid gap-2">
              <Label htmlFor="utility">Utility Service</Label>
              <Input value={utilityService} onChange={(e) => setUtilityService(e.target.value)}
                id="utility" type="text" placeholder="Internet" required />
                      </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
            <Button onClick={handleAddCompany}
            type="submit" className="w-full">
            Add Company
           </Button>
      </CardFooter>
    </Card>
  )
}
