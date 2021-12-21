import React from 'react'
import styles from './mc.module.css'
import { ReactComponent as Close } from '../../assets/close.svg'
import ModalOverlay from './ModalOverlay'
import CloseButton from './CloseButton'

export const AuthModalContainer = ({ wrapperRef, onClose, title, description, children }) => {
  return (
    <ModalOverlay>
      <div ref={wrapperRef}>
        <div className={styles.lo}>
          <div className={styles.inw}>
            <div className={styles.cl}>
              <CloseButton onClose={onClose} />
            </div>
            <div className={styles.in}>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>
  )
}

export const ModalContainer = ({ wrapperRef, onClose, hideBg, children }) => {
  return (
    <ModalOverlay wrapperRef={wrapperRef}>
      <div className={`${styles.lom}  ${!hideBg ? styles.hideBg : ''}`}>
        <div className={styles.clm}>
          <CloseButton onClose={onClose} />
        </div>
        <div className={styles.inco}>{children}</div>
      </div>
    </ModalOverlay>
  )
}
