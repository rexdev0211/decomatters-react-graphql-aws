import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './social.module.css'
import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openModal } from '../../redux/reducers/GiftReducer'

const GiftBtn = ({ noButton }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.giftContainer}>
      <button className={styles.giftBtn} onClick={() => dispatch(openModal())}>
        <Gift style={{ height: 23, width: 23, marginLeft: -3, marginRight: -3 }} />
        <span>Gift</span>
      </button>
    </div>
  )
}

export default GiftBtn
