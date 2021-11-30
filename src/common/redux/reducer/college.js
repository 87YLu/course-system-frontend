import { createSlice } from '@reduxjs/toolkit'

export const college = createSlice({
  name: 'college',
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
