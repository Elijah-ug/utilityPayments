import { getPlatformTransactions } from '@/global/admin/dashboard/platformTransactionsThunk';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Analytics() {
  const dispatch = useDispatch();
  const { totalTransactedAmount } = useSelector((state) => state.sumTransactions);
console.log("totalTransactedAmount: ", totalTransactedAmount)
  useEffect(() => {
    dispatch(getPlatformTransactions());
  }, [])
  return (
      <div>
          <div className="flex flex-col">
              <h3 className="tex-lg">Rates</h3>
              <p>Withdraw rate:</p>
        <p>Transaction rate:</p>
        <p>Platform Transactions: {totalTransactedAmount }</p>
          </div>
    </div>
  )
}
