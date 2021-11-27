/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useFetch } from '@hooks'
import { API, FetchState } from '@constant'
import { useNavigate } from 'react-router-dom'
import logoData from '@static/logoData'
import './index.less'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}
export default function Login() {
  const navigate = useNavigate()

  const [loginFetchState, makeLoginRequest] = useFetch({
    name: 'user',
    url: API.login,
    method: 'post',
  })

  useEffect(() => {
    if (loginFetchState.fetchState === FetchState.Success) {
      navigate('/homePage/course/all')
      message.success('登录成功')
    }
  }, [loginFetchState])

  useEffect(() => {
    document.querySelector('.login-page .msg').innerHTML = logoData
  }, [])

  const login = values => {
    makeLoginRequest({ data: values })
  }

  return (
    <div className="login-page">
      <div className="main">
        <div className="left">
          <div className="big-title">Welcome!</div>
          <div className="small-title">选 课 系 统</div>
          <div className="bg"></div>
        </div>
        <div className="right">
          <div className="login-form">
            <div className="msg"></div>
            <Form
              {...layout}
              onFinish={login}
              // TODO
              initialValues={{
                account: '3119004911',
                password: '123',
              }}
            >
              <Form.Item name="account" rules={[{ required: true, message: '请输入用户名！' }]}>
                <Input bordered={false} prefix={<UserOutlined />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                <Input.Password
                  bordered={false}
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                />
              </Form.Item>
              <button type="submit" className="login-btn">
                登录
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
