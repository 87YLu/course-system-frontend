import axios from 'axios'
import md5 from 'blueimp-md5'
import { message } from 'antd'

const requestMap = new Map()

export const fetchMiddleware = _storeAPI => next => async action => {
  // 如果不是从 useFetch 进来的，就是普通的 dispatch
  if (!action.fetchInfo) {
    return next(action)
  }

  const {
    fetchInfo: { requestConfig, requestId, name },
    callback,
    resetRequestId,
  } = action

  next({
    type: 'fetch/fetchPending',
    payload: { requestId },
  })

  let request, response

  // 如果是相同的请求则不重复发送
  const requestKey = md5(JSON.stringify(requestConfig))
  const cacheRequset = requestMap.get(requestKey)

  if (cacheRequset) {
    request = cacheRequset
  } else {
    request = axios(requestConfig)
      .then(res => {
        response = res.data
        callback && callback(response)
      })
      .catch(err => {
        message.error(err.message)
        next({
          type: 'fetch/fetchFailure',
          payload: { requestId, data: err.message },
        })
      })

    requestMap.set(requestKey, request)
  }

  await request

  if (response) {
    if (response.success) {
      next({
        type: 'fetch/fetchSuccess',
        payload: { requestId, data: response.data },
      })

      if (name) {
        next({
          type: `${name}/fetchSuccess`,
          payload: response.data,
        })
      }

      resetRequestId()
    } else {
      message.error(response.message)
      next({
        type: 'fetch/fetchFailure',
        payload: { requestId, data: response.message },
      })
    }
  }

  requestMap.delete(requestKey)
}
