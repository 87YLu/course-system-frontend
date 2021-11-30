/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'
import { Button, Space, Upload, Input } from 'antd'
import { debounce } from 'lodash'
import { useGetUser } from '@hooks'
import { API } from '@constant'
import { PubTable } from '@Public'
import { roleEnum, ExportExcel, UploadFile } from '@utils'
import OpenCourseModal from './OpenCourseModal'

export default function MyCourse() {
  const [visible, setVisible] = useState(false)
  const [exportStudentLoading, setExportStudentLoading] = useState(false)
  const [exportGradeLoading, setExportGradeLoading] = useState(false)

  const [importGradeLoading, setImportGradeLoading] = useState(false)
  const tableRef = useRef()
  const { id: userId, role } = useGetUser()

  const exportStudentCourseInfo = (name, courseId) => {
    setExportStudentLoading(true)
    ExportExcel({
      url: API.exportStudentCourseInfo,
      fileName: `选${name}的学生名单`,
      params: { courseId },
      callback: () => setExportStudentLoading(false),
    })
  }

  const exportGradeExcel = (name, courseId) => {
    setExportGradeLoading(true)
    ExportExcel({
      url: API.exportGradeExcel,
      fileName: `选${name}的学生的成绩`,
      params: { courseId },
      callback: () => setExportGradeLoading(false),
    })
  }

  const teacherImportGrade = (file, courseId) => {
    setImportGradeLoading(true)
    UploadFile({
      data: { file, courseId, teacherId: userId },
      url: API.teacherImportGrade,
      callback: () => setImportGradeLoading(false),
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
                loading={exportStudentLoading}
                onClick={() => {
                  exportStudentCourseInfo(name, id)
                }}
              >
                导出名单
              </Button>
              <Button
                size="small"
                loading={exportGradeLoading}
                onClick={() => {
                  exportGradeExcel(name, id)
                }}
              >
                导出成绩
              </Button>
              <Upload
                beforeUpload={() => false}
                showUploadList={false}
                onChange={file => {
                  teacherImportGrade(file.file, id)
                }}
              >
                <Button size="small" loading={importGradeLoading}>
                  导入成绩
                </Button>
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
