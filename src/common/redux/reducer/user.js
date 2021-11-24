import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    data: {},
  },
  reducers: {
    fetchSuccess(state, action) {
      const { payload } = action
      state.data = payload
    },
  },
}).reducer
