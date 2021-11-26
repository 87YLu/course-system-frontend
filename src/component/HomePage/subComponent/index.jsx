import Course from './Course'
import User from './User'

const homePageRouter = [
  {
    path: 'course/*',
    linkTo: 'course/all',
    key: 'course',
    name: '课程',
    element: <Course />,
  },
  {
    path: 'user/*',
    linkTo: 'user/psw',
    key: 'user',
    name: '用户',
    element: <User />,
  },
]

export default homePageRouter
