



import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: userData, isLoading: isRoleLoading, isError } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/users/role/${user?.email}`)
        return data
      } catch (err) {
        console.error("Error fetching role:", err)
     
        return { role: 'user', subscription: 'free' }
      }
    },
  })

  const role = userData?.role || 'user'
  const subscription = userData?.
subscription || 'free'
  console.log(userData?.subscription)

  return [role, isRoleLoading, subscription, isError]
}

export default useRole


