import React, { Fragment, useState } from 'react'
import { Button, Upload, Space } from 'antd'
import { UploadFile, ExportExcel, roleEnum } from '@common/utils'
import { API } from '@constant'
import { PubTable } from '@Public'

export default function Manager() {
  const [uploadIng, setUploading] = useState(false)
  const [importRole, setImportRole] = useState(-1)

  const exportUserTemplate = () => {
    ExportExcel({ url: API.exportUserTemplate, fileName: '用户模板' })
  }

  const importUser = file => {
    setUploading(true)
    UploadFile({
      data: { file, roleId: importRole },
      url: API.importUserInfo,
      callback: () => {
        setImportRole(-1)
        setUploading(false)
      },
    })
  }

  const pubTableProps = {
    columns: [
      {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '授课教师',
        dataIndex: 'teacherName',
        key: 'teacherName',
      },
      {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
      },
      {
        title: '上课地点',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '上课时间',
        dataIndex: 'time',
        key: 'time',
      },
    ],
    ajaxConfig: {
      url: API.showAllUserInPage,
      method: 'get',
      data: {
        roleId: 1
      }
    },
  }

  return (
    <Fragment>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={exportUserTemplate}>导出用户模板</Button>
        <Upload
          beforeUpload={() => false}
          onChange={file => {
            importUser(file.file)
          }}
          showUploadList={false}
        >
          <Button
            style={{ margin: '0 20px ' }}
            loading={uploadIng && importRole === roleEnum['学生']}
            onClick={() => {
              setImportRole(roleEnum['学生'])
            }}
          >
            导入学生
          </Button>
          <Button
            loading={uploadIng && importRole === roleEnum['老师']}
            onClick={() => {
              setImportRole(roleEnum['老师'])
            }}
          >
            导入老师
          </Button>
        </Upload>
      </Space>

      <PubTable {...pubTableProps} />
    </Fragment>
  )
}
