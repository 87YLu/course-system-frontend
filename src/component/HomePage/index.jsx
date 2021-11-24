import React from 'react'
import { Layout, Menu, Card } from 'antd'
import { Link, Routes, Route } from 'react-router-dom'

const { Header, Content } = Layout

export default function Login(props) {
  return (
    <Layout>
      <Header>
        <div />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/homePage/1">1</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/homePage/2">2</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/homePage/3">3</Link>
          </Menu.Item>
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
            <Route path="1" element={<div>1</div>} />
            <Route path="2" element={<div>2</div>} />
            <Route path="3" element={<div>3</div>} />
          </Routes>
        </Card>
      </Content>
    </Layout>
  )
}
