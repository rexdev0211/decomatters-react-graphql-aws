import React from 'react'
import { ReactComponent as CopyLink } from '../../assets/CopyLink.svg'
import { PinterestShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'

import { ReactComponent as PinsIcon } from '../../assets/social/pins.svg'
import { ReactComponent as FBIcon } from '../../assets/social/fb.svg'
import { ReactComponent as TwitterIcon } from '../../assets/social/twitter.svg'
import styles from './sharemedia.module.css'

import * as firebase from 'firebase/app'
import 'firebase/analytics'

export const ShareMedia = props => {
  //const shareUrl = window.location.href + `design/${props.id}`
  const shareUrl = !props.customUrl
    ? process.env.REACT_APP_SOCIAL_MEDIA_SHARE_URL + props.id
    : process.env.REACT_APP_SOCIAL_MEDIA_BLOG_URL + props.customUrl

  const shareClick = e => {
    e.stopPropagation()
    // const currentUrl = new URL(window.location.href)

    const newClipboard = document.createElement('textarea')
    // and give it some content
    newClipboard.value = shareUrl
    document.body.appendChild(newClipboard)
    newClipboard.select()
    document.execCommand('copy')
    document.body.removeChild(newClipboard)
    alert('Url is copied to clipboard! Feel free to share this inspiration to others!')

    handleShare('Link')
  }

  const textGenerator = text => {
    if (window.innerWidth > 600) {
      return text
    }

    return 'Share to ' + text
  }

  const handleShare = method => {
    if (props.customUrl) {
      firebase.analytics().logEvent('share', {
        content_type: 'blog',
        content_id: props.customUrl,
        method: method
      })
    } else {
      firebase.analytics().logEvent('share', {
        content_type: 'inspiration',
        content_id: props.id,
        method: method
      })
    }
  }

  const getShareTitle = () => {
    switch (props.shareSrc) {
      case 'blog':
        return 'Take a look at this blog! '
      default:
        return 'Check Out This Design! '
    }
  }
  return (
    <>
      <div className={`${styles.socialNetworkContainer} ${props.type === 'box' ? styles.box : ''}`}>
        <ul>
          <li>
            <PinterestShareButton
              className={styles.socialComponentContainer}
              url={shareUrl}
              media={props.imgUrl}
              onClick={() => handleShare('Pinterest')}
            >
              <div className={styles.icon}>
                <PinsIcon className={styles.pins} />
              </div>

              <span
                className={`${props.type === 'box' ? styles.mediaTextActive : styles.mediaText}`}
              >
                {textGenerator('Pinterest')}
              </span>
            </PinterestShareButton>
          </li>
          <li>
            <TwitterShareButton
              className={styles.socialComponentContainer}
              title={getShareTitle()}
              url={shareUrl}
              onClick={() => handleShare('Twitter')}
            >
              <div className={styles.icon}>
                {' '}
                <TwitterIcon className={styles.twtr} />
              </div>

              <span
                className={`${props.type === 'box' ? styles.mediaTextActive : styles.mediaText}`}
              >
                {textGenerator('Twitter')}
              </span>
            </TwitterShareButton>
          </li>
          <li>
            <FacebookShareButton
              className={styles.socialComponentContainer}
              url={shareUrl}
              quote={getShareTitle()}
              onClick={() => handleShare('Facebook')}
            >
              <div className={styles.icon}>
                <FBIcon className={styles.fb} />
              </div>

              <span
                className={`${props.type === 'box' ? styles.mediaTextActive : styles.mediaText}`}
              >
                {textGenerator('Facebook')}
              </span>
            </FacebookShareButton>
          </li>
          <li className={styles.copyLink} onClick={shareClick}>
            <button aria-label={'copy-link'}>
              <div className={styles.icon}>
                <CopyLink className={styles.copyLinkIcon} onClick={shareClick}></CopyLink>
              </div>

              <div
                className={`${props.type === 'box' ? styles.mediaTextActive : styles.mediaText}`}
              >
                Copy Link
              </div>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ShareMedia
