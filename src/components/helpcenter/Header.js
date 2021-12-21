import React from 'react'
import styles from './helpcenter.module.css'

const HelpCenterHeader = props => {
  const padding = props.padding
  const { title } = props
  return (
    <>
      <div className={styles.spacer} />
      <div className={`${styles.header} ${padding ? styles.padding : undefined}`}>
        <div className={styles.text}>
          <h1>{title}</h1>
        </div>
      </div>
    </>
  )
}

export default HelpCenterHeader
