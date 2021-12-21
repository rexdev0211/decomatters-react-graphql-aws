import React, { useEffect, useRef } from 'react'
import { getProductByIds } from '../../redux/actions/ProductDetailsActions'
import { useDispatch, useSelector } from 'react-redux'
import styles from './details.module.css'

import { setTabAction } from '../../redux/actions/ProductDetailsTabAction'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

import { getItemsByIds } from '../../redux/reducers/ItemSlice'
import Product from './Product/Product'
import { PriceTagClear } from '../../redux/actions/PriceTagActions'

export const Products = ({ data, ...props }) => {
  const dispatch = useDispatch()
  const { items, similar, loading: itemLoading } = useSelector(state => state.item)
  const { savedProductIds } = useSelector(state => state.saveProduct)
  const { selectedTab } = useSelector(state => state.productTab)

  const { data: productData, recommendedProducts, storeNames, loading } = useSelector(
    state => state.productdetails
  )
  const { productId } = useSelector(state => state.priceTag)
  const navTabList = ['Current']

  useEffect(() => {
    if (!data) return

    if (data.itemIds && data.itemIds.length > 0) {
      dispatch(getItemsByIds(data.itemIds))
      return
    }

    if (data.idea && data.idea.productsWithPosition) {
      if (data.idea.productsWithPosition.length > 0) {
        const its = data.idea.productsWithPosition
        if (its[0].item) {
          const iids = []
          its.forEach(e => {
            if (e.item) iids.push(e.item.objectId)
          })
          dispatch(getItemsByIds(iids))
          return
        }
      }
    }
    if (data.productIds && data.productIds.length > 0) {
      dispatch(getProductByIds(data.productIds))
      return
    }
  }, [dispatch, data])

  const wrapperRef = useRef(null)

  const closeProductBox = target => {
    target.classList.remove(styles.show)
    if (window.innerWidth < 600) document.body.style = 'overflow-y: scroll'
  }

  const clickProducts = e => {
    if (window.innerWidth > 600) return
    if (e.target.classList.contains(styles.show)) {
      closeProductBox(e.target)
      return
    }
    //  openProductBox(e.target)
  }

  const useOutsideAlerter = (ref, closeBox) => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(PriceTagClear())
        //console.log("HERY")
        //closeBox(ref.current)
      }
    }
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
  }
  /*
  if (productId !== '' && productId !== undefined) {
    openProductBox(wrapperRef.current)
  }
*/
  useOutsideAlerter(wrapperRef, closeProductBox)

  return (
    <div ref={wrapperRef} className={styles.products} onClick={clickProducts}>
      {!productId && (
        <Product
          title="Current Items"
          loading={itemLoading}
          data={items}
          name="product"
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
          storeNames={storeNames}
        />
      )}
      {productId && (
        <Product
          title="Similar Items"
          loading={itemLoading}
          data={similar}
          name="product"
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
          storeNames={storeNames}
        />
      )}
    </div>
  )
}
/*
 <div className={styles.rectangle}></div>
      <nav>
        <ul className={styles.productNav}>
          {navTabList.map((tab, index) => {
            return (
              <li
                key={index + tab}
                onClick={() => clickTab(tab)}
                className={`${styles.navItem} ${selectedTab === index ? styles.selected : ''}`}
              >
                {tab}
              </li>
            )
          })}
        </ul>
      </nav>
      <div
        className={`${styles.productContainer} ${
          selectedTab === 0 ? styles.selectedContainer : ''
        }`}
      >
        {showItems && (<ItemList
          productData={items}
          data={data}
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
          name="product"
          storeNames={storeNames}
          loading={itemLoading}
        />)}
        {!showItems && (
          <ProductList
          productData={productData}
          data={data}
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
          name="product"
          storeNames={storeNames}
          loading={loading}
        ></ProductList>
        )}
      </div>

      <div
        className={`${styles.productContainer} ${
          selectedTab === 1 ? styles.selectedContainer : ''
        }`}
      >
        <ProductList
          selectedTab={selectedTab}
          productData={recommendedProducts}
          data={data}
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
          name="similar_product"
          storeNames={storeNames}
          loading={loading}
        ></ProductList>
      </div>

      <div>
        <SaveAllProductsBtn
          allIds={
            selectedTab === 1
              ? recommendedProducts.map(item => item.objectId)
              : productData.map(item => item.objectId)
          }
          savedProductIds={savedProductIds}
          allSavedProducts={props.allSavedProducts}
        />
      </div>
      */
