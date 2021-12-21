import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalContainer } from '../common/ModalContainers'
import { PrimaryButton } from '../common/FormControls'
import styles from '../auth/au.module.css'
import fcStyles from './fc.module.css'
import { CloseModal } from '../../redux/actions/VerifyModalAction'
import Verification from '../../assets/modal/verification.png'
import VerificationCheck from '../../assets/modal/emailverification-checkmark.png'
import { resendVerificationEmail } from '../../redux/actions/AuthActions'

const useOutsideAlerter = (ref, closeMenu) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

const VerifyModalAlert = () => {
  const { active, verified } = useSelector(state => state.verificationModal)
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(CloseModal())
  }

  return <>{active ? <VerficationModal onClose={closeModal} verified={verified} /> : ''}</>
}

export const ResendVerificationButton = props => {
  const email = props.email
  const sendVerificationEmail = (e, email) => {
    e.preventDefault()
    resendVerificationEmail(email).then(() => alert('Email Successfully Resent'))
  }
  return (
    <>
      <div style={{ fontSize: '12px', marginTop: '10px' }}>
        <a href={'#'} onClick={e => sendVerificationEmail(e, email)}>
          Resend Email
        </a>
      </div>
    </>
  )
}
const VerficationModal = props => {
  const { onClose, verified } = props
  const { me } = useSelector(state => state.profile)

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, onClose)

  const getMessage = () => {
    if (verified !== true) {
      return (
        <>
          <h3 className={`${styles.con}`}>To access this feature, please verify your email at:</h3>

          <h3 className={`${styles.con} dmcr`}>{me && me.username ? me.username : ''}</h3>
        </>
      )
    }
    return (
      <>
        <h3 className={`${styles.con}`}>Thank you for confirming your email!</h3>
      </>
    )
  }

  return (
    <ModalContainer onClose={onClose} hideBg={false}>
      <div className={`${fcStyles.verification}`} ref={wrapperRef}>
        <div className={`${styles.con} ${styles.pic}`}>
          <div>
            <img
              className={`${styles.pi} ${fcStyles.verificationPi}`}
              src={verified ? VerificationCheck : Verification}
              alt="verification"
            />
          </div>
        </div>

        {getMessage()}

        <div className={`${styles.btng} ${styles.con}`}>
          <div className={`${styles.btngi} pl-2`}>
            <PrimaryButton onClick={onClose}>
              {verified === true ? 'Explore' : 'Got It'}
            </PrimaryButton>
            {verified !== true && <ResendVerificationButton email={me.email} />}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default VerifyModalAlert
