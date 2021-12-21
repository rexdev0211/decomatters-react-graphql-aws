import { deleteCookie, setCookie } from '../util/getUserCookie'

const keyCognitoToken = 'cognitotoken'
const keyCognitoUserId = 'cognitouserid'
const keyParseToken = 'parsetoken_' + process.env.REACT_APP_APPID
const keyParseUserId = 'parseuserid_' + process.env.REACT_APP_APPID
const keyUser = 'user_' + process.env.REACT_APP_APPID
const verified = 'newVerified'
export const cognitoUserId = () => {
  return localStorage.getItem(keyParseUserId)
}

export const cognitoToken = () => {
  return localStorage.getItem(keyParseToken)
}

export const parseUserId = () => {
  return localStorage.getItem(keyParseUserId)
}

export const parseToken = () => {
  return localStorage.getItem(keyParseToken)
}

const getUser = () => {
  return JSON.parse(localStorage.getItem(keyUser))
}

export const user = () => {
  return getUser()
}

export const me = () => {
  const u = getUser()
  if (!u) return null
  return u.puser
}

export const getUserId = () => {
  const user = getUser()
  return user && user.puser !== null && user.puser.objectId ? user.puser.objectId : null
}

export const setNewVerified = () => {
  localStorage.setItem(verified, 1)
}

export const getNewVerified = () => {
  return parseInt(localStorage.getItem(verified))
}

export const setUserCookie = () => {
  setCookie(keyUser, user())
}

export const setAuthStorage = (puserid, ptoken, cuserid, ctoken, user) => {
  if (puserid) localStorage.setItem(keyParseUserId, puserid)
  if (ptoken) localStorage.setItem(keyParseToken, ptoken)
  if (ctoken) localStorage.setItem(keyCognitoToken, ctoken)
  if (cuserid) localStorage.setItem(keyCognitoUserId, cuserid)

  if (ptoken === undefined && user.puser.sessionToken) {
    localStorage.setItem(keyParseToken, user.puser.sessionToken)
  }

  setCookie(keyUser, user)
  localStorage.setItem(keyUser, JSON.stringify(user))
}

export const deleteAuthStorage = () => {
  localStorage.removeItem(keyCognitoToken)
  localStorage.removeItem(keyCognitoUserId)
  localStorage.removeItem(keyParseToken)
  localStorage.removeItem(keyParseUserId)
  localStorage.removeItem(keyUser)
  localStorage.removeItem(verified)
  deleteCookie(keyUser)
  deleteCookie('user')
}

export const setTokenUserId = (puserid, ptoken) => {
  if (puserid) localStorage.setItem(keyParseUserId, puserid)
  if (ptoken) localStorage.setItem(keyParseToken, ptoken)
}

export const updatePUser = user => {
  const lu = JSON.parse(localStorage.getItem(keyUser))

  lu.puser = {
    ...lu.puser,
    ...user
  }

  const temp = {
    ...lu
  }

  delete temp.puser.ACL
  delete temp.puser.className
  delete temp.puser.membership
  delete temp.puser.badgeRewards
  delete temp.puser.badgesNotStarted
  delete temp.puser.authData
  delete temp.puser.lastCheckinRewardDate
  delete temp.puser.shouldRewardDCDate
  delete temp.puser.__type
  delete temp.puser.dateOfLastLikesPush
  delete temp.puser.declinedPushTypes

  setCookie(keyUser, temp)
  localStorage.setItem(keyUser, JSON.stringify(lu))
}
