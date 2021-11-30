/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import { Table } from 'antd'
import { useFetch, useCallbackState } from '@hooks'
import { FetchState } from '@constant'
import { getTop, validateNecessaryProps } from '@utils'

export default function PubTable({
  columns,
  ajaxConfig,
  name: tableName,
  rowKey = 'id',
  tableRef,
  ...otherProps
}) {
  const necessaryProps = {
    columns: columns,
    ajaxConfig: ajaxConfig,
    name: tableName,
  }

  validateNecessaryProps('PubTable', necessaryProps)

  const { method, url, name: reduxName = 'fetch', ...otherConfig } = ajaxConfig
  const [requestState, makeRequest] = useFetch({ url, method, name: reduxName })
  const [dataSource, setDataSource] = useState([])
  const [updateKey, setUpdateKey] = useState(Math.random())
  const [scrollTop, setScrollTop] = useState(0)
  const [ajaxData, setAjaxData] = useCallbackState(otherConfig)

  const ref = useRef()

  useImperativeHandle(tableRef, () => ({
    update: newData => {
      if (newData != null) {
        setAjaxData(newData, () => {
          setUpdateKey(Math.random())
        })
      } else {
        setUpdateKey(Math.random())
      }
    },
  }))

  useEffect(() => {
    makeRequest({ ...ajaxData })
  }, [updateKey])

  useEffect(() => {
    if (requestState.fetchState === FetchState.Success) {
      let isUseIndexKey = false

      const data = requestState.data.records.map((item, index) => {
        let key = item[rowKey]

        if (key == null) {
          key = index
          isUseIndexKey = true
        }

        return { ...item, key }
      })

      if (isUseIndexKey) {
        console.warn(`name 为 ${tableName} 的 PubTable 正使用 index 作为 rowKey，请检查组件。`)
      }

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
      bordered={true}
      columns={columns}
      dataSource={dataSource}
      ref={ref}
      scroll={{ y: `calc(100vh - ${scrollTop + 150}px` }}
      loading={requestState.fetchState === FetchState.Pending}
      {...otherProps}
    />
  )
}
