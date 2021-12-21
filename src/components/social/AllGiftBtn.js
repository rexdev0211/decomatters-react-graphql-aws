import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './social.module.css'
import AllGift from '../../assets/social/allgift.png';
// import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openModal } from '../../redux/reducers/GiftReducer'

const AllGiftBtn = ({ num }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.allgiftBtn} onClick={() => dispatch(openModal())}>
      <img src={AllGift} />
      <span>{num}</span>
    </div>
  )
}

export default AllGiftBtn