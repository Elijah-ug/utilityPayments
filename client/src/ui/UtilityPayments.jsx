import React from 'react'
import UtilityServiceProviders from './UtilityServiceProviders'
import { PayUtility } from './PayUtility'

export default function UtilityPayments() {
  return (
    <div className="flex justify-between mx-6" >
      <UtilityServiceProviders />
      <PayUtility/>
    </div>
  )
}
