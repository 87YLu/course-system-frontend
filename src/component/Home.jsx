import React, { useEffect } from 'react'
import { useFetch } from '@hooks'
import { API, FetchState } from '@constant'

export default function Home(props) {
  const [loginFetchState, makeLoginRequest] = useFetch({
    name: 'user',
    url: API.user.login,
    method: 'post',
  })

  useEffect(() => {
    makeLoginRequest({
      data: {
        account: '3119004911',
        password: '004911',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loginFetchState.fetchState === FetchState.Success) {
    }
    if (loginFetchState.fetchState === FetchState.Failure) {
    }
  }, [loginFetchState])

  return <div>1234</div>
}
