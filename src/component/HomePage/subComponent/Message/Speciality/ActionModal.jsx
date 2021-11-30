/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form, Modal, Input, Select } from 'antd'
import { useSelector } from 'react-redux'

const { useForm } = Form
const { Option } = Select
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export default function ChangeModal({ visible, setVisible, record, onOk, action }) {
  const [form] = useForm()
  const college = useSelector(state => state.college.data?.records) || []

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
      title={action === 'add' ? '新增专业' : '修改专业信息'}
      onOk={form.submit}
      forceRender
    >
      <Form form={form} {...layout} onFinish={onOk}>
        <Form.Item
          label="专业名称"
          name="name"
          rules={[{ required: true, message: '请输入专业名称！' }]}
        >
          <Input placeholder="专业名称" />
        </Form.Item>
        <Form.Item
          label="专业介绍"
          name="introduction"
          rules={[{ required: true, message: '请输入专业介绍！' }]}
        >
          <Input placeholder="专业介绍" />
        </Form.Item>
        <Form.Item
          label="所属学院"
          name="collegeId"
          rules={[{ required: true, message: '请选择所属学院！' }]}
        >
          <Select placeholder="所属学院">
            {college.map(item => {
              const { id, name } = item
              return (
                <Option value={id} key={id}>
                  {name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
