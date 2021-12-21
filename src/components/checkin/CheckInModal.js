import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  attemptDailyTasksReset,
  closeModal,
  hideReward,
  getRecommendedUsers
} from '../../redux/reducers/CheckInReducer'
import { DMProfilePic } from '@decormatters/dm-theme'
import ModalOverlay from '../common/ModalOverlay'
import CheckInTimer from './CheckInTimer'
import TaskList from './TaskList'
import FollowDesigners from './FollowDesigners'

import styles from './cm.module.css'

import rewardBg from '../../assets/rewardbg.png'
import { ReactComponent as Close } from '../../assets/exit.svg'
import { ReactComponent as CheckIn } from '../../assets/dailycheckin.svg'
import { ReactComponent as Coins } from '../../assets/Coins.svg'
import { ReactComponent as LargeCoin } from '../../assets/coin-with-shadow.svg'

const CONTENT_STYLE = {
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center'
}

const CONGRATS_SCREEN_STYLE = {
  backgroundImage: `url(${rewardBg}), linear-gradient(90.27deg, #FFF1F2 0.24%, #FFFFFF 100.68%)`,
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const CONGRATS_MESSAGE_STYLE = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center'
}

const CheckInModal = () => {
  const dispatch = useDispatch()

  const {
    active,
    autoOpen,
    showReward,
    rewardAmount,
    showFollowModal,
    officialUTCStartHour
  } = useSelector(state => state.checkIn)
  const authenticated = useSelector(state => state.auth.isAuthenticated)
  const me = useSelector(state => state.profile.me)
  const location = useLocation()

  useEffect(() => {
    if (me && me.objectId) {
      dispatch(attemptDailyTasksReset())
      dispatch(getRecommendedUsers())
    }
  }, [me && me.objectId])

  let jsx = null // jsx that the component will return

  if (!me || !authenticated || !officialUTCStartHour) {
    return null
  } else if (showFollowModal) {
    return <FollowDesigners />
  } else if (showReward) {
    jsx = (
      <ModalOverlay>
        <div className={styles.congratsScreen} style={CONGRATS_SCREEN_STYLE}>
          <Coins className={styles.coins} />
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
            <LargeCoin />
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FF5E6D',
                height: 30,
                marginTop: 10,
                marginLeft: 2
              }}
            >
              + {rewardAmount}
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={CONGRATS_MESSAGE_STYLE}>Congratulations!</div>
            <div
              style={{
                fontSize: 18,
                marginTop: 18,
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
                maxWidth: '80vw'
              }}
            >
              You have earned <span style={{ fontWeight: 'bold' }}>+{rewardAmount} Dcoins</span>{' '}
              from daily tasks
            </div>
          </div>
          <button
            className={styles.congratsButton}
            style={{
              height: 42,
              width: 166,
              flex: 'none',
              borderRadius: 72,
              background: '#FF5E6D',
              font: '16px Helvetica Neue',
              color: '#FFFFFF',
              border: 'none',
              position: 'relative',
              fontWeight: 'bold'
            }}
            onClick={() => dispatch(hideReward())}
          >
            Ok
          </button>
        </div>
      </ModalOverlay>
    )
  } else if (active || (autoOpen && location && location.pathname === '/')) {
    // autoOpen if on the default path (the explore page)

    jsx = (
      <ModalOverlay>
        <div className={styles.checkInModal}>
          <div className={styles.rewardPanel}>
            <div style={CONTENT_STYLE}>
              <div className={styles.rewardHeader}>
                {' '}
                <CheckIn style={{ position: 'absolute', left: -38, top: -3 }} /> Daily Check-in{' '}
              </div>
              <div className={styles.welcomeMessage}>Welcome Back!</div>
              <div className={styles.profileCircle}>
                <div
                  style={{
                    background: '#FFFFFF',
                    width: 170,
                    height: 170,
                    margin: 2,
                    borderRadius: '100%',
                    position: 'absolute'
                  }}
                />
                <DMProfilePic pic={me.pic} level={me.userLevel} showLevelBar />
              </div>
              <div className={styles.coinMessage}>
                Complete the daily tasks to earn more Dcoins.
              </div>
              <CheckInTimer UTCStartHour={officialUTCStartHour} />
            </div>
          </div>
          <div className={styles.taskPanel}>
            <div className={styles.closeButton}>
              <Close onClick={() => dispatch(closeModal())} />
            </div>
            <TaskList />
          </div>
        </div>
      </ModalOverlay>
    )
  }

  return jsx
}

export default CheckInModal
