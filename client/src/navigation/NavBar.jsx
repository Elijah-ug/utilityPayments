import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import WalletButton from '@/ui/WalletButton'

export default function NavBar() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center px-10">
        <div className="flex gap-10 py-6 bg-gray-900 text-gray-300">
          <NavLink className="hover:underline" to="/">Home</NavLink>
          <NavLink className="hover:underline" to="utility-payments">Service Providers</NavLink>
          <NavLink className="hover:underline" to="admin">Admin Dashboard</NavLink>
          <NavLink className="hover:underline" to="company-dashboard">Company Dashboard</NavLink>
        </div>
        <div className="btn">
          <WalletButton/>
        </div>
      </div>
      <hr className="text-gray-700" />
      </div>
  )
}
