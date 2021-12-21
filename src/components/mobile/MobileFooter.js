import React, { useState } from 'react'
import style from './footer.module.css'
import logo from '../../assets/dm.png'
import { isHelpCenterLink } from '../../util/checkHelpcenter'

const MobileFooter = () => {
  const url = 'https://decormatters.app.link/footer'
  const [closed, setClosed] = useState(false)

  const closeFooter = e => {
    setClosed(!closed)
  }

  if (isHelpCenterLink()) return <></>
  return (
    <footer className={`${style.mobileFooterContainer} ${closed ? style.hide : ''}`}>
      <img className={style.logo} src={logo} alt={'logo'} />
      <div className={style.msgHeader}>DecorMatters is better on the app!</div>
      <div className={style.msgContainer}>
        <div className={style.msg}>
          Create beautiful designs, join challenges, and find more inspiration! Only in the app.
        </div>
      </div>
      <button className={style.switchBtn}>
        <a className={style.switchBtn} href={url}>
          Switch to the App
        </a>
      </button>
      <div onClick={closeFooter} className={style.cancelCTA}>
        Not now
      </div>
    </footer>
  )
}

export default MobileFooter
