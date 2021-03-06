import React, { useState, Fragment } from 'react'
import { Menu } from 'antd'
import { Link, Routes, Route } from 'react-router-dom'
import { getLocationPath } from '@utils'
import College from './College'
import Speciality from './Speciality'
import Class from './Class'

export default function Message() {
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
        <Menu.Item key="college">
          <Link to="/homePage/message/college">学院</Link>
        </Menu.Item>
        <Menu.Item key="speciality">
          <Link to="/homePage/message/speciality">专业</Link>
        </Menu.Item>
        <Menu.Item key="class">
          <Link to="/homePage/message/class">班级</Link>
        </Menu.Item>
      </Menu>

      <Routes>
        <Route path="college" key="college" element={<College />} />
        <Route path="speciality" key="speciality" element={<Speciality />} />
        <Route path="class" key="class" element={<Class />} />
      </Routes>
    </Fragment>
  )
}
