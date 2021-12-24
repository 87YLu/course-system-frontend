/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'
import { Button, Space, Upload, Input, message } from 'antd'
import { debounce } from 'lodash'
import { useGetUser } from '@hooks'
import { API } from '@constant'
import { PubTable } from '@Public'
import { roleEnum, ExportExcel, UploadFile } from '@utils'
import OpenCourseModal from './OpenCourseModal'

export default function MyCourse() {
  const [visible, setVisible] = useState(false)
  const tableRef = useRef()
  const { id: userId, role } = useGetUser()

  const exportStudentCourseInfo = (name, courseId) => {
    message.info('导出中...')
    ExportExcel({
      url: API.exportStudentCourseInfo,
      fileName: `选${name}的学生名单`,
      params: { courseId },
      success: () => {
        message.destroy()
        message.success('导出成功')
      },
    })
  }

  const exportGradeExcel = (name, courseId) => {
    message.info('导出中...')
    ExportExcel({
      url: API.exportGradeExcel,
      fileName: `选${name}的学生的成绩`,
      params: { courseId },
      success: () => {
        message.destroy()
        message.success('导出成功')
      },
    })
  }

  const teacherImportGrade = (file, courseId) => {
    message.info('导入中...')
    UploadFile({
      data: { file, courseId, teacherId: userId },
      url: API.teacherImportGrade,
      success: () => {
        message.destroy()
        message.success('导入成功')
      },
    })
  }

  const columns = {
    [roleEnum['学生']]: [
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
    [roleEnum['老师']]: [
      {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
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
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          const { name, id } = record
          return (
            <Space>
              <Button
                size="small"
                onClick={() => {
                  exportStudentCourseInfo(name, id)
                }}
              >
                导出名单
              </Button>
              <Button
                size="small"
                onClick={() => {
                  exportGradeExcel(name, id)
                }}
              >
                导出成绩
              </Button>
              <Upload
                beforeUpload={() => false}
                onChange={file => {
                  teacherImportGrade(file.file, id)
                }}
                showUploadList={false}
              >
                <Button size="small">导入成绩</Button>
              </Upload>
            </Space>
          )
        },
      },
    ],
  }

  const pubTableProps = {
    columns: columns[role],
    ajaxConfig: {
      url: API.showSelectedCoursesInPage,
      method: 'post',
      params: { userId },
    },
  }

  const handleChange = debounce(e => {
    tableRef.current.update({
      params: { userId, name: e.target.value },
    })
  }, 200)

  return (
    <Fragment>
      <Space style={{ marginBottom: '20px' }}>
        <Input addonBefore="查询课程" onChange={handleChange} />
        {roleEnum[role] === '老师' && (
          <Button
            onClick={() => {
              setVisible(true)
            }}
          >
            新增授课
          </Button>
        )}
      </Space>
      <PubTable {...pubTableProps} tableRef={tableRef} name="myCourse" />
      <OpenCourseModal visible={visible} setVisible={setVisible} tableRef={tableRef} />
    </Fragment>
  )
}
