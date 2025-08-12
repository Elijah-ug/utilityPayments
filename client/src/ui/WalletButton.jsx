import { Button } from '@/components/ui/button';
import { connectWallet } from '@/global/auth/walletThunk';
import { Copy, Ticket } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6';
import { GoCopy } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux'

export default function WalletButton() {
  const { address, loading, error, chainId } = useSelector((state) => state.wallet);
  const dispatch = useDispatch()
  const [copied, setCopied] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const handeConnectWallet = () => {
    if (!address) {
      dispatch(connectWallet());
      setConnecting(true);
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
        {loading && connecting ? "Loading..." : address ? `${address?.slice(0, 7)}...${address?.slice(-5)}`
          : "Connect Wallet"}
    {address && (
      <>
            {copied ?
               ( <span className={`font-light transition-opacity duration-300 opacity-100 text-green-400 `}>
          <FaCheck/>
        </span>):
              (<GoCopy className="w-4 h-4" />)}

      </>
    )}
  </Button>
</div>

  )
}
