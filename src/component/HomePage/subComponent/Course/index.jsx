/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment } from 'react'
import { Menu } from 'antd'
import { Link, Routes, Route } from 'react-router-dom'
import { useGetUser } from '@hooks'
import { roleEnum, getLocationPath } from '@utils'
import AllCourse from './AllCourse'
import MyCourse from './MyCourse'

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
        <Menu.Item key="all">
          <Link to="/homePage/course/all">全部课程</Link>
        </Menu.Item>
        <Menu.Item key="my">
          <Link to="/homePage/course/my">我的{roleEnum[role] === '学生' ? '选' : '授'}课</Link>
        </Menu.Item>
      </Menu>

      <Routes>
        <Route path="all" key="all" element={<AllCourse />} />
        <Route path="my" key="my" element={<MyCourse />} />
      </Routes>
    </Fragment>
  )
}
