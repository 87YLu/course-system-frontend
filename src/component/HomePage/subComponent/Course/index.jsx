/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Menu } from 'antd'
import { useGetUser } from '@hooks'
import { roleEnum } from '@common/utils'
import AllCourse from './AllCourse'
import MyCourse from './MyCourse'
import './index.less'

export default function Course() {
  const { role } = useGetUser()

  const [currentMenu, setCurrentMenu] = useState('all')
  const changeMenu = e => {
    setCurrentMenu(e.key)
  }

  return (
    <div className="course">
      <Menu mode="horizontal" onClick={changeMenu} selectedKeys={[currentMenu]}>
        <Menu.Item key="all">全部课程</Menu.Item>
        <Menu.Item key="my">我的{roleEnum[role] === '学生' ? '选' : '授'}课</Menu.Item>
      </Menu>

      <div className="course-content">{currentMenu === 'all' ? <AllCourse /> : <MyCourse />}</div>
    </div>
  )
}
