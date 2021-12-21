import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/dm-logo.svg'
import styles from './nv.module.css'
import LoginNav from './LoginNav'
import BackButton from './BackButton'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const SecondNav = () => {
  const history = useHistory()

  const handleLogoClick = () => {
    const tag = 'nav_logo_clicked'
    firebase.analytics().logEvent(tag)
  }

  return (
    <>
      <div className={styles.nb}>
        <BackButton {...history} />
        <div className={`${styles.nbl}`}>
          <Link to="/" onClick={handleLogoClick}>
            <Logo className={styles.dml} />
          </Link>
        </div>

        <div className={`${styles.nbs}`}></div>

        <LoginNav />
      </div>
    </>
  )
}

export default SecondNav
