import React from 'react'
import styles from './userheader.module.css'
import { ReactComponent as ThreeDot } from '../../assets/threedot.svg'
import { useDispatch, useSelector } from 'react-redux'
import { FollowAction, unFollowAction } from '../../redux/actions/FollowingActions'
import { noImageFeed } from '../../util/normalizedata'
import { Link } from 'react-router-dom'

const UserInfoHeader = props => {
  const dispatch = useDispatch()
  const { following } = useSelector(state => state.follows)
  const id = props.data.user.objectId
  const followState = following && following.includes(props.data.user.objectId) ? true : false

  const followClick = e => {
    e.stopPropagation()
    e.preventDefault()
    if (followState) {
      dispatch(unFollowAction(id))
    } else {
      dispatch(FollowAction(id))
    }
  }

  return (
    <>
      <header className={styles.header}>
        <Link to={'/dm/' + id}>
          <img
            alt={props.data.user.uniqueDisplayName}
            className={styles.profileImage}
            src={
              props.data.user.thumbProfileImageFile ? props.data.user.thumbProfileImageFile.url : ''
            }
            onError={noImageFeed}
          />
        </Link>
        <div className={styles.aboutUserContainer}>
          <div className={styles.name}>
            <Link to={'/dm/' + id}>{props.data.user.uniqueDisplayName}</Link>
            <div className={styles.dotsplit} />
            <button
              className={`${styles.followBtn} ${followState ? styles.active : ''}`}
              onClick={followClick}
            >
              {followState ? 'Followed' : 'Follow'}
            </button>
          </div>
          <div className={styles.aboutMe}>{props.data.user.aboutMe}</div>
        </div>
        <button
          className={styles.redesignBtn}
        >
          Redesign
        </button>
        <button
          className={styles.moreBtn}
        >
          <ThreeDot />
        </button>
      </header>
    </>
  )
}

export default UserInfoHeader
