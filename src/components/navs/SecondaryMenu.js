import React, { useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import styles from './fm.module.css'
import useModal from '../SMS/useModal'
import SMSModal from '../SMS/SMS'
import { useSelector } from 'react-redux'

const useOutsideAlerter = (ref, isShowing, closeMenu) => {
  const history = useHistory()

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target) && !isShowing) closeMenu()
  }

  const handleMouseMoveOutside = event => {
    if (
      history &&
      history.location &&
      history.location.pathname &&
      history.location.pathname.indexOf('/blog/post') > -1 &&
      event.target.tagName === 'IFRAME'
    ) {
      closeMenu()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mouseover', handleMouseMoveOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mouseover', handleMouseMoveOutside)
    }
  })
}

export const goToDesigner = () => {
  window.location.href = process.env.REACT_APP_DESIGNER_URL
}

const SecondaryMenu = props => {
  const { close } = props
  const wrapperRef = useRef(null)
  const { me } = useSelector(state => state.profile)
  const { isShowing, toggle } = useModal()

  useOutsideAlerter(wrapperRef, isShowing, close)
  const closeToggle = () => {
    toggle()
    close()
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.secondaryMenu}
        style={isShowing ? { visibility: 'hidden' } : null}
      >
        <div className={styles.arrw}></div>
        <div className={styles.ms}>
          <ul>
            <li>
              <Link to={'/'} onClick={close} className={styles.sa}>
                Inspirations
              </Link>
            </li>
            {process.env.REACT_APP_DESIGNER_ENABLE === '1' && me !== null && (
              <li>
                <Link onClick={goToDesigner} className={styles.sa}>
                  Create Design
                </Link>
              </li>
            )}
            <li>
              <Link to={'/about'} onClick={close} className={styles.sa}>
                About
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
            <li onClick={toggle}>
              <button className={styles.sa}>Get The App</button>
            </li>
          </ul>
        </div>
      </div>
      <SMSModal isShowing={isShowing} hide={closeToggle} />
    </>
  )
}

export default SecondaryMenu
