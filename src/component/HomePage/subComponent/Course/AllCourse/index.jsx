/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, message, Modal } from 'antd'
import moment from 'moment'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { API, FetchState } from '@constant'
import { PubTable } from '@Public'
import { useGetUser, useFetch } from '@hooks'
import { roleEnum } from '@common/utils'

const { confirm } = Modal

export default function AllCourse() {
  const { role, id } = useGetUser()
  const [selectCourseState, makeSelectCourseRequest] = useFetch({
    url: API.selectCourse,
    method: 'post',
  })

  const formatSelectTime = time => {
    return moment(time).format('YYYY-MM-DD HH:mm')
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
        title: '选课时间',
        dataIndex: 'selectTime',
        key: 'selectTime',
        render: (_, record) => {
          const { selectStart, selectEnd } = record
          return (
            <div>
              开始：{formatSelectTime(selectStart)}<br />
              结束：{formatSelectTime(selectEnd)}
            </div>
          )
        },
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
      url: API.showCoursesInPage,
      method: 'get',
    },
  }

  const showConfirm = courseId => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确定选择上该课程？',
      onOk() {
        makeSelectCourseRequest({ params: { courseId, studentId: id } })
      },
    })
  }

  useEffect(() => {
    if (selectCourseState.fetchState === FetchState.Success) {
      message.success('选课成功')
    }
  }, [selectCourseState])

  if (roleEnum[role] === '学生') {
    pubTableProps.columns.push({
      title: '操作',
      dataIndex: 'aciton',
      key: 'action',
      render: (_, record) => {
        return (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              showConfirm(record.id)
            }}
          >
            选课
          </Button>
        )
      },
    })
  }

  return <PubTable {...pubTableProps} />
}
