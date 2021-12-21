import styles from './details.module.css'
import { SaveProductIcon } from './SaveProductIcon'
import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import NoItems from '../../assets/noitems.png'
import { LoadingIndicator2 } from '../feeds/LoadingIndicator'
import { PriceSelected } from './PriceSelected'
import { formatter } from '../../util/normalizedata'

const storeDataMap = (storeNames, id, item) => {
  const filterStore = storeNames.filter(store => store.storeId === id)
  return filterStore[0] !== undefined && filterStore[0].logoUrl !== undefined ? (
    <img className={styles.storeLogo} src={filterStore[0].logoUrl} alt={item.storeName} />
  ) : (
    <div className={styles.storeLogo}>{item.storeName}</div>
  )
}

export const ProductList = ({ data, productData, savedProductIds, loading, ...props }) => {
  const handleToProduct = data => {
    firebase.analytics().logEvent('select_content', {
      content_type: props.name ? props.name : 'product',
      content_id: data.objectId,
      items: [
        {
          name: data.title,
          brand: data.storeId
        }
      ]
    })

    const tag = 'design_' + props.name + '_clicked'
    firebase.analytics().logEvent(tag)

    window.open(data.productUrl, '_blank')
  }

  return (
    <>
      {productData === undefined || productData.length <= 0 ? (
        <div className={styles.noProductItems}>
          <img src={NoItems} alt={'no-items'} /> <p>NO ITEMS YET</p>
        </div>
      ) : loading ? (
        <div className={styles.noProductItems}>
          <LoadingIndicator2 loading={loading} />
        </div>
      ) : null}

      {productData.map((item, index) => {
        var url = 'https://' + item.baseUrl + '/' + item.thumbImageFileLoc + item.thumbImageFileName

        return (
          <div
            id={item.objectId}
            key={item.objectId + index}
            className={`${styles.productItem} 
            ${index + 1 === productData.length ? styles.lastProductItem : ''}`}
          >
            <div className={styles.storeName}>
              {storeDataMap(props.storeNames, item.storeId, item)}
            </div>

            <SaveProductIcon
              savedProductIds={savedProductIds}
              id={item.objectId}
              saveObjectId={props.allSavedProducts[item.objectId]}
              type={item.className}
            />

            <div className={styles.thumbContainer}>
              <div onClick={() => handleToProduct(item)} rel="noopener noreferrer">
                <img
                  alt={item.title ? item.title : 'Decormatters'}
                  className={styles.productImg}
                  src={url}
                  onError={e => (e.target.src = '/onerror.png')}
                />
              </div>
            </div>
            <div className={styles.titlePrice}>
              <p className={styles.itemTitle}>{item.title}</p>
              {item.salePrice && (
                <p className={styles.itemPrice}>{formatter.format(item.salePrice)}</p>
              )}
            </div>

            <PriceSelected id={item.objectId} />
          </div>
        )
      })}

      <div className={`${styles.productItem} ${styles.placeHolder}`} />
      <div className={`${styles.productItem} ${styles.placeHolder}`} />
    </>
  )
}

export default ProductList
