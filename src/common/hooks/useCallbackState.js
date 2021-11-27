import { useEffect, useState, useRef } from 'react'

export const useCallbackState = od => {
  const cbRef = useRef()
  const [data, setData] = useState(od)

  useEffect(() => {
    cbRef.current && cbRef.current(data)
  }, [data])

  return [
    data,
    (d, callback) => {
      cbRef.current = callback
      setData(d)
    },
  ]
}
