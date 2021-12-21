import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  claimDailyTaskReward,
  claimWelcomeGiftReward,
  openFollowModal,
  closeModal
} from '../../redux/reducers/CheckInReducer'

import TaskButton from './TaskButton'

import styles from './tl.module.css'
import JoinDailyChallenge from '../../assets/JoinDailyChallenge_bg.png'
import ChallengeRequirement from '../../assets/ChallengeR_bg.png'
import LikeDesigns from '../../assets/LikeDesigns_bg.png'
import VirtualGift from '../../assets/VirtualGift_bg.png'
import FollowDesingers from '../../assets/FollowDesigners_bg.png'
import CreateUsername from '../../assets/CreateUsername_bg.png'
import NewUserChallenge from '../../assets/NewUserChallenge_bg.png'

const backgroundsForTasks = {
  ffTFgusCfz: JoinDailyChallenge,
  rcIEBNmaSr: ChallengeRequirement,
  '1axAkTN3zc': LikeDesigns,
  Xr4CyGw6Jb: VirtualGift,
  kmEXaEWYFG: FollowDesingers,
  '8GORtOEbeF': CreateUsername,
  dIEQgLxtpw: NewUserChallenge
}

const getTaskCardStyle = id => ({
  background: `url(${backgroundsForTasks[id]})`,
  backgroundSize: 'cover',
  backgroundClip: 'border-box',
  borderRadius: 16,
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
})

const TITLE_STYLE = {
  alignSelf: 'start',
  fontSize: 18,
  fontWeight: 'bold',
  letterSpacing: '0.02em'
}

const TaskCard = ({ task, progress, claim, openRelated }) => (
  <div
    className={styles.taskCard}
    style={getTaskCardStyle(task.objectId)}
    onClick={progress.status === 'open' ? openRelated : null}
  >
    <div className={styles.taskCardOverlay} />
    <div className={styles.taskTitle}>
      {task.objectId === 'dIEQgLxtpw' ? 'Join New User Challenge' : task.title}
    </div>
    <div className={styles.progressTracker}>
      <div
        className={progress.status === 'claimed' ? styles.progressBarClaimed : styles.progressBar}
      >
        <div
          style={{
            height: '100%',
            width: `${progress.percentComplete * 100}%`,
            backgroundColor: '#FF5E6D',
            borderRadius: 3.5
          }}
        />
      </div>
      <div
        className={
          progress.status === 'claimed' ? styles.progressCountClaimed : styles.progressCount
        }
      >
        {progress.text}
      </div>
    </div>
    <TaskButton
      onClick={progress.status === 'claimable' ? claim : openRelated}
      disabled={progress.disabled}
      coinReward={task.coinReward}
      status={progress.status}
    />
  </div>
)

const TaskList = () => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(null)

  const { dailyTasks, taskRecord, welcomeTasks, welcomeRecord, loadingStatus } = useSelector(
    state => state.checkIn
  )
  const { recommendedDesigners } = useSelector(state => state.checkIn)
  const { me } = useSelector(state => state.profile)

  if (redirect) {
    dispatch(closeModal())
    return <Redirect to={redirect} />
  }

  if (loadingStatus !== 'loaded') {
    return null
  }

  const {
    rewardedDtIds: rewardedTasks,
    numLikes: numberLikes,
    numFollows: numberFollows,
    numGifts: numberGifts,
    challenge: challenge,
    designWithBrand: challengeWithRequirements
  } = taskRecord

  const joinedNewUserChallenge = welcomeRecord ? welcomeRecord.joinedNewUserChallenge : null

  let numberOfTasks = 4 // change to 5 after virtual gift is enabled
  let numberOfTasksClaimable = 0

  const getProgress = taskId => {
    const determineProgress = (completed, needed) => {
      let progress = {
        percentComplete: Math.min(completed / needed, 1) // Limit the percent complete to 1 (100%). No credit for extra likes!
      }
      if (rewardedTasks && rewardedTasks.includes(taskId)) {
        progress.status = 'claimed'
        progress.percentComplete = 0 // hide the red part of progress bar
        progress.disabled = true
        progress.text = `${needed}/${needed}`
      } else if (completed >= needed) {
        progress.text = `${needed}/${needed}`
        progress.status = 'claimable'
        progress.disabled = false
        numberOfTasksClaimable++
      } else {
        progress.text = `${completed}/${needed}`
        progress.status = 'open'
        progress.disabled = false
      }
      return progress
    }

    switch (taskId) {
      case '1axAkTN3zc': // Like users designs
        return determineProgress(numberLikes || 0, 10) // These values may not be in the task record if they would be at zero, so it's necessary to replace undefined with zero.
      case 'kmEXaEWYFG': // Follow Other Designers
        return determineProgress(numberFollows || 0, 5)
      case 'ffTFgusCfz': // Join Daily Challenge
        return determineProgress(challenge || 0, 1) // Boolean true values like challenge will be coerced to 1 in determine progress.
      case 'rcIEBNmaSr': // Challenge Requirement
        return determineProgress(challengeWithRequirements || 0, 1)
      case 'Xr4CyGw6Jb': // VirtualGift
        return determineProgress(numberGifts || 0, 10)
      case '8GORtOEbeF':
        return determineProgress(me.uniqueDisplayName != null, 1) // displayName is not equal to null or undefined
      case 'dIEQgLxtpw':
        return determineProgress(joinedNewUserChallenge || 0, 1)
      default:
        return { disabled: false, text: '-/-', percentComplete: 0 }
    }
  }

  const getRedirect = taskId => {
    const designerRedirect = route => {
      const onStage = window.location.href.split('.')[0].includes('stage')
      let destination = onStage
        ? `https://designer-stage.decormatters.com${route}`
        : `${process.env.REACT_APP_DESIGNER_URL}${route}`
      window.location.href = destination
    }
    switch (taskId) {
      case 'kmEXaEWYFG':
        // open the Follow Designers modal when clicking on the follow designers task.
        return recommendedDesigners && recommendedDesigners.length
          ? () => dispatch(openFollowModal())
          : null
      case '1axAkTN3zc':
      case 'Xr4CyGw6Jb':
        // open the main page when clicking on the like or virtual gift tasks.
        return () => setRedirect('/')
      case 'ffTFgusCfz':
        // daily challenge
        return () => designerRedirect('/challenges/daily')
      case 'rcIEBNmaSr':
        // challenge w/ requirements
        return () => designerRedirect('/challenges/requirement')
      case 'dIEQgLxtpw':
        // new user challenge
        return () => designerRedirect('/challenges/newuser')
      case '8GORtOEbeF':
        // create username
        return () => setRedirect('/settings')
      default:
        return null
    }
  }

  let taskElements = dailyTasks.map(task => {
    if (task.objectId === 'wqdJDrrozL' || task.objectId === 'Xr4CyGw6Jb') return null // daily reward task is no longer used, and virtual gift is disabled until feature is complete.
    const claim = e => {
      e.stopPropagation()
      dispatch(claimDailyTaskReward(task.objectId))
    }

    let taskProgress = getProgress(task.objectId)
    let openRelated = getRedirect(task.objectId)
    return (
      <TaskCard
        task={task}
        key={task.objectId}
        claim={claim}
        progress={taskProgress}
        openRelated={openRelated}
      />
    )
  })

  let welcomeTaskElements = welcomeTasks.map(task => {
    if (
      (task.objectId !== '8GORtOEbeF' && task.objectId !== 'dIEQgLxtpw') ||
      (welcomeRecord &&
        welcomeRecord.rewardedWgIds &&
        welcomeRecord.rewardedWgIds.includes(task.objectId))
    ) {
      return null
    }

    numberOfTasks++
    const claim = e => {
      e.stopPropagation()
      dispatch(claimWelcomeGiftReward(task.objectId))
    }
    let taskProgress = getProgress(task.objectId)
    let openRelated = getRedirect(task.objectId)
    return (
      <TaskCard
        task={task}
        key={task.objectId}
        claim={claim}
        progress={taskProgress}
        openRelated={openRelated}
      />
    )
  })

  if (welcomeTaskElements.some(task => task !== null)) {
    taskElements = welcomeTaskElements.concat(taskElements)
  }

  if (taskElements.every(element => element === null)) {
    return "You've completed all the tasks for today"
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.taskHeader} style={TITLE_STYLE}>
        Today's tasks &nbsp;
        <span style={{ color: numberOfTasksClaimable > 0 ? '#FF5E6D' : '#9B9B9B' }}>
          {numberOfTasksClaimable}
        </span>
        <span style={{ color: '#9B9B9B' }}>/{numberOfTasks}</span>
      </div>
      <div className={styles.taskContent}>{taskElements}</div>
    </div>
  )
}

export default TaskList
