/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useFetch } from '@hooks'
import { API } from '@constant'
import { PubTable } from '@Public'
import ActionModal from './ActionModal'
import { useSelector } from 'react-redux'

const { confirm } = Modal

export default function Speciality() {
  const tableRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [action, setAction] = useState('add')
  const college = useSelector(state => state.college.data)

  const [, makeDeleteSpecialityRequest] = useFetch({
    url: API.deleteSpeciality,
    method: 'post',
  })

  const [, makeUpdateSpecialityRequest] = useFetch({
    url: API.updateSpeciality,
    method: 'post',
  })

  const [, makeAddSpecialityRequest] = useFetch({
    url: API.addSpeciality,
    method: 'post',
  })

  const [, makeGetAllCollegeInfoRequest] = useFetch({
    url: API.getAllCollegeInfo,
    method: 'get',
    name: 'college',
  })

  useEffect(() => {
    if (Object.keys(college).length === 0) {
      makeGetAllCollegeInfoRequest()
    }
  }, [college])

  const showConfirm = (id, name) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定删除 ${name}？`,
      onOk() {
        return new Promise(resolve => {
          makeDeleteSpecialityRequest({ params: { id } }, res => {
            if (res.success) {
              message.success('删除成功')
              tableRef.current.update()
            }
            resolve()
          })
        })
      },
    })
  }

  const updateSpeciality = values => {
    values.id = record.id

    makeUpdateSpecialityRequest({ data: values }, res => {
      if (res.success) {
        message.success('修改成功')
        tableRef.current.update()
        setVisible(false)
      }
    })
  }

  const addSpeciality = values => {
    makeAddSpecialityRequest({ data: values }, res => {
      if (res.success) {
        message.success('新增成功')
        tableRef.current.update()
        setVisible(false)
      }
    })
  }

  const pubTableProps = {
    columns: [
      {
        title: '专业名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '专业介绍',
        dataIndex: 'introduction',
        key: 'introduction',
      },
      {
        title: '所属学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          const { id, name } = record
          return (
            <Space>
              <Button
                size="small"
                onClick={() => {
                  setAction('update')
                  setRecord(record)
                  setVisible(true)
                }}
              >
                修改
              </Button>
              <Button
                size="small"
                danger
                onClick={() => {
                  showConfirm(id, name)
                }}
              >
                删除
              </Button>
            </Space>
          )
        },
      },
    ],
    ajaxConfig: {
      url: API.getAllSpecInfo,
      method: 'get',
    },
  }

  return (
    <Fragment>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setRecord({})
          setAction('add')
          setVisible(true)
        }}
      >
        新增专业
      </Button>
      <PubTable {...pubTableProps} name="college" tableRef={tableRef} />
      <ActionModal
        visible={visible}
        setVisible={setVisible}
        record={record}
        onOk={action === 'add' ? addSpeciality : updateSpeciality}
        action={action}
      />
    </Fragment>
  )
}
