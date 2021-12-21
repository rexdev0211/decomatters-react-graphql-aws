import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Auth from '../components/auth/Auth'
// import { useHistory } from 'react-router-dom'
import styles from '../components/auth/au.module.css'
import { deleteAuthStorage, setUserCookie } from '../storage/authLocalStorage'
import { requestHelper } from '../redux/actions/InspirationFeedAction'
import LoginDomainCheck from '../util/loginDomainCheck'
import UsernameUpdate from '../components/username/UsernameUpdate'

const Login = props => {
  const auth = useSelector(state => state.auth)
  const [authStatus, setAuthStatus] = useState(null)
  // const history = useHistory()

  const search = window.location.search
  const params = new URLSearchParams(search)
  const url = params.get('r') ? decodeURIComponent(params.get('r')) : '/'

  //check to only allow redirect to decormatters.com or dev (should add env var disable here)
  if (LoginDomainCheck(url) === false) {
    window.location.replace(process.env.REACT_APP_LOGIN_REDIRECT_URL)
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed === false) return
    let requestHeader = requestHelper({})
    const token =
      auth && auth.user && auth.user.puser.sessionToken ? auth.user.puser.sessionToken : false

    //no token - return
    if (!token) {
      setAuthStatus(false)
      return
    }

    //check if token is still valid
    fetch(process.env.REACT_APP_GET_ME2, requestHeader)
      .then(response => {
        console.log(response)
        if (response.status !== 200) return false
        return response.json()
      })
      .then(responseJson => {
        if (!isSubscribed) return
        //invalid token or error, clear current localstorage to start new login flow. Redirect to login
        if (responseJson.code === 209 || responseJson === false) {
          deleteAuthStorage()
          if (url !== '/') window.location.replace('/login?r=' + url)
          else window.location.replace('/login')
          return
        }

        //success /me call. No need to show auth screen, just set cookie and redirect
        setUserCookie()
        setAuthStatus(true)
      })
    return () => {
      isSubscribed = false
    }
  }, [auth, url])
  // console.log(auth, authStatus)
  //verified user and auth, redirect back to landing or redirect URL
  if (
    auth.isAuthenticated &&
    auth.showAuth === false &&
    auth.verified === true &&
    authStatus === true
  ) {
    return (
      <div className={styles.acb}>
        <UsernameUpdate redirectUrl={url} />
      </div>
    )
  }
  //first time loading - show nothing to prevent UI flash
  if (authStatus === null) return <></>

  //show Auth component
  return (
    <>
      <Auth
        redirectCallback={() => {
          params.get('r') ? window.location.replace(params.get('r')) : window.location.replace('/')
        }}
        test={'hi'}
      />
    </>
  )
}

export default Login
