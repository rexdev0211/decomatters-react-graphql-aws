import React from 'react'
import styles from './rgi.module.css'
import { ReactComponent as Close } from '../../assets/close.svg'
import { ReactComponent as FB } from '../../assets/facebook.svg'
import { Field, ErrorMessage } from 'formik'

export const RegisterInput = ({ type, name, placeholder, required, error, ...rest }) => (
  <div className={styles.c}>
    <div className={styles.sfw}>
      <div className={styles.sfwi}>
        <Field className={styles.sf} placeholder={placeholder} type={type} name={name} />
      </div>
    </div>
    <div className={styles.e}>{error}</div>
  </div>
)

export const RegisterInputPassword = ({ placeholder, input, label, required, error, ...rest }) => (
  <div className={styles.c}>
    <div className={styles.sfw}>
      <div className={styles.sfwi}>
        <Field className={styles.sf} placeholder={placeholder} type="password" name="password" />
        <div className={styles.sfe}>
          <Close className={styles.ci} />
        </div>
      </div>
    </div>
    <div className={styles.e}>{error}</div>
  </div>
)

export const RegisterButton = ({ title, input, label, required, ...rest }) => (
  <button type="submit" className={styles.pr}>
    {title}
  </button>
)

export const RegisterFBButton = ({ input, label, required, ...rest }) => (
  <button className={styles.fb} id="fbw">
    <FB className={styles.fbi} id="fb" />
    Sign Up with Facebook
  </button>
)
