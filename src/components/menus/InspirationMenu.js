import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './im.module.css'
import { MENU_LIST } from '../../constants/MenuConstants'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const InspirationMenu = () => {
  const resetScroll = title => {
    const tag = 'nav_' + title.toLowerCase() + '_clicked'
    firebase.analytics().logEvent(tag)

    //dispatch(setScrollPos(0, history.location.pathname))
  }
  return (
    <ul className={styles.mul}>
      {Object.keys(MENU_LIST).map((key, index) => {
        if (MENU_LIST[key].active !== 0) {
          return (
            <li key={key}>
              <NavLink
                exact
                activeClassName={styles.active}
                className={styles.mla}
                to={MENU_LIST[key].to}
                onClick={() => resetScroll(MENU_LIST[key].title)}
              >
                {MENU_LIST[key].title}
              </NavLink>
            </li>
          )
        }
        return false
      })}
    </ul>
  )
}

export default InspirationMenu
