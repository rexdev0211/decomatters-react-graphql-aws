import { GET_DETAILS, GET_DETAILS_LOADING } from '../../constants/DesignDetailsConstants'
import { parseHeaders } from '../../util/fetchUtil'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { logoutExpired } from './AuthActions'

export function getDetailsById(userInspirationId) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      objectId: userInspirationId
    })
  }

  return async dispatch => {
    dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_GET_USER_INSPIRATION, appendant)

      const responseJson = await response.json()
      if (response.status === 400 || responseJson.code === 209) {
        //we need to clear auth
        dispatch(logoutExpired())
        window.location.reload()
      }

      dispatch(GetDetails(userInspirationId, responseJson.result))

      firebase.analytics().logEvent('page_view', {
        content_type: 'inspiration',
        content_id: userInspirationId
      })
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export const GetDetails = (id, data) => {
  return {
    data: data,
    id: id,
    type: GET_DETAILS
  }
}

export const contentIsLoading = () => {
  return {
    data: [],
    type: GET_DETAILS_LOADING
  }
}
