/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment } from 'react'
import { Menu } from 'antd'
import { Routes } from 'react-router-dom'
import { useGetUser } from '@hooks'
import { roleEnum, getLocationPath } from '@utils'
import StudentMenuItems from './StudentMenuItems'
import StudentRoutes from './StudentRoutes'
import TeacherMenuItems from './TeacherMenuItems'
import TeacherRoutes from './TeacherRoutes'

export default function Course() {
  const { role } = useGetUser()
  const [currentMenu, setCurrentMenu] = useState(getLocationPath(3))

  const changeMenu = e => {
    setCurrentMenu(e.key)
  }

  return (
    <Fragment>
      <Menu
        mode="horizontal"
        onClick={changeMenu}
        selectedKeys={[currentMenu]}
        className="three-level-routing-menu"
      >
        {roleEnum[role] === '学生' && StudentMenuItems()}
        {roleEnum[role] === '老师' && TeacherMenuItems()}
      </Menu>

      <Routes>
        {roleEnum[role] === '学生' && StudentRoutes()}
        {roleEnum[role] === '老师' && TeacherRoutes()}
      </Routes>
    </Fragment>
  )
}
