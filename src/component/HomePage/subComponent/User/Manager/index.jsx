import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Button, Upload, Space, Radio } from 'antd'
import { UploadFile, ExportExcel, roleEnum } from '@utils'
import { API } from '@constant'
import { PubTable } from '@Public'

export default function Manager() {
  const tableRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [importRole, setImportRole] = useState(-1)
  const [showUserRole, setShowUserRole] = useState(3)

  const exportUserTemplate = () => {
    setExporting(true)
    ExportExcel({
      url: API.exportUserTemplate,
      fileName: '用户模板',
      callback: () => {
        setExporting(false)
      },
    })
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
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '身份',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
    ],
    ajaxConfig: {
      url: API.showAllUserInPage,
      method: 'get',
      params: {
        roleId: showUserRole,
      },
    },
  }

  const onRadiochange = e => {
    setShowUserRole(e.target.value)
  }

  useEffect(() => {
    tableRef.current.update({
      params: {
        roleId: showUserRole,
      },
    })
  }, [showUserRole])

  return (
    <Fragment>
      <Space style={{ marginBottom: '10px' }}>
        <Button onClick={exportUserTemplate} loading={exporting}>
          导出用户模板
        </Button>
        <Upload
          beforeUpload={() => false}
          onChange={file => {
            importUser(file.file)
          }}
          showUploadList={false}
        >
          <Button
            style={{ margin: '0 20px ' }}
            loading={uploading && importRole === roleEnum['学生']}
            onClick={() => {
              setImportRole(roleEnum['学生'])
            }}
          >
            导入学生
          </Button>
          <Button
            loading={uploading && importRole === roleEnum['老师']}
            onClick={() => {
              setImportRole(roleEnum['老师'])
            }}
          >
            导入老师
          </Button>
        </Upload>
      </Space>

      <div style={{ marginBottom: '10px' }}>
        查看：
        <Radio.Group value={showUserRole} onChange={onRadiochange}>
          <Radio value={3}>全部</Radio>
          <Radio value={2}>老师</Radio>
          <Radio value={1}>学生</Radio>
        </Radio.Group>
      </div>

      <PubTable {...pubTableProps} tableRef={tableRef} name="userManager" />
    </Fragment>
  )
}
