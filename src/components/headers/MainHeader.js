import React from 'react'
import Nav from '../navs/MainNav'
import style from './header.module.css'

const MainHeader = props => {
  return (
    <>
      <header className={style.mainHeader}>
        <Nav slim={props.slim} />
      </header>
      {!props.slim && <div className={style.headerSeparator}></div>}
    </>
  )
}

export default MainHeader
