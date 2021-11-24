import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

import store from '@common/redux'
import Router from './router'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router/>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
)
