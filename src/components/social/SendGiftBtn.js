import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './social.module.css'
import Gift from '../../assets/social/gift.png';
// import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openModal } from '../../redux/reducers/GiftReducer'

const SendGiftBtn = ({ noButton }) => {
  const dispatch = useDispatch()

  return (
    <div className={`${styles.updateBtn} ${styles.imgBtn}`} onClick={() => dispatch(openModal())}>
      {/* Not sure why gift svg doesn't work here */}
      <img src={Gift} />
      <span>Send Gift</span>
    </div>
  )
}

export default SendGiftBtn