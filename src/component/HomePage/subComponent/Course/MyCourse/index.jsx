/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'
import { Button } from 'antd'
import { useGetUser } from '@hooks'
import { API } from '@constant'
import { PubTable } from '@Public'
import { roleEnum } from '@utils'
import OpenCourseModal from './OpenCourseModal'

export default function MyCourse() {
  const [visible, setVisible] = useState(false)
  const tableRef = useRef()
  const { id: userId, role } = useGetUser()
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
      url: API.showSelectedCoursesInPage,
      method: 'post',
      params: { userId },
    },
  }

  return (
    <Fragment>
      {roleEnum[role] === '老师' && (
        <Button
          onClick={() => {
            setVisible(true)
          }}
          style={{ marginBottom: '20px' }}
        >
          新增授课
        </Button>
      )}
      <PubTable {...pubTableProps} tableRef={tableRef} />
      <OpenCourseModal visible={visible} setVisible={setVisible} tableRef={tableRef} />
    </Fragment>
  )
}
