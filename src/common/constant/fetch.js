export const API = {
  login: '/api/user/login', // 用户登录
  exportUserTemplate: '/api/user/exportUserTemplate', // 获取用户信息模板
  importUserInfo: '/api/user/importUserInfo', // 导入用户信息
  updatePassword: '/api/user/updatePassword', // 修改密码
  exportGradeExcel: '/api/course/exportGradeExcel', // 导出课程学生成绩信息
  exportStudentCourseInfo: '/api/course/exportStudentCourseInfo', // 导出选课学生名单
  teacherImportGrade: '/api/course/teacherImportGrade', // 导入课程学生成绩信息
  exportGradeTemplate: '/api/course/exportGradeTemplate', // 导出学生成绩excel模板
  updateStudentGrade: '/api/course/updateStudentGrade', // 修改学生成绩信息
  showCoursesInPage: '/api/course/showCoursesInPage', // 分页展示所有课程信息
  showSelectedCoursesInPage: '/api/course/showSelectedCoursesInPage', // 分页展示用户选择/授课的所有课程
  selectCourse: '/api/course/selectCourse', //学生选课
  createCourse: '/api/course/createCourse', // 教师开课
  exportClazzInfo: '/api/clazz/exportClazzInfo', // 导出班级学生信息
  getAllCollegeInfo: '/api/college/getAllCollegeInfo', // 分页获取所有学院信息
  getAllSpecInfo: '/api/speciality/getAllSpecInfo', // 分页获取所有专业信息
  importClazzStudents: '/api/clazz/importClazzStudents', // 导入班级学生信息
  exportClazzTemplate: '/api/clazz/exportClazzTemplate', // 导出班级学生信息模板
}

export const FetchState = {
  Init: 0,
  Pending: 1,
  Success: 2,
  Failure: 3,
}
