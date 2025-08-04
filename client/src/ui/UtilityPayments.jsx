import React, { useEffect } from 'react'
import UtilityServiceProviders from './UtilityServiceProviders'
import { PayUtility } from './PayUtility'
import { useDispatch } from 'react-redux'
import { checkDataFromAcrossThunk } from '@/global/public/debug/checkDataFromAcrossThunk';

export default function UtilityPayments() {
  
  return (
    <div className="flex justify-between mx-6" >
      <UtilityServiceProviders />
      <PayUtility/>
    </div>
  )
}
