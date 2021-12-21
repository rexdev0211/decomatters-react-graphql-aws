import React from 'react'
import styles from './snd.module.css'
import { ReactComponent as BackBtn } from '../assets/Back.svg'

const BlogPostIframe = props => {
  return (
    <>
      <BackBtn className={`${styles.bbn} ${styles.blogButton}`} onClick={props.goBack} />
      <iframe
        title={'blogIframe'}
        id={'blogIframe'}
        frameBorder="0"
        className={styles.blogIframe}
        src={props.src}
      />
    </>
  )
}

export default BlogPostIframe
