import Course from './Course'

const homePageRouter = [
  {
    path: 'course/*',
    linkTo: 'course/all',
    key: 'course',
    name: '课程信息',
    element: <Course />,
  },
]

export default homePageRouter
