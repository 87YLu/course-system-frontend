import Login from './Login'
import HomePage from './HomePage'

const componentRouter = [
  {
    path: '/',
    key: '/',
    exact: true,
    element: <Login />,
  },
  {
    path: '/homePage/*',
    key: '/homePage',
    exact: false,
    element: <HomePage />,
  },
]

export default componentRouter
