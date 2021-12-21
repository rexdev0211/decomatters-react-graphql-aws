import React from 'react'
import styles from '../../routes/snd.module.css'

const MyProfile = props => {
  return (
    <iframe
      src={process.env.REACT_APP_DESIGNER_URL + '/myposts'}
      title={'profileIframe'}
      id={'profileIframe'}
      frameBorder="0"
      className={styles.blogIframe}
      style={{ position: 'fixed', overflow: 'hidden', height: '100%', width: '100%', top: '80px' }}
    />
  )
}

export default MyProfile
