/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd'
import { useGetUser, useFetch } from '@hooks'
import { API, FetchState } from '@constant'
import { building, classroom, clazz } from './addressData'

const { RangePicker } = DatePicker
const { Option } = Select
const { useForm } = Form
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export default function OpenCourseModal({ visible, setVisible, tableRef }) {
  const { id: teacherId } = useGetUser()
  const [form] = useForm()
  const [startClass, setStartClass] = useState(clazz.length)

  const close = () => {
    form.resetFields()
    setVisible(false)
  }

  const [createCourseState, makeCreateCourseRequest] = useFetch({
    url: API.createCourse,
    method: 'post',
  })

  const formatData = values => {
    const {
      address1,
      address2,
      credit,
      name,
      time1,
      time2,
      timeRange: [startTime, endTime],
    } = values
    const address = `${address1} ${address2}`
    const time = `第${time1}至${time2}节`

    return {
      name,
      selectStart: startTime.format('YYYY-MM-DDTHH:mm'),
      selectEnd: endTime.format('YYYY-MM-DDTHH:mm'),
      teacherId,
      credit,
      address,
      time,
    }
  }

  const onFinish = values => {
    const data = formatData(values)
    makeCreateCourseRequest({ data })
  }

  const selectStartClass = e => {
    setStartClass(Number(e))
    form.resetFields(['time2'])
  }

  useEffect(() => {
    if (createCourseState.fetchState === FetchState.Success) {
      tableRef.current.update()
      close()
    }
  }, [createCourseState])

  return (
    <Modal
      title="新增授课"
      visible={visible}
      onOk={form.submit}
      onCancel={close}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Form {...layout} className="open-course-form" form={form} onFinish={onFinish}>
        <Form.Item
          label="课程名称"
          name="name"
          rules={[{ required: true, message: '请输入课程名称！' }]}
        >
          <Input placeholder="课程名称" />
        </Form.Item>
        <Form.Item
          label="选课时间"
          name="timeRange"
          rules={[{ required: true, message: '请输入开课时间！' }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label="学分" name="credit" rules={[{ required: true, message: '请输入学分！' }]}>
          <InputNumber min={0} placeholder="学分" />
        </Form.Item>
        <Form.Item label="上课时间">
          <div className="from-items-inline">
            <Form.Item name="time1" rules={[{ required: true, message: '请输入开始节数！' }]}>
              <Select placeholder="开始节数" onSelect={selectStartClass}>
                {clazz.slice(0, 8).map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="time2" rules={[{ required: true, message: '请输入结束节数！' }]}>
              <Select placeholder="结束节数">
                {clazz.slice(startClass, clazz.length).map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="上课地点">
          <div className="from-items-inline">
            <Form.Item name="address1" rules={[{ required: true, message: '请输入教学楼！' }]}>
              <Select placeholder="教学楼">
                {building.map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="address2" rules={[{ required: true, message: '请输入课室！' }]}>
              <Select placeholder="课室">
                {classroom.map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
