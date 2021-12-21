import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import sharedStyle from './nv.module.css'
import styles from './lv.module.css'
import { logout as logoutAction, gotoLogIn, gotoSignUp } from '../../redux/actions/AuthActions'
import { ReactComponent as Hamburger } from '../../assets/menu-icon.svg'
import { ReactComponent as Bell } from '../../assets/bell.svg'
import { ReactComponent as MenuDots } from '../../assets/menudot.svg'
import FloatMenu from './FloatMenu'
import AlertsMenu from './AlertsMenu'
import { PrimaryButton, SecondaryClearButton } from '../common/FormControls'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import SecondaryMenu from './SecondaryMenu'

const LoginNav = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  //const user = useSelector(state => state.auth.user)
  const me = useSelector(state => state.profile.me)
  const [showMenu, setShowMenu] = useState(false)
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false)
  const [showAlertsMenu, setShowAlertsMenu] = useState(false)

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth
      }
    }

    function handleResize() {
      if (isAuthenticated === false && showMenu === true) {
        if (getSize().width >= 768) {
          setShowMenu(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [showMenu, isAuthenticated])

  const closeMenu = () => {
    setShowMenu(false)
  }

  const toggleMenu = () => {
    const tag = 'nav_profile_clicked'
    firebase.analytics().logEvent(tag)

    setShowMenu(!showMenu)
  }

  const closeAlertsMenu = () => {
    setShowAlertsMenu(false)
  }

  const toggleAlertsMenu = () => {
    const tag = 'nav_notification_clicked'
    firebase.analytics().logEvent(tag)

    setShowAlertsMenu(!showMenu)
  }

  const toggleSecondayMenu = () => {
    setShowSecondaryMenu(!showSecondaryMenu)
  }

  const closeSecondaryMenu = () => {
    setShowSecondaryMenu(false)
  }

  const logOut = () => {
    const tag = 'nav_logout_clicked'
    firebase.analytics().logEvent(tag)

    setShowMenu(false)
    dispatch(logoutAction(history))
  }

  const handleLogIn = () => {
    const tag = 'nav_login_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoLogIn())
  }

  const handleSignUp = () => {
    const tag = 'nav_signup_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoSignUp())
  }

  const isNotificationEnabled = () => {
    return !!+process.env.REACT_APP_NOTIFICATION_ENABLED ? true : false
  }

  return (
    <>
      {isAuthenticated ? null : (
        <ul className={sharedStyle.nbe}>
          <li className={`${sharedStyle.menuDots} ${showSecondaryMenu ? sharedStyle.active : ''}`}>
            <MenuDots type="button" onClick={toggleSecondayMenu}></MenuDots>
            {showSecondaryMenu ? (
              <SecondaryMenu signup={handleSignUp} close={closeSecondaryMenu} logOut={logOut} />
            ) : null}
          </li>
          <li className="ml-2">
            <PrimaryButton type="button" onClick={handleSignUp}>
              Sign Up
            </PrimaryButton>
          </li>
          <li className="ml-2">
            <SecondaryClearButton type="button" onClick={handleLogIn}>
              Login
            </SecondaryClearButton>
          </li>
        </ul>
      )}

      {isAuthenticated ? (
        <>
          <div>
            {isNotificationEnabled() ? (
              <button
                className={`${showAlertsMenu ? sharedStyle.blf : ''} ${sharedStyle.bl}`}
                onClick={toggleAlertsMenu}
              >
                <Bell className={sharedStyle.bell} />
              </button>
            ) : (
              false
            )}
          </div>
          <div className={sharedStyle.msp}>
            <button
              className={`${showMenu ? sharedStyle.blf : ''} ${sharedStyle.bl}`}
              onClick={toggleMenu}
            >
              <div
                className={styles.pfbi}
                style={{ backgroundImage: `url(${me && me.pic})` }}
              ></div>
            </button>
          </div>
        </>
      ) : (
        <div className={sharedStyle.msc}>
          <button
            className={`${showMenu ? sharedStyle.blf : ''} ${sharedStyle.bl}`}
            onClick={toggleMenu}
          >
            <Hamburger className={sharedStyle.bli} />
          </button>
        </div>
      )}
      {isNotificationEnabled() && showAlertsMenu ? (
        <AlertsMenu close={closeAlertsMenu}></AlertsMenu>
      ) : null}

      {showMenu ? <FloatMenu signup={handleSignUp} close={closeMenu} logOut={logOut} /> : null}
    </>
  )
}

export default LoginNav
