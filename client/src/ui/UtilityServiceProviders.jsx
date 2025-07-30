import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { listedCompanies } from '@/global/public/companies/listedCompaniesThunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UtilityServiceProviders() {
  const dispatch = useDispatch();
  const { registeredCompanies } = useSelector((state) => state.listedCompanies);
  console.log(typeof(registeredCompanies))
    useEffect(() => {
        dispatch(listedCompanies());
    }, []);
  return (
    <div>
      <Card
          className="w-md bg-gray-800 border-none text-gray-300 max-h-4/5 ">
      <CardHeader>
        <CardTitle>Utility Service Providers</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[90%]">

             {registeredCompanies.length > 0 ? (
        <div className="flex flex-col gap-2  ">
          {
          registeredCompanies.map((company, index) => <div key={index}>
            <div
              className="flex flex-col gap-1 bg-gray-700 p-2 rounded transition-transform duration-300 hover:scale-103 ease-in-out">
                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Address:</span>
                      <span className="text-sm ">{company?.companyAddr?.slice(0, 7)}...{company?.companyAddr?.slice(-5)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Active Status:</span>
                      <span className="text-sm ">{company.isActive? "Active" : "Inactive"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Name:</span>
                      <span className="text-sm ">{company.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                      <span className="text-lg ">Service:</span>
                      <span className="text-sm ">{company.utilityService}</span>
              </div>
              </div>
          </div>
          )
        }</div>
      ) : (
          <p className="text-lg">No Utility Service Providers Found</p>
      )
      }
      </CardContent>
      <CardFooter className="flex-col gap-2">
            {/* <Button onClick={handle}
            type="submit" className="w-full">
            Update Rates
           </Button> */}
      </CardFooter>
    </Card>

    </div>
  )
}
