import React from 'react'
import { ReactComponent as Save } from '../../assets/social/save.svg'
import styles from './details.module.css'
import { useDispatch } from 'react-redux'
import { SaveProduct, DeleteSavedProducts } from '../../redux/actions/SaveProductAction'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

export const SaveAllProductsBtn = ({ allIds, savedProductIds, allSavedProducts }) => {
  const dispatch = useDispatch()

  //check if all products on the deisgn page is checked/saved
  //if anything remaining, not all products saved
  let allSavedProductsCheck = allIds.filter(productId => {
    if (savedProductIds && savedProductIds.length > 0 && savedProductIds.includes(productId)) {
      return ''
    }
    return productId
  })

  const save = e => {
    e.stopPropagation()

    //only saved items not saved yet
    if (allSavedProductsCheck.length > 0) {
      const tag = 'design_productsaveall_clicked'
      firebase.analytics().logEvent(tag)

      dispatch(SaveProduct(allSavedProductsCheck))
    } else {
      //delete all items by ObjectId, not product id.
      //thats why we need to do lookup to get saved object id
      let objectToDelete = []

      allIds.forEach(item => {
        if (allSavedProducts[item] !== undefined) objectToDelete.push(allSavedProducts[item])
      })

      const tag = 'design_productunsaveall_clicked'
      firebase.analytics().logEvent(tag)

      dispatch(DeleteSavedProducts(objectToDelete, allIds))
    }
  }
  return (
    <div className={allIds.length === 0 ? styles.hideSaveAll : styles.showSaveAll}>
      <div
        onClick={save}
        className={`${styles.saveAll} ${allSavedProductsCheck.length === 0 ? styles.active : null}`}
      >
        <Save className={`${styles.save}`} />
        <span>{allSavedProductsCheck.length > 0 ? 'Save All' : 'Unsave'}</span>
      </div>
    </div>
  )
}
