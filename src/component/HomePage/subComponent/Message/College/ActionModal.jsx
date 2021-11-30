/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form, Modal, Input } from 'antd'

const { useForm } = Form
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export default function ChangeModal({ visible, setVisible, record, onOk, action }) {
  const [form] = useForm()

  const onCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (Object.keys(record).length === 0) {
      form.resetFields()
    } else {
      form.setFieldsValue(record)
    }
  }, [record])

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={action === 'add' ? '新增学院' : '修改学院信息'}
      onOk={form.submit}
      forceRender
    >
      <Form form={form} {...layout} onFinish={onOk}>
        <Form.Item
          label="学院名称"
          name="name"
          rules={[{ required: true, message: '请输入学院名称！' }]}
        >
          <Input placeholder="学院名称"/>
        </Form.Item>
        <Form.Item
          label="学院介绍"
          name="introduction"
          rules={[{ required: true, message: '请输入学院介绍！' }]}
        >
          <Input placeholder="学院介绍"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
