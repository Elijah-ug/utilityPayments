import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { listedCompanies } from '@/global/public/companies/listedCompaniesThunk';
import { getReceiptThunk } from '@/global/public/user/receiptThunk';
import { getAddress } from 'ethers';
import { Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export default function UtilityServiceProviders() {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState("")
  const { registeredCompanies } = useSelector((state) => state.listedCompanies);
  const { address } = useSelector((state) => state.wallet);


    useEffect(() => {
      dispatch(listedCompanies());
      if (address) {
        dispatch(getReceiptThunk( { address} ));
      }

    }, [address]);
  const handleCopyAddress = (companyAddress) => {
    setCopiedAddress(companyAddress)
    navigator.clipboard.writeText(companyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <Card
          className="w-md bg-gray-800 border-none text-gray-300 h-6/7 ">
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
                <div className='flex items-center gap-1'>
                  <span className="text-sm ">{company?.companyAddr?.slice(0, 7)}...{company?.companyAddr?.slice(-5)}</span>
                  <Button onClick={() => handleCopyAddress(company.companyAddr)}
                    className="bg-gray-600 hover:bg-gray-600" >

                    {copiedAddress === company.companyAddr && copied ?
                      (<FaCheck className="text-green-400 text-sm font-extralight" />) : (<Copy />)}
                   </Button>
                  </div>
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

      </CardFooter>
    </Card>

    </div>
  )
}
