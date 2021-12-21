import React, { useEffect, useRef } from 'react'
import ShareMedia from './shareMedia'
import styles from './social.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { CloseShareBox } from '../../redux/actions/ShareAction'
import { closeModal } from '../../redux/reducers/GiftReducer'
import { ReactComponent as Close } from '../../assets/close.svg'
import ModalOverlay from '../common/ModalOverlay'

const useOutsideAlerter = (ref, closeMenu, active) => {
  const dispatch = useDispatch()

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(closeMenu())
    }
  }

  useEffect(() => {
    if (active) document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

const ShareBox = props => {
  const dispatch = useDispatch()
  const { active, id, imgUrl, position, customUrl, shareType } = useSelector(state => state.share)

  const close = () => {
    wrapperRef.current.className = wrapperRef.current.className + styles.hide
    setTimeout(function() {
      dispatch(CloseShareBox())
      dispatch(closeModal())
    }, 500)
  }

  const wrapperRef = useRef(null)

  const getDynamicStyle = () => {
    if (active && window.innerWidth > 600) {
      return {
        display: 'block',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
        // top: position.top + 'px',
        // left: position.left
      }
    } else if (active && window.innerWidth <= 600) {
      return { display: 'block' }
    } else {
      return {}
    }
  }

  const getTitle = () => {
    let shareText = 'Share This '

    switch (shareType) {
      case 'blog':
        return shareText + 'Blog'
      default:
        return shareText + 'Design'
    }
  }

  useOutsideAlerter(wrapperRef, CloseShareBox, active)
  if (!active) {
    return null;
  }
  return (
    <ModalOverlay>
      <div
        ref={wrapperRef}
        className={`${styles.shareBox} ${!active ? styles.hide : ''}`}
        style={getDynamicStyle()}
      >
        <h2 className={styles.shareHeader}>{getTitle()}</h2>
        <div onClick={close} className={styles.closeBtn}>
          <Close></Close>
        </div>
        <ShareMedia
          shareSrc={shareType}
          id={id}
          imgUrl={imgUrl}
          type={'box'}
          customUrl={customUrl}
        ></ShareMedia>
      </div>
    </ModalOverlay>
  )
}

export default ShareBox
