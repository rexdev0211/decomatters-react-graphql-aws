import styles from './mc.module.css'
import React, { useEffect } from 'react'

const ModalOverlay = ({ children, wrapperRef }) => {
  useEffect(() => {
    // prevents the rest of the page from scrolling while the modal is open.
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, []) // only cleanup on dismount

  // wrapperRef is optional
  return (
    <div className={styles.ov}>
      <div className={styles.low} ref={wrapperRef}>
        {children}
      </div>
    </div>
  )
}

export default ModalOverlay
