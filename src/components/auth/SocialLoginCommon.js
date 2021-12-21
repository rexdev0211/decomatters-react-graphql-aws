import styles from './su.module.css'
import { FBButton, GoogleButton } from '../common/FormControls'
import React from 'react'
import { facebookLogin, googleLogin } from '../../redux/actions/AuthActions'
import Parse from 'parse'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const parseInit = async () => {
  Parse.initialize(process.env.REACT_APP_APPID)
  Parse.serverURL = process.env.REACT_APP_SERVER_URL
}

const loadFacebookSDK = async () => {
  // this.parseInit();

  window.fbAsyncInit = async () => {
    Parse.FacebookUtils.init({
      // this line replaces FB.init({
      appId: process.env.REACT_APP_FB_LOGIN_APP_ID, //"580230315831350", // Facebook App ID
      // status: true, // check Facebook Login status
      cookie: true, // enablße cookies to allow Parse to access the session
      xfbml: true, // initialize Facebook social plugins on the page
      version: 'v3.2' // point to the latest Facebook Graph API version
    })
    // Run code after the Facebook SDK is loaded.
  }
  ;(function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      console.log(d.getElementById(id))
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

parseInit()
loadFacebookSDK()

const SocialLoginCommon = () => {
  const dispatch = useDispatch()
  const fbLogin = e => {
    e.preventDefault()
    dispatch(facebookLogin)
  }

  return (
    <>
      <h2 className={styles.orText}>
        <span className={styles.lineCenter}>OR</span>
      </h2>
      <div className={styles.socialLoginContainer}>
        <FBButton onClick={fbLogin} />
        <GoogleLoginButton />
      </div>
    </>
  )
}

export default SocialLoginCommon

export const GoogleLoginButton = () => {
  const dispatch = useDispatch()
  const successResponseGoogle = response => {
    console.log(response)
    dispatch(googleLogin(response))
  }

  const errorResponseGoogle = response => {
    console.log(response)
    if (response.error) {
      firebase.analytics().logEvent('google_login_error_' + response.error)
      return
    }
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={successResponseGoogle}
      onFailure={errorResponseGoogle}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
      )}
    />
  )
  // const dispatch = useDispatch()
  // const googleLogin = e => {
  //   e.preventDefault()
  //   dispatch(googleLogin)
  //   console.log('googleLogin')
  // }
  // const onSuccess = () => {}
  // const onFailure = () => {}
  // const renderButton = () => {
  //   window.gapi.signin2.render('gSignIn', {
  //     scope: 'profile email',
  //     width: 240,
  //     height: 50,
  //     longtitle: true,
  //     theme: 'dark',
  //     onsuccess: onSuccess,
  //     onfailure: onFailure
  //   })
  // }
  // return (
  //   <>
  //     <div className="g-signin2" data-onsuccess="onSuccess">
  //       fdsafd
  //     </div>
  //     {/*<GoogleButton onClick={googleLogin} />*/}
  //   </>
  // )
}
