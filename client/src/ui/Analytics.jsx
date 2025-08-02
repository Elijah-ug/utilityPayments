import { getPlatformTransactions } from '@/global/admin/dashboard/platformTransactionsThunk';
import { fetchPlatformRate } from '@/global/public/rates/platformRateThunk';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Analytics() {
  const dispatch = useDispatch();
  const { totalTransactedAmount } = useSelector((state) => state.sumTransactions);
  const { parsedplatformRate } = useSelector((state) => state.rate);
console.log("totalTransactedAmount: ", totalTransactedAmount)
  useEffect(() => {
    dispatch(getPlatformTransactions());
    dispatch(fetchPlatformRate());
  }, [])
  return (
      <div>
          <div className="flex flex-col gap-4 bg-gray-700 p-5">

        <div className="flex items-center gap-2">
          <p>Transaction rate:</p>
          <span className="text-sm text-amber-400">{ parsedplatformRate &&(parsedplatformRate + "%") }</span>
        </div>

        <div className="flex items-center gap-2">
          <p>Platform Transactions:</p>
          <span className="text-sm text-amber-400">{ totalTransactedAmount &&(totalTransactedAmount + "ETH") }</span>
        </div>
          </div>
    </div>
  )
}
