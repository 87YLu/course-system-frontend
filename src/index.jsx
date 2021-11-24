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

// import Login from './component/Login'
// import HomePage from './component/HomePage'

const history = createBrowserHistory()

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter location={history.location} navigator={history}>
        <Routes>
          {componentRouter.map(component => (
            <Route {...component} />
          ))}
          {/* <Route path="/" element={<Login />} exact />
          <Route path="/HomePage/*" element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
)
