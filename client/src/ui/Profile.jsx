import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getCompanyProfiles } from '@/global/company/profile/getCompanyThunk'
import { getCompanyBalance } from '@/global/company/public/balance/companyBalancesThunk'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {
    const dispatch = useDispatch();
    const { address } = useSelector((state) => state.wallet);
    const { profile } = useSelector((state) => state.company);
    const {balance} = useSelector((state) => state.companyBalance)

    console.log(profile);
    useEffect(() => {
        dispatch(getCompanyProfiles({ address }));
        dispatch(getCompanyBalance({ address }));
    }, [address]);
  return (
      <Card
          className="w-md bg-gray-800 border-none text-gray-300 transition-transform duration-300 hover:scale-105 ease-in-out hover:shadow-2xl">
      <CardHeader>
        <CardTitle>Utility Company's Profile</CardTitle>
      </CardHeader>
      <CardContent>

              { profile &&(
                  <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Address:</span>
                      <span className="text-sm ">{profile?.companyAddr?.slice(0, 7)}...{profile?.companyAddr?.slice(-5)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Balance:</span>
                      <span className="text-sm ">{`${balance} ETH` }</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Active Status:</span>
                      <span className="text-sm ">{profile.isActive? "Active" : "Inactive"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Name:</span>
                      <span className="text-sm ">{profile.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Service:</span>
                      <span className="text-sm ">{profile.utilityService}</span>
                  </div>

              </div>)
}
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
            <Button onClick={handleUpdateFees}
            type="submit" className="w-full">
            Update Rates
           </Button>
      </CardFooter> */}
    </Card>
  )
}
