import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateFees } from "@/global/admin/settings/updateFeesThunk"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function UpdateRates() {
    const dispatch = useDispatch();
    const [fees, setFees] = useState("");

    const handleUpdateFees = () => {
        let fee = parseInt(fees)
        if (isNaN(fee) || fee <= 0) {
            console.log("Little fee or isNaN");
            console.log(typeof(fee))
        }
        fee = fee.toString();
        dispatch(updateFees({fees: fee}))
        console.log(typeof (fee), fee)
    }
  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Update Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fees">Charge Rates</Label>
              <Input value={fees} onChange={(e) => setFees(e.target.value)}
                id="fees" type="number" placeholder="1" required />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
            <Button onClick={handleUpdateFees}
            type="submit" className="w-full">
            Update Rates
           </Button>
      </CardFooter>
    </Card>
  )
}
