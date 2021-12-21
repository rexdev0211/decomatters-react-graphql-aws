import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalOverlay from '../common/ModalOverlay'
import { getVirtualGifts, closeModal } from '../../redux/reducers/GiftReducer'

import styles from './vg.module.css'
import { ReactComponent as Coin } from '../../assets/coin.svg'
import { ReactComponent as Close } from '../../assets/exit.svg'

const GiftSuccessScreen = ({ url, close }) => {
  return (
    <ModalOverlay>
      <div className={styles.giftSuccess} onClick={close}>
        <img src={url} style={{ height: 260, marginTop: 70 }} />
        <div className={styles.giftSuccessMessage}>Success!</div>
        <div className={styles.giftSuccessDetailMessage}>You just sent the gift</div>
        <button
          className={styles.successButton}
        >
          {' '}
          OK{' '}
        </button>
      </div>
    </ModalOverlay>
  )
}

const GiftCard = ({ title, url, coins, id, selected, onClick, gifUrl }) => (
  <div
    className={styles.giftCard}
    style={{ borderColor: selected ? '#FF5E6D' : null }}
    key={id}
    onClick={onClick}
  >
    <img src={selected ? gifUrl : url} alt={title} style={{ height: 80 }} />
    <div className={styles.giftTitle}>{title}</div>
    <div className={styles.giftCost}>{coins} dcoins</div>
  </div>
)

const VirtualGiftModal = () => {
  const dispatch = useDispatch()
  const { virtualGiftList, giftModalOpen } = useSelector(state => state.gift)
  const [selectedId, setSelectedId] = useState(null)
  const [successId, setSuccessId] = useState(null)

  useEffect(() => {
    dispatch(getVirtualGifts())
  }, [])

  const handleClose = () => {
    setSelectedId(null)
    setSuccessId(null)
    dispatch(closeModal())
  }

  if (!giftModalOpen) {
    return null
  } else if (successId && virtualGiftList) {
    return (
      <GiftSuccessScreen
        url={virtualGiftList.find(gift => gift.objectId === successId).imageUrl}
        close={handleClose}
      />
    )
  }

  let gifts = []

  if (virtualGiftList) {
    gifts = virtualGiftList.map(gift => (
      <GiftCard
        title={gift.title}
        url={gift.thumbImageUrl}
        gifUrl={gift.gifUrl}
        coins={gift.numCoins}
        id={gift.objectId}
        selected={gift.objectId === selectedId}
        onClick={() => setSelectedId(gift.objectId)}
      />
    ))
  }

  return (
    <ModalOverlay>
      <div className={styles.giftModal}>
        <Close className={styles.closeButton} onClick={handleClose} />
        <div style={{ display: 'flex' }}>
          <div className={styles.giftHeader}>Send Gifts</div>
          <Coin style={{ height: 24, width: 24, marginTop: 68, marginLeft: 'auto' }} />
          <div className={styles.coinBalance}>Balance: 3,450</div>
        </div>
        <div className={styles.giftList}>{gifts}</div>
        <button
          className={styles.sendButton}
          disabled={!selectedId}
          onClick={() => setSuccessId(selectedId)}
        >
          {' '}
          Send{' '}
        </button>
      </div>
    </ModalOverlay>
  )
}

export default VirtualGiftModal
