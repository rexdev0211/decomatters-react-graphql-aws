import {
  LIKE_CLICKED,
  LIKE_UNCLICKED,
  GET_LIKES,
  SET_LIKES,
  RESET_LIKES,
  ALREADY_LIKED,
  ALREADY_UNLIKED
} from '../../constants/LikeConstants'

import { requestHelper } from '../actions/InspirationFeedAction'
import { gotoLogIn } from './AuthActions'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import verifyEmailAlert from '../../util/verifyEmail'

export function likeUserInspiration(inspirationId, numLikes) {
  const appendant = requestHelper({ userInspirationObjectId: inspirationId })

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser))
    ) {
      return false
    }

    try {
      dispatch(contentIsLiked(inspirationId, numLikes + 1))
      const response = await fetch(process.env.REACT_APP_LIKE_INSPIRATION, appendant)
      const responseJson = await response.json()

      firebase.analytics().logEvent('like', {
        content_type: 'inspiration',
        content_id: inspirationId
      })

      //user already liked, add to list
      if (responseJson.code === 141) {
        dispatch(alreadyLiked(inspirationId, numLikes))
        return false
      }
      if (responseJson && response.status !== 200) {
        //do something
        dispatch(contentIsUnLiked(inspirationId, numLikes))
        return false
      }
      return true
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export function unlikeUserInspiration(inspirationId, numLikes) {
  const appendant = requestHelper({ userInspirationObjectId: inspirationId })

  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !verifyEmailAlert(dispatch, state().auth.user.puser)
    ) {
      return false
    }
    try {
      dispatch(contentIsUnLiked(inspirationId, numLikes - 1))
      const response = await fetch(process.env.REACT_APP_UNLIKE_INSPIRATION, appendant)
      const responseJson = await response.json()

      firebase.analytics().logEvent('unlike', {
        content_type: 'inspiration',
        content_id: inspirationId
      })

      //user already liked, add to list
      if (responseJson.code === 141) {
        dispatch(alreadyUnLiked(inspirationId, numLikes))
        return false
      }
      if (responseJson && response.status !== 200) {
        dispatch(contentIsLiked(inspirationId, numLikes))
        return false
      }
      return true
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export const contentIsLiked = (id, numLikes) => {
  return {
    id: id,
    numLikes: numLikes,
    type: LIKE_CLICKED
  }
}

export const contentIsUnLiked = (id, numLikes) => {
  return {
    id: id,
    numLikes: numLikes,
    type: LIKE_UNCLICKED
  }
}

export const alreadyLiked = (id, numLikes) => {
  return {
    id: id,
    numLikes: numLikes,
    type: ALREADY_LIKED
  }
}

export const alreadyUnLiked = (id, numLikes) => {
  return {
    id: id,
    numLikes: numLikes,
    type: ALREADY_UNLIKED
  }
}
export const getLikes = likes => {
  return {
    data: likes,
    type: GET_LIKES
  }
}

export const setLikes = likes => {
  return {
    data: likes,
    type: SET_LIKES
  }
}

export const resetLikes = () => {
  return {
    type: RESET_LIKES
  }
}
