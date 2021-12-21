import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { ModalContainer } from '../common/ModalContainers'
import { PrimaryButton } from '../common/FormControls'
import styles from './au.module.css'
import { ResendVerificationButton } from '../common/VerificationModal'

const VerifyEmailSimpleModal = props => {
  const { onClose } = props
  const { me } = useSelector(state => state.profile)

  const getDisplayName = () => {
    const username = me && me.uniqueDisplayName ? ' ' + me.uniqueDisplayName : ' ' + me.username
    return username
  }
  const defaultProfilePic =
    'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
  const wrapperRef = useRef(null)

  return (
    <ModalContainer onClose={onClose} wrapperRef={wrapperRef}>
      <div className={`${styles.con} ${styles.pic}`}>
        <div className={styles.piw}>
          <img className={styles.pi} src={me.pic} alt="profile" />
        </div>
        <div className={`${styles.pibg}`}></div>
      </div>
      <h1
        className={`${styles.con} ${styles.pdb}`}
        style={{
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        Hi
        <div
          title={getDisplayName()}
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: 0,
            fontSize: '24px'
          }}
        >
          {getDisplayName()}
        </div>
        <div style={{ fontSize: '24px' }}>Welcome To DecorMatters</div>
      </h1>

      <h3 className={`${styles.con}`}>Please check your email and verify:</h3>
      <h3 className={`${styles.con} dmcr`}>{me && me.username ? me.username : ''}</h3>
      <div className={`${styles.btng} ${styles.con}`}>
        <div className={`${styles.btngi} pl-2`}>
          <PrimaryButton onClick={onClose}>Thanks!</PrimaryButton>
          <ResendVerificationButton email={me.email} />
        </div>
      </div>
    </ModalContainer>
  )
}

export default VerifyEmailSimpleModal
