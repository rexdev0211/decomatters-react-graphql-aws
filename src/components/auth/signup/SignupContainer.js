import React from 'react'
import styles from '../su.module.css'
import { ReactComponent as Logo } from '../../../assets/dm-logo.svg'

const SignupContainer = props => {
  const { handleReturn } = props

  return (
    <div className={styles.rg}>
      <div className={styles.ig}>
        <Logo className={styles.dml} onClick={handleReturn} />
        <div className={styles.igt}>Design by @geris</div>
      </div>
      <div className={styles.fa}>
        <div className={styles.hd}>{props.children}</div>
      </div>
    </div>
  )
}

export default SignupContainer
