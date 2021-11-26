import React, { Fragment } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default function StudentMenuItems() {
  return (
    <Fragment>
      <Menu.Item key="psw">
        <Link to="/homePage/user/psw">修改密码</Link>
      </Menu.Item>
    </Fragment>
  )
}
