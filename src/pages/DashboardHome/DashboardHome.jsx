import React from 'react';
import useRole from '../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome ';
import StaffDashboardHome from './StaffDashboardHome';
import UserDashboardHomo from './UserDashboardHomo';
import LoadingSpinner from '../LoadingSpinner';





const DashboardHome = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      {role === 'user' && <UserDashboardHomo/>}
      {role === 'staff' && <StaffDashboardHome/>}
      {role === 'admin' && <AdminDashboardHome/>}
    </div>
  )
}

export default  DashboardHome ;



