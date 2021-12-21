import { requestHelper } from '../redux/actions/InspirationFeedAction'
import { getNewVerified, setNewVerified } from '../storage/authLocalStorage'
import { OpenModal } from '../redux/actions/VerifyModalAction'

const verifyEmailAlert = async (dispatch, user, hideAlert) => {
  if (getNewVerified() === 1) return true

  if (user && (user.emailVerified === undefined || user.emailVerified === false)) {
    //check backend for every action in case user verified while logged in

    if ((await checkBackendVerification(dispatch, user.sessionToken)) === true) return true

    if (!hideAlert) {
      dispatch(OpenModal(false))
      //alert('Please verify your email at: ' + user.email + ' before accessing these features')
      return false
    }
  }
  return true
}

const checkBackendVerification = async (dispatch, sessionToken) => {
  let requestHeader = requestHelper({})
  requestHeader.headers['X-Parse-Session-Token'] = sessionToken

  const response = await fetch(process.env.REACT_APP_GET_ME2, requestHeader)
  const responseJson = await response.json()
  if (response.status === 400) return false

  const userdata = responseJson.result.user

  if ('emailVerified' in userdata && userdata.emailVerified === true) {
    setNewVerified() //update flag so we dont make fetch next time
    dispatch(OpenModal(true))
    return true
  }
  return false
}
export default verifyEmailAlert
