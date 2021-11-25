import React from 'react'
import { Layout, Menu, Card } from 'antd'
import { Link, Routes, Route } from 'react-router-dom'
import { useGetUser } from '@hooks'
import homePageRouter from './subComponent'

const { Header, Content } = Layout

export default function HomePage() {
  const user = useGetUser()
  window.onbeforeunload = () => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <Layout>
      <Header>
        <div />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys="course">
          {homePageRouter.map(component => {
            const { path, key, name } = component
            return (
              <Menu.Item key={key}>
                <Link to={`/homePage/${path}`}>{name}</Link>
              </Menu.Item>
            )
          })}
        </Menu>
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
