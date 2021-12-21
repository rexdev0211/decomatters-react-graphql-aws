import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLogIn, returnFromAuth, gotoSignUp } from '../../redux/actions/AuthActions'
import { AUTH_STATE } from '../../constants/AuthActionsConstants'
import Login from './Login'
import Signup from './Signup'
import VerifyEmailSimpleModal from './VerifyEmailSimpleModal'
import ForgetPasswordModal from './ForgetPasswordModal'
let redirectFn = null //store redirect fn if necessary

const Auth = props => {
  const dispatch = useDispatch()

  const [showForget, setShowForget] = useState(false)
  const { authState, verified } = useSelector(state => state.auth)

  if (redirectFn === null) redirectFn = props.redirectCallback ? props.redirectCallback : false

  const handleReturnRedirect = useCallback(() => {
    if (redirectFn) {
      redirectFn()
      return
    }
    dispatch(returnFromAuth())
  }, [])

  const handleReturn = useCallback(link => {
    if (redirectFn && link !== true) {
      redirectFn()
      return
    }
    dispatch(returnFromAuth())
  }, [])

  const handleLogIn = () => {
    dispatch(gotoLogIn())
  }

  const handleSignUp = () => {
    dispatch(gotoSignUp())
  }

  const handleForget = () => {
    setShowForget(true)
  }

  const handleCloseForget = () => {
    setShowForget(false)
  }

  if (authState === AUTH_STATE.SIGNUP) {
    return (
      <>
        <Signup handleReturn={handleReturn} handleLogIn={handleLogIn} />
        {verified === false && <VerifyEmailSimpleModal onClose={handleReturnRedirect} />}
      </>
    )
  }
  return (
    <>
      <Login handleReturn={handleReturn} handleSignUp={handleSignUp} handleForget={handleForget} />
      {verified === false && <VerifyEmailSimpleModal onClose={handleReturnRedirect} />}
      {showForget === true && <ForgetPasswordModal onClose={handleCloseForget} />}
    </>
  )
}

export default Auth
