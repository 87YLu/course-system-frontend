import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useFetch, useGetUser } from '@hooks'
import { API, FetchState } from '@constant'
import './index.less'

const { useForm } = Form

export default function Psw() {
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }
  const tailLayout = {
    wrapperCol: { offset: 10 },
  }

  const [form] = useForm()
  const { id: userId } = useGetUser()
  const [updatePasswordFetchState, makeUpdatePasswordRequest] = useFetch({
    url: API.updatePassword,
    method: 'post',
  })

  const validatorNewPsw = (_, value) => {
    const oldPassword = form.getFieldValue('oldPassword')
    if (value === '' || value !== oldPassword) {
      return Promise.resolve()
    }
    return Promise.reject()
  }

  const validatorNewPsw2 = (_, value) => {
    const newPassword = form.getFieldValue('newPassword')
    if (value === '' || value === newPassword) {
      return Promise.resolve()
    }
    return Promise.reject()
  }

  const changePassword = values => {
    const { oldPassword, newPassword } = values
    makeUpdatePasswordRequest({ data: { userId, oldPassword, newPassword } })
  }

  useEffect(() => {
    if (updatePasswordFetchState.fetchState === FetchState.Success) {
      message.success('修改成功')
    }
  }, [updatePasswordFetchState])

  return (
    <div className="psw-form">
      <Form {...layout} form={form} onFinish={changePassword}>
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: '请输入旧密码！' }]}
        >
          <Input.Password placeholder="旧密码" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码！' },
            { validator: validatorNewPsw, message: '新密码不能与旧密码相同！' },
          ]}
        >
          <Input.Password placeholder="新密码" />
        </Form.Item>
        <Form.Item
          name="newPassword2"
          label="确认新密码"
          rules={[
            { required: true, message: '请确认新密码！' },
            { validator: validatorNewPsw2, message: '两次输入的密码不相同！' },
          ]}
        >
          <Input.Password placeholder="确认新密码" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
