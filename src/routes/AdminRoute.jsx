import { Navigate } from 'react-router'
import LoadingSpinner from '../pages/LoadingSpinner'
import useRole from '../pages/hooks/useRole'



const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute