import React from 'react'
import { Layout, Menu, Card } from 'antd'
import { Link, Routes, Route } from 'react-router-dom'
import homePageRouter from './subComponent'

const { Header, Content } = Layout

export default function HomePage() {
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
          maxHeight: 'calc(100vh - 67px)',
          overflow: 'auto',
        }}
      >
        <Card
          style={{
            minHeight: 'calc(100% - 40px)',
            margin: '20px 20px 0',
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
