import { registerCompany } from '@/global/admin/settings/registerCompanyThunk';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RegisterCompany } from './RegisterCompany';
import Analytics from './Analytics';
import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerCompany())
  }, [])
  return (
    <div>
      <div className="  flex justify-between mx-10 ">
        <div className="">
          {/* <RegisterCompany/> */}
          <div className="flex justify-center items-center py-3 gap-5 text-amber-400">
            <Link to="register-company">Add Company</Link>
             <Link to="update-fees">Update Rates</Link>
          </div>
          <Outlet/>
        </div>
        <div className="">
          <Analytics/>
        </div>
      </div>
    </div>
  )
}
