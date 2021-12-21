import { ReactComponent as Tag } from '../../assets/tag.svg'
import { ReactComponent as ShowProductTag } from '../../assets/showProducts.svg'
import React, { useEffect, useState } from 'react'
import styles from './tag.module.css'
import { PriceTagClick, PriceTagClear } from '../../redux/actions/PriceTagActions'
import { useDispatch, useSelector, batch } from 'react-redux'
import { formatter } from '../../util/normalizedata'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

import { getSimilarItemsByIds } from '../../redux/reducers/ItemSlice'
export const Price = props => {
  const dispatch = useDispatch()
  const { productId } = useSelector(state => state.priceTag)
  const [showTags, setShowTags] = useState(false)
  const [showCTA, setCTA] = useState(false)

  const [haveItems, setHaveItems] = useState(false)
  const [tags, setTags] = useState([])

  useEffect(() => {
    setHaveItems(false)
    setTags([])
    if (!props.data) return
    if (!props.data.idea) return

    const idea = props.data.idea

    if (idea.productsWithPosition && idea.productsWithPosition.length > 0) {
      setHaveItems(true)
      setTags(idea.productsWithPosition)
    }
  }, [props.data])

  const clickPriceTag = (id, pd) => {
    if (!showTags) return

    const tag = 'design_pricetag_clicked'
    firebase.analytics().logEvent(tag)
    firebase.analytics().logEvent('pricetag', {
      content_type: 'product',
      content_id: id
    })

    var similar = []
    if (pd.item) {
      if (pd.item.productRecommendation && pd.item.productRecommendation.length > 0) {
        similar = [id, ...pd.item.productRecommendation]
      }
    }

    batch(() => {
      dispatch(PriceTagClick(id))
      dispatch(getSimilarItemsByIds(similar))
    })
    setCTA(false)
  }

  //auto open CTA products icon
  useEffect(() => {
    const timer = setTimeout(() => setCTA(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const clickDisplayTags = () => {
    const tag = 'design_pricetagdisplaybutton_clicked'
    firebase.analytics().logEvent(tag)

    firebase.analytics().logEvent('pricetagdisplaybutton', {
      content_type: 'inspiration',
      content_id: props.id
    })
    setShowTags(!showTags)
    setCTA(false)
    dispatch(PriceTagClear())
  }

  const getCoordinates = positionData => {
    let x = positionData.centerXRatio >= 1 ? 1 : positionData.centerXRatio
    let y = positionData.centerYRatio >= 1 ? 1 : positionData.centerYRatio

    return {
      position: 'absolute',
      top: y > 0.91 ? y * 91 + '%' : y * 100 + '%',
      left: x >= 0.94 ? x * 94 + '%' : x * 100 + '%'
    }
  }

  const showToolTip = pos => {
    if (
      (!!+process.env.REACT_APP_PRICE_TOOLTIP_ENABLED ? false : true) ||
      process.env.REACT_APP_PRICE_TOOLTIP_ENABLED === undefined
    ) {
      return ' '
    }
    let style = pos.positionData.centerXRatio > 0.5 ? styles.tooltipRight : styles.tooltipLeft
    style += pos.positionData.centerYRatio < 0.3 ? ' ' + styles.top : ' '

    return style
  }

  if (!!+process.env.REACT_APP_PRICE_ENABLED ? false : true) {
    return <></>
  }
  return (
    <div className={showTags ? styles.showTags : ''}>
      {haveItems && (
        <div
          className={`${styles.showPriceTagBtn} ${showCTA ? styles.showCTA : ''}`}
          onClick={clickDisplayTags}
        >
          <Tag className={`${styles.tag} ${styles.show}`} />
          <div className={styles.productText}>View Products</div>
          <ShowProductTag className={styles.showProductTagBubble}></ShowProductTag>
        </div>
      )}
      {haveItems &&
        tags.map((pos, index) => {
          var ptid, ptttl

          if (pos.objectId) {
            ptid = pos.objectId
            ptttl = pos.salePrice ? pos.title + '\n' + formatter.format(pos.salePrice) : pos.title
          }

          if (pos.item && pos.item.objectId) {
            ptid = pos.item.objectId
            ptttl = pos.item.salePrice
              ? pos.item.title + '\n' + formatter.format(pos.item.salePrice)
              : pos.item.title
          }

          if (ptid && pos.positionData.centerYRatio > 0 && pos.positionData.centerXRatio > 0) {
            return (
              <div
                className={`${productId === ptid ? styles.active : ''} ${showToolTip(pos)}`}
                onClick={e => {
                  clickPriceTag(ptid, pos)
                }}
                key={'tag' + ptid + index}
                style={getCoordinates(pos.positionData)}
                titles={ptttl}
              >
                <Tag className={`${styles.tag}`} />
              </div>
            )
          }
          return null
        })}
    </div>
  )
}
