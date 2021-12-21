// import { Auth } from 'aws-amplify'
import {
  REGISTER_USER,
  USER_UPDATE,
  USER_VALID_SESSION_VALID,
  USER_VALID_SESSION_INVALID,
  USER_INVALID_SESSION_INVALID,
  SIGNING_IN,
  SIGNING_IN_VERIFIED,
  SIGNING_UP,
  RETURN_FROM_AUTH
} from '../../constants/AuthActionsConstants'
import { parseHeaders } from '../../util/fetchUtil'
import { startQuest, setIntroQuest, closeQuest } from './QuestActions'

import {
  user as getUserName,
  setAuthStorage,
  deleteAuthStorage,
  setTokenUserId
} from '../../storage/authLocalStorage'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import Parse from 'parse'

import { loadMe } from '../../profile/store/profileReducer'

const anonymousCredentials = (dispatch, history) => {
  dispatch({ type: USER_INVALID_SESSION_INVALID })
  if (history) {
    history.push('/')
  }
}

export const gotoLogIn = () => {
  return dispatch => {
    dispatch({ type: SIGNING_IN })
  }
}

export const gotoLogInAsVerified = () => {
  return dispatch => {
    dispatch({ type: SIGNING_IN_VERIFIED })
  }
}

export const gotoSignUp = () => {
  return dispatch => {
    dispatch({ type: SIGNING_UP })
  }
}

export const returnFromAuth = () => {
  return dispatch => {
    dispatch({ type: RETURN_FROM_AUTH })
  }
}

export const resendVerificationEmail = email => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      email: email
    })
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.REACT_APP_VERIFY, params)
      const responseJson = await response.json()
      firebase.analytics().logEvent('verification_email_sent')
      if (responseJson.error) {
        return reject(responseJson.error)
      } else {
        const result = responseJson.result
        //console.log(result)
        return resolve(result)
      }
    } catch (error) {
      return reject('server')
    }
  })
}

const parseVerify = username => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      username: username,
      emailVerified: true
    })
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.REACT_APP_VERIFY, params)
      const responseJson = await response.json()
      if (responseJson.error) {
        return reject(responseJson.error)
      } else {
        const result = responseJson.result
        //console.log(result)
        return resolve(result)
      }
    } catch (error) {
      return reject('server')
    }
  })
}

export const loginParse = ({ email, password, history }, callback) => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      username: email,
      password: password
    })
  }

  return dispatch => {
    return fetch(process.env.REACT_APP_LOGIN_WITH_EMAIL, params)
      .then(response => response.json())
      .then(json => {
        if (json.code === 101) {
          throw json
        }

        const puser = json.result

        firebase.analytics().logEvent('login')
        firebase.analytics().setUserId(puser.objectId)

        const user = {
          puser,
          cuser: null,
          userConfirmed: puser.emailVerified
        }

        //setTokenUserId(puser.objectId, puser.sessionToken)
        setAuthStorage(puser.objectId, puser.sessionToken, null, null, user)

        dispatch(loadMe({ puser, history })).then(r => {
          if (puser.emailVerified === true) {
            dispatch({ type: USER_VALID_SESSION_VALID })
          } else {
            dispatch({ type: USER_VALID_SESSION_INVALID })
          }
          const newToQuest = setIntroQuest(puser.objectId)
          if (newToQuest === true) dispatch(startQuest(puser.objectId))
          else dispatch(closeQuest())
        })
        // callback()
      })
  }
}

export const logout = history => async (dispatch, state) => {
  // await Auth.signOut()
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({})
  }

  if (!state().auth.user) {
    await fetch(process.env.REACT_APP_LOGOUT, params)
  } else if (state().auth.user.puser.fb && state().auth.user.puser.fb === true) {
    //using this so it clears localstorage cause of fb
    Parse.User.logOut()
    document.location.reload()
  } else {
    await fetch(process.env.REACT_APP_LOGOUT, params)
  }

  deleteAuthStorage()
  anonymousCredentials(dispatch, history)
  firebase.analytics().logEvent('logout')
}

export const logoutExpired = history => async dispatch => {
  deleteAuthStorage()
  anonymousCredentials(dispatch, history)
  // firebase.analytics().logEvent('logoutExpired')
}

export const registerParse = ({ nickname, email, password, history }) => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      username: email,
      password: password,
      uniqueDisplayName: nickname
    })
  }

  return dispatch => {
    return fetch(process.env.REACT_APP_REGISTER_WITH_EMAIL2, params)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          throw json
        }

        const puser = json.result

        firebase.analytics().logEvent('sign_up')
        firebase.analytics().setUserId(puser.objectId)

        const user = {
          puser: puser.user,
          cuser: null,
          userConfirmed: false
        }

        setAuthStorage(puser.objectId, puser.sessionToken, null, null, user)

        dispatch(loadMe({ puser, history })).then(r => {
          dispatch({ type: REGISTER_USER, user: user })
          const newToQuest = setIntroQuest(puser.user.objectId)
          if (newToQuest === true) dispatch(startQuest(puser.user.objectId))
          else dispatch(closeQuest())
        })
      })
  }
}

export const forgotPassword = username => async dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      const params = {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders(),
        body: JSON.stringify({ email: username })
      }

      const response = await fetch(process.env.REACT_APP_REQUEST_PASSWORD_RESET, params)
      const responseJson = await response.json()

      if (responseJson.error) {
        return reject(responseJson.error)
      } else {
        firebase.analytics().logEvent('reset_password_email_sent')
        const user = responseJson.result
        return resolve(user)
      }
    } catch (error) {
      return reject('server')
    }
  })
}

export const facebookLogin = async dispatch => {
  try {
    const user = await Parse.FacebookUtils.logIn()
    const fbUser = await new Promise(resolve => window.FB.api('/me', fbUser => resolve(fbUser)))

    const puser = {
      //uniqueDisplayName: fbUser.name.replace(' ', '_').toLowerCase(),
      uniqueDisplayName: 'DM_User_' + user.id.slice(-2),
      username: fbUser.name.replace(' ', '_').toLowerCase(),
      fb: true,
      emailVerified: true,
      objectId: user.id,
      cfTbImageUrl: 'https://graph.facebook.com/' + fbUser.id + '/picture',
      ...user.attributes
    }

    firebase.analytics().logEvent('fb_login_success')
    loginUserInit(puser, dispatch)
  } catch (error) {
    console.log(error)
    firebase.analytics().logEvent('fb_login_cancelled')
    alert('You cancelled the Facebook login or did not fully authorize.')
  }
}

export const googleLogin = googleUser => async dispatch => {
  try {
    const profile = googleUser.getBasicProfile()
    const authData = {
      id: profile.getId(),
      id_token: googleUser.getAuthResponse().id_token
    }
    const options = {
      authData: authData,
      providerName: 'google'
    }

    const params = {
      method: 'POST',
      mode: 'cors',
      headers: parseHeaders(),
      body: JSON.stringify(options)
    }
    const googleUserLinked = await new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_LINK_USER, params)
        .then(response => {
          return response.json()
          resolve(response)
        })
        .then(resp => {
          const puser = {
            // //     //uniqueDisplayName: fbUser.name.replace(' ', '_').toLowerCase(),
            uniqueDisplayName: 'DM_User_' + resp.result.user.objectId.slice(-2),
            username: googleUser.profileObj.name,
            google: true,
            email: googleUser.profileObj.email,
            emailVerified: true,
            objectId: resp.result.user.objectId,
            cfTbImageUrl: googleUser.profileObj.imageUrl,
            sessionToken: resp.result.user.sessionToken,
            ...resp.result.user
          }
          firebase.analytics().logEvent('google_login_success')
          loginUserInit(puser, dispatch)
        })
    })
  } catch (error) {
    firebase.analytics().logEvent('google_login_cancelled')
    //   console.log(error)
    //   alert('You cancelled the Facebook login or did not fully authorize.')
  }
}

/* Used for google and fb login to setup init state */
const loginUserInit = (puser, dispatch) => {
  firebase.analytics().setUserId(puser.objectId)
  setAuthStorage(puser.objectId, puser.sessionToken, null, null, { puser: puser })

  dispatch(user_valid({ puser: puser }))

  const newToQuest = setIntroQuest(puser.objectId)

  if (newToQuest === true) dispatch(startQuest(puser.objectId))
  else dispatch(closeQuest())
}

/* end loginInit */

export const set_username = (username, dispatch) => {
  let userData = getUserName()

  const user = {
    ...userData.puser,
    uniqueDisplayName: username
  }

  setAuthStorage(null, null, null, null, { puser: user })

  dispatch(user_valid({ puser: user }))
}
export const user_valid = user => {
  return {
    type: USER_VALID_SESSION_VALID,
    user: user
  }
}

export const updateUser = user => {
  return {
    type: USER_UPDATE,
    user: user
  }
}
