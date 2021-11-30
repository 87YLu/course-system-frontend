/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, InputNumber, DatePicker, Select, Cascader } from 'antd'
import { useGetUser, useFetch } from '@hooks'
import { API, FetchState } from '@constant'
import './index.less'

const { RangePicker } = DatePicker
const { Option } = Select
const { useForm } = Form
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const clazz = new Array(9).fill(0).map((_, index) => index + 1)

export default function OpenCourseModal({ visible, setVisible, tableRef }) {
  const { id: teacherId } = useGetUser()
  const [form] = useForm()
  const [startClass, setStartClass] = useState(clazz.length)
  const [options, setOptions] = useState([])

  const close = () => {
    form.resetFields()
    setVisible(false)
  }

  const [createCourseState, makeCreateCourseRequest] = useFetch({
    url: API.createCourse,
    method: 'post',
  })

  const [getAllBuildingsState, makeGetAllBuildingsRequest] = useFetch({
    url: API.getAllBuildings,
    method: 'get',
  })

  const [, makeGetBuildingClazzRequest] = useFetch({
    url: API.getBuildingClazz,
    method: 'get',
  })

  const formatData = values => {
    const {
      address: [building, num],
      credit,
      name,
      time1,
      time2,
      timeRange: [startTime, endTime],
    } = values

    const time = `第${time1}至${time2}节`

    return {
      name,
      selectStart: startTime.format('YYYY-MM-DDTHH:mm'),
      selectEnd: endTime.format('YYYY-MM-DDTHH:mm'),
      teacherId,
      credit,
      building,
      num,
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
    makeGetAllBuildingsRequest()
  }, [])

  useEffect(() => {
    if (createCourseState.fetchState === FetchState.Success) {
      tableRef.current.update()
      close()
    }
  }, [createCourseState])

  useEffect(() => {
    if (getAllBuildingsState.fetchState === FetchState.Success) {
      const options = getAllBuildingsState.data.map(item => ({
        value: item,
        label: item,
        isLeaf: false,
      }))

      setOptions(options)
    }
  }, [getAllBuildingsState])

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    makeGetBuildingClazzRequest({ params: { building: targetOption.value } }, data => {
      targetOption.loading = false
      targetOption.children = data.data.map(item => ({
        label: item,
        value: item,
      }))

      setOptions([...options])
    })
  }

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
        <Form.Item label="上课时间" required>
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
        <Form.Item
          label="上课地点"
          name="address"
          rules={[{ required: true, message: '请输入上课地点！' }]}
        >
          <Cascader placeholder="教学楼/课室" options={options} loadData={loadData} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
