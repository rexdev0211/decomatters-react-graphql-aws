import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAndOpen } from '../../redux/reducers/CheckInReducer'
import styles from './fb.module.css'
import { gotoLogIn } from '../../redux/actions/AuthActions'

import { ReactComponent as FloatingCheckin } from '../../assets/FloatingCheckin.svg'
import { ReactComponent as TopIcon } from '../../assets/Top.svg'
import { ReactComponent as AppIcon } from '../../assets/AppQRCode.svg'
import QRCode from '../../assets/DecormattersQRCode.png'
import determineProgressForTasks from '../../util/determineProgressForTasks'

const FloatingCheckinButton = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.auth.isAuthenticated)
  const { taskRecord, welcomeRecord, loadingStatus } = useSelector(state => state.checkIn)
  const { me } = useSelector(state => state.profile)

  let taskClaimable = false
  if (loadingStatus === 'loaded') {
    taskClaimable = Object.values(
      determineProgressForTasks(taskRecord, welcomeRecord, me.uniqueDisplayName)
    ).some(progress => progress.status === 'claimable')
  }

  let onClick
  if (authenticated) {
    onClick = () => dispatch(resetAndOpen())
  } else {
    onClick = () => dispatch(gotoLogIn())
  }

  return (
    <div className={styles.wrapper}>
      <FloatingCheckin className={styles.icon} onClick={onClick} />
      <div
        className={styles.claimableDot}
        style={{ visibility: taskClaimable ? 'visible' : 'hidden' }}
      />
      <div className={styles.tooltip}> Daily Check-In </div>
    </div>
  )
}

const FloatingMiddleButton = () => {
  return (
    <div className={styles.wrapper}>
      <AppIcon className={styles.icon} style={{ marginTop: -2 }} />
      <div className={styles.qrTooltip}>
        <div
          style={{
            background: `url(${QRCode})`,
            backgroundSize: 'cover',
            width: 194,
            height: 194,
            marginTop: 20,
            marginLeft: 20
          }}
        />
        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>
          Scan code to Download {'\n'}
          <span style={{ fontSize: 18 }}>Decormatters iOS APP</span>
        </div>
      </div>
    </div>
  )
}

const FloatingScrollButton = () => {
  return (
    <div className={styles.wrapper}>
      <TopIcon
        className={styles.icon}
        style={{ marginTop: -2 }}
        onClick={() => window.scrollTo(0, 0)}
      />
      <div className={styles.tooltip}> Back to Top </div>
    </div>
  )
}

const FloatingButtons = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    window.onscroll = () => setScrolled(window.scrollY > 0)
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(55vh - 108px)',
        right: 32,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <FloatingCheckinButton />
      <FloatingMiddleButton />
      {scrolled ? <FloatingScrollButton /> : null}
    </div>
  )
}

export default FloatingButtons
