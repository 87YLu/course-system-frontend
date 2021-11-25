import { useSelector } from 'react-redux'

export const useGetUser = () => {
  const user = useSelector(state => state.user.data)

  if (Object.keys(user).length === 0) {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  return user
}
