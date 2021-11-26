import React from 'react'
import { Layout, Menu, Card, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useGetUser } from '@hooks'
import { roleEnum, getLocationPath } from '@common/utils'
import homePageRouter from './subComponent'
import './index.less'

const { Header, Content } = Layout
const { confirm } = Modal

export default function HomePage() {
  const user = useGetUser()
  const navigate = useNavigate()

  window.onbeforeunload = () => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定退出登录？',
      onOk() {
        navigate('/')
      },
    })
  }

  return (
    <Layout style={{ minWidth: '800px', minHeight: '600px'}}>
      <Header>
        <div className="logo">
          <div>选课系统</div>
          <div>3119005225</div>
        </div>

        <Menu
          className="top-menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={getLocationPath(2)}
          style={{ width: 'auto' }}
        >
          {homePageRouter.map(component => {
            const { linkTo, key, name } = component
            return (
              <Menu.Item key={key}>
                <Link to={`/homePage/${linkTo}`}>{name}</Link>
              </Menu.Item>
            )
          })}
        </Menu>

        <div className="user-msg">
          <div>{roleEnum[user.role]}</div>
          <div>{user.name}</div>
          <Button danger type="text" style={{ padding: 0 }} onClick={showConfirm}>
            退出登录
          </Button>
        </div>
      </Header>

      <Content
        style={{
          height: 'calc(100vh - 67px)',
        }}
      >
        <Card
          style={{
            height: 'calc(100% - 40px)',
            overflow: 'auto',
            margin: '20px 20px 0',
          }}
          bodyStyle={{
            height: '100%',
            width: '100%',
          }}
          bordered={false}
        >
          <Routes>
            {homePageRouter.map(component => {
              const { path, key, element } = component
              return <Route path={path} key={key} element={element} />
            })}
          </Routes>
        </Card>
      </Content>
    </Layout>
  )
}
