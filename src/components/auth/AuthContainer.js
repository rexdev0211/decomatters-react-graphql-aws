import React from 'react'
import { Link } from 'react-router-dom'
import styles from './au.module.css'
import { ReactComponent as Logo } from '../../assets/dm-logo.svg'
import { ReactComponent as Close } from '../../assets/cross.svg'

const AuthContainer = props => {
  const { handleReturn } = props
  const handleReturnClose = () => {
    if (window.location.search.indexOf('designer') > 0) {
      window.location.replace('/')
      return
    }

    if (window.history.length <= 2) {
      window.location.replace('/')
    }

    handleReturn()
    return
  }
  return (
    <div className={styles.acb}>
      <Close className={styles.cl} onClick={handleReturnClose} />
      <div className={styles.ct}>
        <div className={styles.ccl}>
          <Logo className={styles.ccdml} />
        </div>
        <div className={styles.ccf}>
          <Logo className={styles.ccfdml} />
          {props.children}
          <div className={styles.igt}>
            <ul className={styles.ft}>
              <li>By continuing, you agree to DecorMatter's</li>
              <li>
                <Link to="/terms" onClick={() => handleReturn(true)}>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  onClick={() => {
                    handleReturn(true)
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bga}>
        Photo by{' '}
        <a href="https://unsplash.com/@minhphamdesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Minh Pham
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/s/photos/interior?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>
    </div>
  )
}

export default AuthContainer
