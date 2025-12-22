import React from 'react';


import { Navigate } from 'react-router'
import useRole from '../pages/hooks/useRole';
import LoadingSpinner from '../pages/LoadingSpinner';

const StaffRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'staff') return children
  return <Navigate to='/' replace="true" />
}

export default StaffRoute;
