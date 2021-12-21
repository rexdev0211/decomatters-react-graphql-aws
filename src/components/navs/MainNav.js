import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import styles from './nv.module.css'
import LoginNav from './LoginNav'
import InspirationMenu from '../menus/InspirationMenu'
import BackButton from './BackButton'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import SearchBox from './SearchBox'

import HelpCenterSearchBox from './HelpCenterSearchBox'
import DesignerLink from '../DesignerLink/DesignerLink'
import { useSelector } from 'react-redux'

const MainNav = props => {
  const history = useHistory()
  const slim = props.slim
  const auth = useSelector(state => state.auth)
  const handleLogoClick = () => {
    const tag = 'nav_logo_clicked'
    firebase.analytics().logEvent(tag)
  }

  return (
    <>
      <div className={`${styles.nb} ${slim ? styles.slimNb : undefined}`}>
        <BackButton {...history} />
        <div className={`${styles.nbl}`}>
          <Link to="/" onClick={handleLogoClick}>
            <div className={styles.logo} />
          </Link>
        </div>

        {slim ? <HelpCenterSearchBox /> : <SearchBox />}

        <div>
          <ul className={`${styles.nbn} ${auth.user ? styles.loggedIn : ''}`}>
            <li>
              <NavLink exact activeClassName={styles.active} to="/">
                Explore
              </NavLink>
            </li>
            <li>
              <Link to={{ pathname: 'https://company.decormatters.com/blog' }} target="_blank">
                Blog
              </Link>
            </li>

            <li>
              <DesignerLink />
            </li>
          </ul>
        </div>
        <LoginNav />
      </div>
      {!slim && (
        <div>
          <InspirationMenu />
        </div>
      )}
    </>
  )
}

export default MainNav
/*
      <div className={styles.msc}>
        <button className={styles.bl} onClick={toggleMenu}>
          <Hamburger className={styles.bli} />
        </button>
      </div>
      */
