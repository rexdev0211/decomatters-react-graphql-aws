import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as Clock } from '../../assets/challenge-clock.svg'
import { attemptDailyTasksReset } from '../../redux/reducers/CheckInReducer'

import styles from './cm.module.css'

const TIMER_STYLE = {
  fontSize: 18,
  fontWeight: 500,
  marginTop: 'auto',
  marginBottom: 52,
  position: 'relative',
  left: 10
}

const CLOCK_STYLE = {
  marginLeft: 4,
  marginRight: 4,
  position: 'relative',
  top: 7
}

const CheckInTimer = ({ UTCStartHour }) => {
  const dispatch = useDispatch()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [needsReset, setNeedsReset] = useState(false)

  const updateTime = () => {
    setCurrentTime(new Date())
  }

  useEffect(() => {
    //set a timeout to update the clock and record the ID for that timeout.
    let timeoutID = setTimeout(updateTime, 200)

    // clear the timeout when CheckInTimer is unmounted.
    const cleanup = () => clearTimeout(timeoutID)
    return cleanup
  })

  if (typeof UTCStartHour !== 'number') {
    return null
  }

  let resetTime = new Date()

  if (currentTime.getUTCHours() < UTCStartHour) {
    resetTime.setUTCHours(UTCStartHour, 0, 0, 0)
  } else {
    resetTime.setUTCHours(UTCStartHour + 24, 0, 0, 0) //set for 13:00 UTC the next day
  }

  let msUntilReset = resetTime - currentTime

  if (msUntilReset < 1000) {
    setNeedsReset(true)
  } else if (needsReset && msUntilReset > 1000) {
    setNeedsReset(false)
    dispatch(attemptDailyTasksReset())
  }

  let [date, timeLeft, ms] = new Date(msUntilReset).toISOString().split(/T|\./)
  return (
    <div style={TIMER_STYLE} className={styles.timer}>
      New Rewards in
      <Clock style={CLOCK_STYLE} />
      <span style={{ color: '#FF5E6D' }}>{timeLeft}</span>
    </div>
  )
}

export default CheckInTimer
