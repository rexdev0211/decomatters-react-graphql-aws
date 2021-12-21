import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalOverlay from '../common/ModalOverlay'
import styles from './fd.module.css'
import { FollowAction, unFollowAction } from '../../redux/actions/FollowingActions'
import { ReactComponent as Close } from '../../assets/exit.svg'
import { closeFollowModalAndUpdate } from '../../redux/reducers/CheckInReducer'

const DesignerCard = ({ name, id, numFollowers, profilePictureUrl, inspirations, followed }) => {
  const dispatch = useDispatch()

  const handleFollow = () => {
    dispatch(FollowAction(id))
  }

  const handleUnfollow = () => {
    dispatch(unFollowAction(id))
  }

  let inspirationImages = inspirations
    .slice(0, 4)
    .map(inspiration => (
      <div
        key={inspiration.objectId}
        className={styles.inspirationImage}
        style={{ backgroundImage: `url(${inspiration.idea.cfThumbImageUrl})` }}
      />
    ))

  return (
    <div className={styles.designerCard} key={id}>
      <div
        className={styles.designerProfile}
        style={{ backgroundImage: `url(${profilePictureUrl})` }}
      />
      <div className={styles.designerDetails}>
        <div className={styles.designerName}>{name}</div>
        <div className={styles.designerFollowerCount}>
          {numFollowers} {numFollowers === 1 ? 'follower' : 'followers'}{' '}
        </div>
        <FollowButton
          following={followed}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      </div>
      <div className={styles.inspirations}>{inspirationImages}</div>
    </div>
  )
}

const FollowDesigners = () => {
  const dispatch = useDispatch()
  const { recommendedDesigners } = useSelector(state => state.checkIn)
  const { following } = useSelector(state => state.follows)
  let designerElements = []
  if (recommendedDesigners && recommendedDesigners.length) {
    designerElements = recommendedDesigners.map(({ user, userInspirations }) => {
      let name = user.uniqueDisplayName || user.username
      let picture = user.thumbProfileImageFile
        ? user.thumbProfileImageFile.url
        : 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
      return (
        <DesignerCard
          key={user.objectId}
          name={name}
          id={user.objectId}
          profilePictureUrl={picture}
          numFollowers={user.numFollowers}
          inspirations={userInspirations}
          followed={following.includes(user.objectId)}
        />
      )
    })
  }

  return (
    <ModalOverlay>
      <div className={styles.followModal}>
        <Close
          className={styles.closeButton}
          onClick={() => dispatch(closeFollowModalAndUpdate())}
        />
        <div className={styles.followHeader}>More people you may like</div>
        <div className={styles.designerList}>{designerElements}</div>
      </div>
    </ModalOverlay>
  )
}

const FollowButton = ({ following, handleFollow, handleUnfollow }) => {
  if (following) {
    return (
      <button onClick={handleUnfollow} className={styles.followButtonFollowing}>
        {' '}
        Following{' '}
      </button>
    )
  } else {
    return (
      <button onClick={handleFollow} className={styles.followButton}>
        {' '}
        Follow{' '}
      </button>
    )
  }
}

export default FollowDesigners
