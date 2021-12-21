import React from 'react'
import styles from './vr.module.css'
import { Link } from 'react-router-dom'
import { SubmitButton } from '../components/common/FormControls'
import { useSelector, useDispatch } from 'react-redux'
import { resendConfirmationEmail as resendAction } from '../redux/actions/AuthActions'

const Verify = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  if (!user) return <div></div>

  const onSubmit = () => {
    try {
      dispatch(resendAction(user))
        .then(() => {})
        .catch(error => {})
    } catch (error) {}
  }

  return (
    <div className={styles.ov}>
      <div className={styles.low}>
        <div className={styles.lo}>
          <div className={styles.in}>
            <h1>Please verify your email</h1>
            <p>Almost finished signing up! We sent an email to</p>
            {user ? <p>{user.attributes.email}</p> : null}
          </div>
          <div className={styles.bd}>
            <SubmitButton title="Resend Email" onClick={onSubmit} />
            <div className={styles.acc}>
              Having problems?&nbsp;
              <Link className={styles.sc} to="/signup">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
