import Course from './Course'
import User from './User'
import Message from './Message'
import { roleEnum } from '@utils'

const homePageRouter = {
  [roleEnum['学生']]: [
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
  ],
  [roleEnum['老师']]: [
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
    {
      path: 'message/*',
      linkTo: 'message/college',
      key: 'message',
      name: '信息',
      element: <Message />,
    },
  ],
}

export default homePageRouter
