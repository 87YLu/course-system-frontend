/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import md5 from 'blueimp-md5'
import { FetchState } from '@constant'

export const useFetch = options => {
  const requestRef = useRef(md5(Math.random()))
  const dispatch = useDispatch()
  const { name = '', ...option } = options
  const fetchState = useSelector(state => state.fetch[requestRef.current] || {}, shallowEqual)
  const resetRequestId = () => {
    requestRef.current = md5(Math.random())
  }

  useEffect(() => {
    dispatch({
      type: 'fetch/fetchInit',
      payload: {
        requestId: requestRef.current,
        data: {},
        fetchState: FetchState.Init,
      },
    })
  }, [requestRef.current])

  const makeRequest = useCallback(
    (extraOption, callback) => {
      const requestConfig = Object.assign({}, option, extraOption)

      const action = {
        fetchInfo: {
          requestId: requestRef.current,
          requestConfig,
          name,
        },
        callback,
        resetRequestId,
      }

      dispatch(action)
    },
    [requestRef.current],
  )

  return [fetchState, makeRequest]
}
