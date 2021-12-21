import React from 'react'
import styles from './su.module.css'
import AuthContainer from './AuthContainer'
import SignupForm from './signup/SignupForm'
import SocialLoginCommon from './SocialLoginCommon'

const Signup = props => {
  const { handleReturn, handleLogIn } = props

  return (
    <AuthContainer handleReturn={handleReturn}>
      <div className={styles.hd}>
        <h1>Join DecorMatters</h1>
        <p>
          Get inspired, shop your favorite furnitures stores and connect with millions of decor
          lovers all in the DecorMatters community.
        </p>
      </div>
      <SignupForm />
      <SocialLoginCommon />
      <div className={styles.acc}>
        Already have an account?&nbsp;
        <button className="alsm" onClick={handleLogIn}>
          Log In
        </button>
      </div>
    </AuthContainer>
  )
}

export default Signup
/*
            <div className={styles.orw}>
              <div className={styles.orb}>
                <div className={styles.orbl} />
              </div>
              <div className={styles.or}>OR</div>
              <div className={styles.orb}>
                <div className={styles.orbl} />
              </div>
            </div>
    */
