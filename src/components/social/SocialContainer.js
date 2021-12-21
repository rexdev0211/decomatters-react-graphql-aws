import styles from './socialcontainer.module.css'
import ShareMedia from './shareMedia'
import LikeBtn from './LikeBtn'
import SaveBtn from './SaveBtn'
import React from 'react'
import ShareBtn from './ShareBtn'
import SendGiftBtn from './SendGiftBtn'
import AllGiftBtn from './AllGiftBtn';

const SocialContainer = props => {
  const { id, imgUrl, numLikes, type } = props
  return (
    <div className={styles.mediaContainer}>
      <div className={styles.shareMediaContainer}>
        <LikeBtn id={id} noButton={`false`} numLikes={numLikes} loc="design" />
        <SaveBtn type={type} id={id} loc="design" />
        <ShareBtn id={id} imgUrl={imgUrl} loc="design" />
        <SendGiftBtn />
      </div>
      <div className={styles.socialContainer}>
        <AllGiftBtn num={20} />
        {/*<div className={styles.likeContainer}>
          <div className={styles.shareBtnArrow}>
            <ShareBtn id={id} imgUrl={imgUrl} loc="design"></ShareBtn>
          </div>
        </div>

        <div className={styles.saveContainer}>
        </div>*/}
      </div>
    </div>
  )
}

export default SocialContainer
