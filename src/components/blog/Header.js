import React from 'react'
import styles from './headerfooter.module.css'

const BlogHeader = props => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.text}>
          <h1>
            Decor <span>Blog</span>
          </h1>
        </div>
      </div>
    </>
  )
}

export default BlogHeader
