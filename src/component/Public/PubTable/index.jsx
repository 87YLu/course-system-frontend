/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import { Table } from 'antd'
import { useFetch } from '@hooks'
import { FetchState } from '@constant'
import { getTop } from '@common/utils'

function PubTable({ columns, ajaxConfig, tableRef, ...otherProps }) {
  const { method, url, ...otherConfig } = ajaxConfig
  const [requestState, makeRequest] = useFetch({ url, method, ...otherConfig })
  const [dataSource, setDataSource] = useState([])
  const [updateKey, setUpdateKey] = useState(Math.random())
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef()

  useImperativeHandle(tableRef, () => ({
    update: () => {
      setUpdateKey(Math.random())
    },
  }))

  useEffect(() => {
    makeRequest()
  }, [updateKey])

  useEffect(() => {
    if (requestState.fetchState === FetchState.Success) {
      const data = requestState.data.records.map(item => ({ ...item, key: item.id }))
      setDataSource(data)
    }
  }, [requestState])

  useEffect(() => {
    if (ref.current != null) {
      setScrollTop(getTop(ref.current))
    }
  }, [ref.current])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      ref={ref}
      scroll={{ y: `calc(100vh - ${scrollTop + 150}px` }}
      loading={requestState.fetchState === FetchState.Pending}
      {...otherProps}
    />
  )
}

export default PubTable
