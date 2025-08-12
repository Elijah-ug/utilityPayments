import { useEffect } from 'react'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyProfiles } from '@/global/company/profile/getCompanyThunk';
import { listedCompanies } from '@/global/public/companies/listedCompaniesThunk';
import { useState } from 'react';
import { SheetShowLastTransactions } from './SheetShowLastTransactions';
import { getCompanyReceiptThunk } from '@/global/company/public/receipts/companyReceiptsThunk';

export default function CompanyDashboard() {
  const { profile } = useSelector((state) => state.company);
  const { address } = useSelector((state) => state.wallet);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
        dispatch(getCompanyProfiles({ address }));
        dispatch(listedCompanies());
    dispatch(getCompanyReceiptThunk());
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
