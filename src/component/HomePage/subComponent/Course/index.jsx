import React, { useEffect } from 'react'
import { useFetch } from '@hooks'
import { API, FetchState } from '@constant'

export default function Course() {


  const [showCoursesInPageState, makeShowCoursesInPageRequest] = useFetch({
    // name: 'user',
    url: API.showCoursesInPage,
    method: 'get',
  })


  useEffect(() => {
    makeShowCoursesInPageRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (showCoursesInPageState.fetchState === FetchState.Success) {
      console.log(showCoursesInPageState)
    }
  }, [showCoursesInPageState])

  return <div>123</div>
}
