import { createSlice } from '@reduxjs/toolkit'
import { FetchState } from '@constant'

export const fetch = createSlice({
  name: 'fetch',
  initialState: {},
  reducers: {
    fetchInit(state, action) {
      const { payload } = action
      const { requestId } = payload
      state[requestId] = {
        data: {},
        fetchState: FetchState.Init,
      }
    },
    fetchPending(state, action) {
      const { payload } = action
      const { requestId } = payload
      state[requestId] = {
        data: {},
        fetchState: FetchState.Pending,
      }
    },
    fetchSuccess(state, action) {
      const { payload } = action
      const { requestId, data } = payload
      state[requestId] = {
        data,
        fetchState: FetchState.Success,
      }
    },
    fetchFailure(state, action) {
      const { payload } = action
      const { requestId, data } = payload
      state[requestId] = {
        data,
        fetchState: FetchState.Failure,
      }
    },
  },
}).reducer
