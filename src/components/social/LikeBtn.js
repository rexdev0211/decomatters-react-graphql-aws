import React, { useEffect, useState } from 'react'
import { ReactComponent as Heart } from '../../assets/social/heart.svg'
import style from './social.module.css'
import { likeUserInspiration, unlikeUserInspiration } from '../../redux/actions/LikeAction'
import { useDispatch, useSelector } from 'react-redux'
import styles from './socialcontainer.module.css'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const LikeBtn = ({ id, noButton, numLikes, loc }) => {
  const dispatch = useDispatch()

  const { likes: likesObj, updatedLikeObj } = useSelector(state => state.like)
  // console.log(likesObj)
  const [objId] = useState(id)
  const [active, setActive] = useState(false)
  const [likeCount, setCount] = useState(numLikes ? numLikes : 0)

  useEffect(() => {
    likesObj && likesObj.includes(objId) ? setActive(true) : setActive(false)
  }, [likesObj, objId])

  useEffect(() => {
    if (updatedLikeObj.id === objId) setCount(updatedLikeObj.numOfLikes)
  }, [updatedLikeObj])

  const like = (objId, likeCount) => {
    const tag = loc + '_like_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(likeUserInspiration(objId, likeCount))
  }

  const unLike = (objId, likeCount) => {
    const tag = loc + '_unlike_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(unlikeUserInspiration(objId, likeCount))
  }

  const likeClick = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    !active ? like(objId, likeCount) : unLike(objId, likeCount)
  }

  return (
    <>
      <div className={style.likeContainer}>
        {noButton === undefined ? (
          <button
            onClick={e => likeClick(e)}
            className={`${active ? style.active : ''} ${style.heartBtn}`}
          >
            <Heart className={style.heart} />
            <span>{active ? 'Liked' : 'Like'}</span>
          </button>
        ) : (
          <div
            onClick={e => {
              likeClick(e)
            }}
            className={`${active ? style.active : ''} ${style.updateBtn}`}
          >
            <Heart className={style.heart} />
            <span className={styles.numLikes}>{isNaN(likeCount) ? 0 : likeCount}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default LikeBtn
