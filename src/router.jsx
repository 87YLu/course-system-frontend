import React from 'react'
import { Route, Router, Routes  } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from '@component/Home'

export const history = createBrowserHistory()

export default function RouterComponent() {
  return (
    <Router location={history.location} navigator={history}>
      <Routes >
        <Route exact path="/" element={<Home />} />
      </Routes >
    </Router>
  )
}
