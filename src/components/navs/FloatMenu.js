import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './fm.module.css'
import { gotoLogIn } from '../../redux/actions/AuthActions'
import sharedStyle from './nv.module.css'
import { ReactComponent as Close } from '../../assets/cross.svg'
import { goToDesigner } from './SecondaryMenu'

import { openModal, attemptDailyTasksReset } from '../../redux/reducers/CheckInReducer'

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
  const { close, logOut, signup } = props
  const { isAuthenticated } = useSelector(state => state.auth)
  const me = useSelector(state => state.profile.me)
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()

  const handleLogIn = () => {
    dispatch(gotoLogIn())
  }

  const closeBox = () => {
    close()
  }

  useOutsideAlerter(wrapperRef, close)

  return (
    <div ref={wrapperRef} className={styles.msw}>
      <div className={styles.arrw}></div>
      <div className={styles.ms}>
        <ul>
          <li className={styles.mobileClose} onClick={closeBox}>
            <Close className={sharedStyle.cliBtn} />
          </li>
          {isAuthenticated ? (
            <>
              <li className={styles.msb}>
                <span>
                  Hi, {me && me.uniqueDisplayName ? me.uniqueDisplayName : me && me.username}
                </span>
              </li>
            </>
          ) : null}
          <li>
            <Link to={'/'} onClick={close} className={styles.pa}>
              Inspirations
            </Link>
          </li>
          {process.env.REACT_APP_DESIGNER_ENABLE === '1' && me !== null && (
            <>
              <li>
                <Link to={'/dm'} onClick={close} className={styles.pa}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to={'/settings'} onClick={close} className={styles.pa}>
                  Settings
                </Link>
              </li>
              <li>
                <Link to={'/'} onClick={goToDesigner} className={styles.pa}>
                  Create Design
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to={'/blog'} onClick={close} className={styles.pa}>
              Blog
            </Link>
          </li>
          <li>
            <Link to={'/terms'} onClick={close} className={styles.sa}>
              Terms of Use
            </Link>
          </li>
          <li>
            <Link to={'/policy'} onClick={close} className={styles.sa}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={'/help-center'} onClick={close} className={styles.sa}>
              Help Center
            </Link>
          </li>
          <li>
            <div to={'/about'} onClick={close} className={styles.sa}>
              About
            </div>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to={'/'} onClick={logOut} className={styles.pa}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={'/'} onClick={handleLogIn} className={styles.pa}>
                  Log In
                </Link>
              </li>
              <li>
                <Link to={'/'} onClick={signup} className={styles.pa}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FloatMenu
