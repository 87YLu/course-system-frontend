import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useFetch } from '@hooks'
import { API, FetchState } from '@constant'
import { useNavigate } from 'react-router-dom'
import './index.less'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const tailLayout = {
  wrapperCol: { offset: 4 },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginFetchState])

  const login = values => {
    makeLoginRequest({ data: values })
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <Form
          {...layout}
          onFinish={login}
          // TODO
          initialValues={{
            account: '3119004911',
            password: '123',
          }}
        >
          <Form.Item
            label="用户名"
            name="account"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
