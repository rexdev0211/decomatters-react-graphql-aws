import React, { useCallback, useEffect, useState } from 'react'
import ModalCustom from '../SMS/Modal'
// import './app.css'
import './usernameupdate.css'

import styles from '../auth/au.module.css'
import { PrimaryButton } from '../common/FormControls'

import { useDispatch, useSelector } from 'react-redux'

import * as firebase from 'firebase/app'
import 'firebase/analytics'

import { requestHelper } from '../../redux/actions/InspirationFeedAction'
import { set_username } from '../../redux/actions/AuthActions'
import useModal from '../SMS/useModal'

const UsernameUpdate = props => {
  const auth = useSelector(state => state.auth)
  const user = auth.user
  const dispatch = useDispatch()
  const redirectUrl = props.redirectUrl
  const [submitted, setSubmit] = useState(false)
  const [statusMsg, setStatusMsg] = useState(false)
  const [error, setError] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [username, setUsername] = useState('')
  const [disableClick, setDisabledClick] = useState(false) // disable click after success
  const Filter = require('bad-words')

  const { isShowing, setIsShowing } = useModal()

  const defaultProfilePic =
    'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
  // const handleNameChange = phone => {}

  const redirectToUrl = () => {
    if (redirectUrl) return setTimeout(() => window.location.replace(redirectUrl), 500)
  }
  const hideModal = () => {
    setSubmit(false)
    setStatusMsg(false)
    setIsShowing(false)
    redirectToUrl()
  }

  const checkUsernameUpdate = useCallback(() => {
    if (auth && auth.user && auth.user.puser) {
      const fbLogin = auth.user.puser.fb ? auth.user.puser.fb : false

      if (fbLogin && auth.user.puser.uniqueDisplayName.toLowerCase().indexOf('dm_user_') >= 0) {
        // if (fbLogin) {
        setIsShowing(true)
        return
      }

      const googleLogin = auth.user.puser.google ? auth.user.puser.google : false

      if (googleLogin && auth.user.puser.uniqueDisplayName.toLowerCase().indexOf('dm_user_') >= 0) {
        // if (fbLogin) {
        setIsShowing(true)
        return
      }

      redirectToUrl()
      return
    }
  }, [auth, setIsShowing])

  const submitUsername = e => {
    e.preventDefault()

    if (username.length >= 15) {
      return setErrorMessage('Username must be less than 15 characters. Please try again!')
    }

    //check if username is valid
    if (invalidUsernameCheck(username)) {
      return setErrorMessage('Username is inappropriate. Please try again!')
    }

    if (!invalidCharacters(username)) {
      return setErrorMessage('Username contains invalid characters. Please try again!')
    }
    setSubmit(true)
    submitUsernameAPI(username)
  }

  const submitUsernameAPI = username => {
    const success = res => {
      setSubmit(false)
      if (res.code && res.code) {
        return setErrorMessage(res.error.charAt(0).toUpperCase() + res.error.slice(1))
      } else if (res.code) {
        return setErrorMessage(
          'We are currently experiencing technical difficulties. Try again later'
        )
      }
      firebase.analytics().logEvent('FB_UPDATE_USERNAME_SUCCESS')
      // console.log(res)
      setError(false)
      setDisabledClick(true)
      setStatusMsg('Thank you for choosing a username!')
      set_username(username, dispatch)
      setTimeout(() => {
        setCompleted(true)
      }, 2000)
    }

    const appendant = requestHelper({ uniqueDisplayName: username })

    fetch(process.env.REACT_APP_UPDATE_USERNAME, appendant)
      .then(response => response.json())
      .then(success)
  }
  const invalidUsernameCheck = username => {
    const filter = new Filter()
    return filter.isProfane(username)
  }

  const invalidCharacters = username => {
    const RegEx = /[^a-z\d_.]/i
    return !RegEx.test(username)
  }

  const usernameUpdate = e => {
    setUsername(e.target.value)
  }

  const setErrorMessage = msg => {
    setError(true)
    setStatusMsg(msg)
    firebase.analytics().logEvent('FB_UPDATE_USERNAME_ERROR')
    return true
  }

  useEffect(() => {
    checkUsernameUpdate()
  }, [auth, checkUsernameUpdate])

  const getPrimarySubmit = () => {
    if (submitted) {
      return <PrimaryButton>Processing....</PrimaryButton>
    } else {
      return disableClick ? (
        <PrimaryButton>Thank you!</PrimaryButton>
      ) : (
        <PrimaryButton onClick={submitUsername}>Get Started</PrimaryButton>
      )
    }
  }

  return (
    <ModalCustom isShowing={isShowing} hide={hideModal} completeHide={completed} noCloseButton={1}>
      <div className={'username-container'}>
        <div className={`${styles.con} ${styles.pic}`}>
          <div className={styles.piw}>
            <img
              className={styles.pi}
              src={
                user && user.puser && user.puser.cfTbImageUrl
                  ? user.puser.cfTbImageUrl
                  : defaultProfilePic
              }
              alt="profile"
            />
          </div>
          <div className={`${styles.pibg}`}></div>
        </div>
        <h1 className={`${styles.con} ${styles.pdb}`}>
          Hi
          {user && user.puser && user.puser.uniqueDisplayName
            ? ' ' + user.puser.uniqueDisplayName
            : ' ' + ''}
          , <br />
          Welcome to DecorMatters
        </h1>
        <h3 className={`${styles.con}`}>Create Username:</h3>
        <form
          autoComplete={'off'}
          className={'username-form'}
          onSubmit={e => {
            e.preventDefault()
            submitUsername(e)
            return false
          }}
        >
          <input
            type="text"
            name="name"
            onChange={usernameUpdate}
            className={statusMsg ? 'error' : null}
          />
          {error ? (
            <div className={'errorMsg'}>{statusMsg}</div>
          ) : (
            <div className={'statusMsg'}>{statusMsg}</div>
          )}
        </form>

        <div className={`${styles.btng} ${styles.con}`}>
          <div className={`${styles.btngi} pl-2`}>{getPrimarySubmit()}</div>
        </div>
      </div>
    </ModalCustom>
  )
}

export default UsernameUpdate
