import React from 'react'
import { ReactComponent as Share } from '../../assets/social/share.svg'
import style from './social.module.css'
import { OpenShareBox } from '../../redux/actions/ShareAction'
import { useDispatch } from 'react-redux'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import styles from '../blog/bl.module.css'

const ShareBtn = props => {
  const { id, imgUrl, loc, type, customUrl } = props
  const dispatch = useDispatch()

  //add share type/icon here
  const shareType = () => {
    switch (type) {
      case 'blog':
        return (
          <div className={`${styles.bs} ${style.blogShareIcons}`}>
            <div className={styles.shareButtonIcon} />
          </div>
        )
      default:
        return (
          <>
            <Share className={style.share} /> <span className={style.shareText}>Share</span>
          </>
        )
    }
  }

  const shareClick = e => {
    //get location of current share button to display popup next to it
    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = e.target.getBoundingClientRect()
    const offset = elemRect.top - bodyRect.top

    let leftPos = elemRect.left - 545
    if (elemRect.left < bodyRect.width / 2) {
      leftPos = elemRect.left - 25
    }

    if (bodyRect.width / 2 < 300) {
      leftPos = 0
    }
    const shareData = {
      id: id,
      imgUrl: imgUrl,
      position: { top: offset + 30, left: leftPos },
      customUrl: customUrl,
      shareType: type ? type : 'design'
    }

    const tag = loc + '_share_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(OpenShareBox(shareData))
  }

  return (
    <div className={`${style.shareContainer} ${type === 'blog' ? style.blogContainer : null}`}>
      <div onClick={shareClick} className={`${style.updateBtn}`}>
        {shareType()}
      </div>
    </div>
  )
}

export default ShareBtn
