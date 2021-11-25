/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Table } from 'antd'
import { useFetch } from '@hooks'
import { FetchState } from '@constant'

function PubTable({ columns, ajaxConfig, tableRef, ...otherProps }) {
  const { method, url, ...otherConfig } = ajaxConfig
  const [requestState, makeRequest] = useFetch({ url, method, ...otherConfig })
  const [dataSource, setDataSource] = useState([])
  const [updateKey, setUpdateKey] = useState(Math.random())

  useEffect(() => {
    makeRequest()
  }, [updateKey])

  useImperativeHandle(tableRef, () => ({
    update: () => {
      setUpdateKey(Math.random())
    },
  }))

  useEffect(() => {
    if (requestState.fetchState === FetchState.Success) {
      const data = requestState.data.records.map(item => ({ ...item, key: item.id }))
      setDataSource(data)
    }
  }, [requestState])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={requestState.fetchState === FetchState.Pending}
      {...otherProps}
    />
  )
}

export default PubTable
