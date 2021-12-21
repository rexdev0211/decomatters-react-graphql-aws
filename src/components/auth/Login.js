import React from 'react'
import LoginForm from './login/LoginForm'
import styles from './su.module.css'
import AuthContainer from './AuthContainer'
import SocialLoginCommon from './SocialLoginCommon'

const Login = props => {
  const { handleReturn, handleSignUp, handleForget } = props

  return (
    <AuthContainer handleReturn={handleReturn}>
      <div className={styles.hd}>
        <h1>Hi there, welcome back!</h1>
        <p>
          Get inspired, shop your favorite furniture stores and connect with millions of decor
          lovers all in the DecorMatters community.
        </p>
      </div>
      <LoginForm handleReturn={handleReturn} handleForget={handleForget} />
      <SocialLoginCommon />
      <div className={styles.acc}>
        Don't have an account? &nbsp;
        <button className="alsm" onClick={handleSignUp}>
          Join
        </button>
      </div>
    </AuthContainer>
  )
}

export default Login
