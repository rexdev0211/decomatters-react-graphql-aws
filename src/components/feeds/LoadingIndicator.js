import style from './loading.module.css'
import React from 'react'
import ReactLogo from '../../assets/lounge.svg'
export const LoadingIndicator = props => {
  const loading = props.loading

  return (
    <>
      {loading && (
        <div className={style.loadingIndicator}>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  )
}

export const LoadingIndicator2 = props => {
  return (
    <>
      {props.loading && (
        <div className={`${style.loadingIndicator} ${style.chair}`}>
          <img src={ReactLogo} alt={'loading'}></img>
        </div>
      )}
    </>
  )
}
