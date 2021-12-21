import { GET_FOLLOWING_LIST, UNFOLLOW, ADD_FOLLOW } from '../../constants/FollowingContants'
import { parseHeaders } from '../../util/fetchUtil'
import { parseUserId } from '../../storage/authLocalStorage'
import { gotoLogIn } from './AuthActions'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

export function getFollowList(userId) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      userId: parseUserId()
    })
  }

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      return
    }

    try {
      const response = await fetch(process.env.REACT_APP_GET_ALL_FOLLOWING_IDS, appendant)
      const responseJson = await response.json()
      dispatch(getFollow(responseJson.result))
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export function FollowAction(userIdToFollow) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      userIdToFollow: userIdToFollow
    })
  }

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return
    }
    try {
      const response = await fetch(process.env.REACT_APP_FOLLOW_USER, appendant)
      await response.json()

      firebase.analytics().logEvent('follow', {
        content_type: 'user',
        content_id: userIdToFollow
      })

      const tag = 'design_follow_clicked'
      firebase.analytics().logEvent(tag)

      dispatch(follow(userIdToFollow))
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}
export function unFollowAction(userIdToUnfollow) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      userIdToUnfollow: userIdToUnfollow
    })
  }

  return async dispatch => {
    try {
      const response = await fetch(process.env.REACT_APP_UNFOLLOW_USER, appendant)
      await response.json()

      firebase.analytics().logEvent('unfollow', {
        content_type: 'user',
        content_id: userIdToUnfollow
      })

      const tag = 'design_unfollow_clicked'
      firebase.analytics().logEvent(tag)

      dispatch(unFollow(userIdToUnfollow))
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}
export const getFollow = list => {
  return {
    type: GET_FOLLOWING_LIST,
    list: list
  }
}

export const unFollow = userIdToUnfollow => {
  return {
    type: UNFOLLOW,
    id: userIdToUnfollow
  }
}

export const follow = userIdToFollow => {
  return {
    type: ADD_FOLLOW,
    id: userIdToFollow
  }
}
