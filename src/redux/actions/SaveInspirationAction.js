import {
  INSPIRATION_GET,
  INSPIRATION_REMOVED,
  INSPIRATION_SAVED
} from '../../constants/SaveInspirationConstants'
import { requestHelper } from '../actions/InspirationFeedAction'
import { gotoLogIn } from './AuthActions'
import { updateQuest } from './QuestActions'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import verifyEmailAlert from '../../util/verifyEmail'

//TODO: get initial feeds
export function getSavedUserInspiration(types) {
  const appendant = requestHelper({ types: ['design', 'pgc', 'blog'] })
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser, true))
    ) {
      return false
    }
    if (state().auth.isAuthenticated === false) {
      return false
    }
    try {
      // dispatch(contentIsLiked(inspirationId));
      const response = await fetch(process.env.REACT_APP_GET_ALL_SAVED_IDS, appendant)
      const responseJson = await response.json()

      if (response.status === 200) dispatch(getSavedInspiration(responseJson.result))
      return true
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export function saveInspiration(inspirationId, type) {
  const appendant = requestHelper({ userInspirationIds: [inspirationId] })

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    if (state().auth.user && !(await verifyEmailAlert(dispatch, state().auth.user.puser))) {
      return false
    }

    dispatch(updateQuest(0))

    dispatch(inspirationSavedOptimistic(inspirationId, type))
    try {
      // dispatch(contentIsLiked(inspirationId));
      const response = await fetch(process.env.REACT_APP_SAVE_USER_INSPIRATION, appendant)
      const responseJson = await response.json()

      if (response.code === 400 || responseJson.code === 141) {
        dispatch(inspirationRemoveOptimistic(inspirationId, type))
        return false
      }
      firebase.analytics().logEvent('save', {
        content_type: 'inspiration',
        content_id: inspirationId
      })

      dispatch(inspirationSaved(inspirationId, type, responseJson))
      return true
      // console.log(responseJson)
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export function removeInspiration(inspirationId, type) {
  const appendant = requestHelper({ userInsIds: [inspirationId] })

  return async (dispatch, state) => {
    if (state().auth.user && !(await verifyEmailAlert(dispatch, state().auth.user.puser))) {
      return false
    }

    try {
      dispatch(inspirationRemoveOptimistic(inspirationId, type))
      // dispatch(contentIsLiked(inspirationId));
      const response = await fetch(process.env.REACT_APP_ARCHIVE_USER_INSPIRATION, appendant)
      const responseJson = await response.json()
      // console.log(responseJson, type)

      firebase.analytics().logEvent('unsave', {
        content_type: 'inspiration',
        content_id: inspirationId
      })

      dispatch(inspirationRemoved(inspirationId, type, responseJson))
      return true
    } catch (error) {
      //dispatch(likeActionHasErrored(true, error.toString()));
    }
  }
}

export const getSavedInspiration = data => {
  return {
    data: data.userInspirationIds,
    productIds: data.productIds,
    itemIds: data.itemIds,
    type: INSPIRATION_GET
  }
}
export const inspirationSaved = (id, feedType, data) => {
  return {
    id: id,
    data: data,
    feedType: feedType,
    type: INSPIRATION_SAVED
  }
}

export const inspirationSavedOptimistic = (id, feedType) => {
  return {
    id: id,
    feedType: feedType,
    type: INSPIRATION_SAVED
  }
}

export const inspirationRemoveOptimistic = (id, feedType) => {
  return {
    id: id,
    feedType: feedType,
    type: INSPIRATION_REMOVED
  }
}

export const inspirationRemoved = (id, feedType, data) => {
  return {
    id: id,
    feedType: feedType,
    data: data,
    type: INSPIRATION_REMOVED
  }
}
