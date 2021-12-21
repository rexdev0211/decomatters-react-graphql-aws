import styles from './price.module.css'
import React, { useState } from 'react'
import { ReactComponent as TagSelected } from '../../assets/tag-selected.svg'
import { useSelector } from 'react-redux'

export const PriceSelected = props => {
  const [id] = useState(props.id)
  const { productId } = useSelector(state => state.priceTag)

  const showSelect = () => {
    const target = document.getElementById(id)
    if (target === undefined) return <></>
    target.parentNode.scrollTop = target.offsetTop
    return (
      <div className={styles.tagSelected}>
        <TagSelected />
      </div>
    )
  }

  if (productId === id) {
    return showSelect()
  }

  return <></>
}
