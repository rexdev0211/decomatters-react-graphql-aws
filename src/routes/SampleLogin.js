import React from 'react'
import getUserCookie from '../util/getUserCookie'
import './samplelogin.css'
import { noImageFeed } from '../util/normalizedata'
import { GoogleLoginButton } from '../components/auth/SocialLoginCommon'

const SampleLogin = () => {
  //check to only allow route for dev/stage env
  if (!!+process.env.REACT_APP_SAMPLE_LOGIN_ENABLED === false) {
    window.location.replace('/')
    return <></>
  }
  const userCookie = getUserCookie()
  console.log(userCookie === {}, userCookie, userCookie.puser)

  const loginRedirect = () => {
    //check domain here
    window.location.replace(
      process.env.REACT_APP_LOGIN_REDIRECT_URL +
        '?r=' +
        encodeURIComponent(process.env.REACT_APP_SAMPLE_LOGIN_URL)
    )
  }

  if (!userCookie.puser) {
    return (
      <>
        <div className={'sampleLogin'}>
          <h1>Awesome Login Proof Of Concept</h1>
          <h3> Pretend this is the designer </h3>
          <h5>Please Login to begin....</h5>
          <div onClick={loginRedirect}>
            <button href={'#'}>LogIn</button>
          </div>
          <div style={{ position: 'relative', display: 'flex' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 400px'
              }}
            >
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={'sampleLogin'}>
          <h1>Successfully Logged In the Awesome Login App</h1>
          <h3>Pretend this is the designer</h3>
          <h5> Userdata for current logged in user:</h5>
          <ul>
            <li>
              Unique Username: <b>{userCookie.puser.uniqueDisplayName}</b>
            </li>
            <li>
              Username: <b>{userCookie.puser.username}</b>
            </li>
            <li>
              Email: <b> {userCookie.puser.email}</b>
            </li>
            <li>
              Profile Image:
              <img
                style={{ width: '30px', height: '30px' }}
                src={userCookie.puser.cfTbImageUrl ? userCookie.puser.cfTbImageUrl : '1'}
                onError={noImageFeed}
                alt={'img'}
              />
            </li>
            <li>
              <button
                onClick={() =>
                  window.location.replace(
                    '/logout?r=' + encodeURIComponent(process.env.REACT_APP_SAMPLE_LOGIN_URL)
                  )
                }
              >
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

export default SampleLogin
