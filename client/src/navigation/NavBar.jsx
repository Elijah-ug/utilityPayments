import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
      <div className="flex gap-10 px-10 py-4 bg-gray-900">
          <NavLink to="/">Home</NavLink>
          <NavLink to="utility-payments">Home</NavLink>
          <NavLink to="admin">Admin Dashboard</NavLink>
          <NavLink to="company-dashboard">Company Dashboard</NavLink>
    </div>
  )
}
