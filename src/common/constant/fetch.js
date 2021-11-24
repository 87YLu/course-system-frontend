export const API = {
  user: {
    login: '/api/user/login', // 用户登录
    exportUserTemplate: '/api/user/exportUserTemplate', // 获取用户信息模板
    importUserInfo: '/api/user/importUserInfo', // 导入用户信息
    updatePassword: '/api/user/updatePassword', // 修改密码
  },
  course: {
    exportClazzInfo: '/api/clazz/exportClazzInfo', // 导出班级学生信息
    getAllCollegeInfo: '/api/college/getAllCollegeInfo', // 分页获取所有学院信息
    getAllSpecInfo: '/api/speciality/getAllSpecInfo', // 分页获取所有专业信息
    importClazzStudents: '/api/clazz/importClazzStudents', // 导入班级学生信息
    exportClazzTemplate: '/api/clazz/exportClazzTemplate', // 导出班级学生信息模板
  },
}

export const FetchState = {
  Init: 0,
  Pending: 1,
  Success: 2,
  Failure: 3,
}
