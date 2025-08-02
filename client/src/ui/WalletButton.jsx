import { Button } from '@/components/ui/button';
import { connectWallet } from '@/global/auth/walletThunk';
import { Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function WalletButton() {
  const { address, loading, error, chainId } = useSelector((state) => state.wallet);
  const dispatch = useDispatch()
  const [copied, setCopied] = useState(false)
  const handeConnectWallet = () => {
    if (!address) {
      dispatch(connectWallet())
    } else {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
      <div className="flex gap-1 items-center transition-all duration-300">
  <Button
    onClick={handeConnectWallet}
    className="bg-gray-700 px-4 py-2 hover:bg-gray-600 flex items-center gap-2"
  >
        {loading ? "Loading..." : address ? `${address?.slice(0, 7)}...${address?.slice(-5)}`
          : "Connect Wallet"}
    {address && (
      <>
        <Copy className="w-4 h-4" />
        <span className={`text-xs transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
          Copied!
        </span>
      </>
    )}
  </Button>
</div>

  )
}
