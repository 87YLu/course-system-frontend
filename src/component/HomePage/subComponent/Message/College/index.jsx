/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, Fragment } from 'react'
import { Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useFetch } from '@hooks'
import { API } from '@constant'
import { PubTable } from '@Public'
import ChangeModal from './ActionModal'

const { confirm } = Modal

export default function College() {
  const tableRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [action, setAction] = useState('add')

  const [, makeDeleteCollegeRequest] = useFetch({
    url: API.deleteCollege,
    method: 'post',
  })

  const [, makeUpdateCollegeRequest] = useFetch({
    url: API.updateCollege,
    method: 'post',
  })

  const [, makeAddCollegeRequest] = useFetch({
    url: API.addCollege,
    method: 'post',
  })

  const showConfirm = (id, name) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定删除 ${name}？`,
      onOk() {
        return new Promise(resolve => {
          makeDeleteCollegeRequest({ params: { id } }, res => {
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

  const updateCollege = values => {
    values.id = record.id

    makeUpdateCollegeRequest({ data: values }, res => {
      if (res.success) {
        message.success('修改成功')
        tableRef.current.update()
        setVisible(false)
      }
    })
  }

  const addCollege = values => {
    makeAddCollegeRequest({ data: values }, res => {
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
        title: '学院名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '介绍',
        dataIndex: 'introduction',
        key: 'introduction',
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
      url: API.getAllCollegeInfo,
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
        新增学院
      </Button>
      <PubTable {...pubTableProps} name="college" tableRef={tableRef} />
      <ChangeModal
        visible={visible}
        setVisible={setVisible}
        record={record}
        onOk={action === 'add' ? addCollege : updateCollege}
        action={action}
      />
    </Fragment>
  )
}
