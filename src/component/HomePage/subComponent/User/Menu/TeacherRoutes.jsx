import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Psw from '../Psw'
import Manager from '../Manager'

export default function TeacherRoutes() {
  return (
    <Fragment>
      <Route path="psw" key="psw" element={<Psw />} />
      <Route path="manager" key="manager" element={<Manager />} />
    </Fragment>
  )
}
