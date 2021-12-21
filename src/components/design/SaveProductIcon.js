import React from 'react'
import { ReactComponent as Save } from '../../assets/social/save.svg'
import styles from './details.module.css'
import { useDispatch } from 'react-redux'
import {
  SaveProduct,
  DeleteSavedProducts,
  SaveItem,
  DeleteSavedItems
} from '../../redux/actions/SaveProductAction'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { PriceTagClear } from '../../redux/actions/PriceTagActions'

export const SaveProductIcon = ({ id, savedProductIds, saveObjectId, type }) => {
  const dispatch = useDispatch()

  //check if product is saved or not yet
  const savedProduct = savedProductIds && savedProductIds.length > 0 && savedProductIds.includes(id)

  const clicked = () => {
    dispatch(PriceTagClear())
    if (savedProduct) {
      firebase.analytics().logEvent('unsave', {
        content_type: 'product',
        content_id: saveObjectId
      })

      const tag = 'design_productunsave_clicked'
      firebase.analytics().logEvent(tag)

      if (type === 'Item') {
        dispatch(DeleteSavedItems([saveObjectId], [id]))
        return
      }
      //product currently saved. Need to delete
      dispatch(DeleteSavedProducts([saveObjectId], [id]))
    } else {
      firebase.analytics().logEvent('save', {
        content_type: 'product',
        content_id: saveObjectId
      })

      const tag = 'design_productsave_clicked'
      firebase.analytics().logEvent(tag)

      if (type === 'Item') {
        dispatch(SaveItem([id]))
        return
      }
      //product not saved
      dispatch(SaveProduct([id]))
    }
  }

  return (
    <div
      className={`${styles.saveIconContainer} ${savedProduct ? styles.active : ''} `}
      onClick={clicked}
    >
      <Save className={styles.saveIcon} />
    </div>
  )
}
