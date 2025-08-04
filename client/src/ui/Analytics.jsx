import { getPlatformCharges } from '@/global/admin/dashboard/platformChargesThunk';
import { getPlatformTransactions } from '@/global/public/platformTransactions/platformTransactionsThunk';
import { fetchPlatformRate } from '@/global/public/rates/platformRateThunk';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Analytics() {
  const dispatch = useDispatch();
  const { parsedplatformRate } = useSelector((state) => state.rate);
  const { totalCharges } = useSelector((state) => state.charges);
  const { totalTransactedAmount } = useSelector((state) => state.transactions);
  console.log("totalTransactedAmount: ", totalTransactedAmount);
  useEffect(() => {
    dispatch(getPlatformTransactions());
    dispatch(fetchPlatformRate());
    dispatch(getPlatformCharges());
  }, [])
  return (
      <div>
          <div className="flex flex-col gap-4 bg-gray-700 p-5">

        <div className="flex items-center gap-2">
          <p>Transaction rate:</p>
          <span className="text-sm text-amber-400">{ parsedplatformRate &&(parsedplatformRate + "%") }</span>
        </div>

        <div className="flex items-center gap-2">
          <p>Platform Collections:</p>
          <span className="text-sm text-amber-400">{ totalCharges &&(totalCharges + "ETH") }</span>
        </div>
          </div>
    </div>
  )
}
