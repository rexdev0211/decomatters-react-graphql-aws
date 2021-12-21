import React, { useRef, useEffect } from 'react'
import styles from './alert.module.css'

const useOutsideAlerter = (ref, closeMenu) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

const FloatMenu = props => {
  const { close } = props
  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, close)

  return (
    <div ref={wrapperRef} className={styles.msw}>
      <div className={styles.alertsArrw}></div>
      <div className={styles.alertContainer}>
        <ul style={{ overflowY: 'auto', display: 'block' }}>
          <>
            <li className={styles.msb}>
              <img
                className={styles.userImg}
                style={{ width: '48px', height: '48px', borderRadius: '20px' }}
                alt={''}
                src={
                  'https://didr9pubr8qfh.cloudfront.net/3097ff339538a9c454271a4a8453c80c_Profile-Thumb.jpg'
                }
              />
              <div className={styles.notificationMsg}>New Challenges Coming Soon</div>
              <div className={styles.time}>11 hours ago</div>
            </li>
          </>
        </ul>
      </div>
    </div>
  )
}

export default FloatMenu
