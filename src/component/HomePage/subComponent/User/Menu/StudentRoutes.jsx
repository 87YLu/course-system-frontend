import React from 'react'
import { Route } from 'react-router-dom'
import Psw from '../Psw'

export default function StudentRoutes() {
  return <Route path="psw" key="psw" element={<Psw />} />
}
