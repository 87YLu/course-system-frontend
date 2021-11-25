import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import componentRouter from '@component'
import store from '@common/redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const history = createBrowserHistory()

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter location={history.location} navigator={history}>
        <Routes>
          {componentRouter.map(component => (
            <Route {...component} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
)
