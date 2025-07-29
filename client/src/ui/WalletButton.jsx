import { Button } from '@/components/ui/button';
import { connectWallet } from '@/global/auth/walletThunk';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function WalletButton() {
  const { address, loading, error, chainId } = useSelector((state) => state.wallet);
  const dispatch = useDispatch()
  // console.log(chainId)

  return (
      <div>
      <Button onClick={() => dispatch(connectWallet())}
        className="bg-gray-700 px-4 py-2 hover:bg-gray-600">
        {loading ? "Loading..." : address ? `${address?.slice(0, 7)}...${address?.slice(-5)}`: "Connect Wallet"
            }
      </Button>
    </div>
  )
}
