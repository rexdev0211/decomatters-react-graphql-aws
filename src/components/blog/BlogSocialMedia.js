import React from 'react'
import styles from './headerfooter.module.css'
import { ReactComponent as PinsIcon } from '../../assets/blog-social/pins.svg'
import { ReactComponent as FBIcon } from '../../assets/blog-social/fb.svg'
import { ReactComponent as TwitterIcon } from '../../assets/blog-social/twitter.svg'
import IGIcon from '../../assets/blog-social/ig.svg'

const BlogSocialMedia = props => {
  return (
    <>
      <ul className={styles.blogSocialMediaContainer}>
        <li>
          <a
            href={'https://www.instagram.com/decormattersapp/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={IGIcon} alt={'igIcon'} />
          </a>
        </li>
        <li>
          <a
            href={'https://www.pinterest.com/DecorMatters/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PinsIcon />
          </a>
        </li>

        <li>
          <a href={'https://twitter.com/DecorMattersApp'} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a
            href={'https://www.facebook.com/decormattersapp/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FBIcon />
          </a>
        </li>
      </ul>
    </>
  )
}

export default BlogSocialMedia
