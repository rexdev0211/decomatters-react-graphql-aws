import React from 'react'
import styles from './details.module.css'
import UserInfoHeader from './UserInfoHeader'
import SocialContainer from '../social/SocialContainer'
import { Price } from './Price'

function extractVideoID(url) {
  if (!url) return null
  const youtubeRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const instagramRegExp = /(https?:\/\/(www\.)?)?instagram\.com\/p\/(\w+)/
  const youtubeMatch = url.match(youtubeRegExp)
  const instagramMatch = url.match(instagramRegExp)

  if (youtubeMatch && youtubeMatch[7].length === 11) {
    return 'https://www.youtube.com/embed/' + youtubeMatch[7] + '?playsinline=1'
  } else if (instagramMatch && instagramMatch[3].length === 11) {
    return instagramMatch[0] + '/embed/'
  } else {
    return url
  }
}

export const Main = props => {
  // const dispatch = useDispatch()
  const id = props.id
  const active = props.active

  //check props.data.type to see if VLOG, BLOG, or OTHER
  const media_url = () => {
    const title = props.data.title ? props.data.title : 'Decormatters'

    switch (props.data.type) {
      case 'vlog':
        //invalid url check
        if (props.data.blogUrl.indexOf('http') === -1)
          return <img src={getImageUrl()} alt={title} />

        if (props.data.blogUrl.indexOf('facebook.com') >= 0)
          return (
            <iframe
              title="vlog"
              src={
                'https://www.facebook.com/plugins/video.php?href=' +
                props.data.blogUrl +
                '&show_text=0&width=476'
              }
              width="100%"
              height="100%"
              frameBorder="0"
            >
              Your browser does not support the video tag.
            </iframe>
          )

        return (
          <iframe
            title="vlog"
            src={extractVideoID(props.data.blogUrl)}
            frameBorder="0"
            className={styles.vlog}
          >
            Your browser does not support the video tag.
          </iframe>
        )
      case 'blog':
        //invalid url check
        if (props.data.blogUrl.indexOf('http') === -1)
          return <img src={getImageUrl()} alt={title} />

        return (
          <a href={props.data.blogUrl} target="_blank" rel="noopener noreferrer">
            <img src={getImageUrl()} alt={title} />
          </a>
        )
      default:
        return <img src={getImageUrl()} alt={title} />
    }
  }

  const getImageUrl = () => {
    if (props.data.idea) {
      return props.data.idea.thumbImageFile.url
    }

    if (props.data.feedImageFile) {
      return props.data.feedImageFile.url
    }
  }

  return (
    <>
      <div className={styles.main}>
        <UserInfoHeader {...props} />
        <div className={styles.productImageContainer} style={{ position: 'relative' }}>
          <div className={styles.mContainer}>
            {media_url()}

            <Price {...props} />
          </div>
        </div>
        {/*<div style={{ fontSize: '10px', marginBottom: '10px' }}>{props.data.title}</div>*/}
        <div className={styles.mediaContainer}>
          <SocialContainer
            id={id}
            imgUrl={getImageUrl()}
            active={active}
            numLikes={props.numLikes}
            type={props.data.type}
          />
        </div>
      </div>
    </>
  )
}
