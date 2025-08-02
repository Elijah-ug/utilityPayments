import { useEffect } from 'react'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyProfiles } from '@/global/company/profile/getCompanyThunk';
import { listedCompanies } from '@/global/public/companies/listedCompaniesThunk';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Receipts from './Receipts';
import { SheetShowLastTransactions } from './SheetShowLastTransactions';

export default function CompanyDashboard() {
  const { profile } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.wallet);
  const [isOpen, setIsOpen] = useState(false)

      console.log(profile);
      useEffect(() => {
        dispatch(getCompanyProfiles({ address }));
        dispatch(listedCompanies());
      }, [address]);
  const handleShowReceipts = () => {
      setIsOpen(!isOpen);
    console.log(isOpen)
  }
  return (
    <div>
      <div className="text-center mb-4">{profile?.companyAddr }</div>
      <div className="flex justify-between mx-10">
        <div className="left">
          <Profile/>
        </div>
      </div>
      <SheetShowLastTransactions/>

    </div>
  )
}
