import { useEffect, useRef, useState } from 'react'

export function useTimer() {
  const [timer, setTimer] = useState(Date.now())
  const intervalId = useRef(null)

  useEffect(() => {
    start()
    return () => stop()
  }, [])
  
  const start = function () {
    intervalId.current = setInterval(() => {
      setTimer(Date.now())
    }, 1000)
  }

  const stop = function () {
    clearInterval(intervalId.current)
    intervalId.current = null
  }

  return { timer, setTimer, start, stop }
}
