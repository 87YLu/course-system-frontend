/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef } from 'react'
import { Button, Space, Upload, message } from 'antd'
import { API } from '@constant'
import { PubTable } from '@Public'
import { ExportExcel, UploadFile } from '@utils'

export default function Clazz() {
  const tableRef = useRef()

  const exportClazzTemplate = () => {
    message.info('导出中...')
    ExportExcel({
      url: API.exportClazzTemplate,
      fileName: '班级学生信息模板',
    })
  }

  const exportClazzInfo = (name, clazzId) => {
    message.info('导出中...')
    ExportExcel({
      url: API.exportClazzInfo,
      fileName: `${name}的学生信息`,
      params: { clazzId },
    })
  }

  const importClazzStudents = (file, clazzId) => {
    message.info('导入中...')
    UploadFile({
      data: { file, clazzId },
      url: API.importClazzStudents,
      success: () => {
        tableRef.current.update()
      },
    })
  }

  const columns = [
    {
      title: '班级',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Space>
            <Button
              size="small"
              onClick={() => {
                exportClazzInfo(record.name, record.id)
              }}
            >
              导出学生信息
            </Button>
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={file => {
                importClazzStudents(file.file, record.id)
              }}
            >
              <Button size="small">导入班级学生信息</Button>
            </Upload>
          </Space>
        )
      },
    },
  ]

  const pubTableProps = {
    columns,
    ajaxConfig: {
      url: API.getAllClazzInPage,
      method: 'get',
    },
  }

  return (
    <Fragment>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={exportClazzTemplate}>导出班级学生信息模板</Button>
      </Space>
      <PubTable {...pubTableProps} tableRef={tableRef} name="clazz" />
    </Fragment>
  )
}
