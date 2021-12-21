import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_LOADING,
  NO_PRODUCT_IDS
} from '../../constants/ProductDetailsConstants'
import { parseHeaders } from '../../util/fetchUtil'
import storeData from '../../components/design/store.json'

export function getProductByIds(ids) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      productIds: ids
    })
  }
  return async (dispatch, state) => {
    dispatch(contentIsLoading())
    try {
      /** get related products**/
      const response = await fetch(process.env.REACT_APP_GET_PRODUCTS, appendant)
      const responseJson = await response.json()

      /**only call getstorename once**/
      let storeNameObj = state().productdetails.storeNames

      if (storeNameObj.length === 0) {
        const storeNames = await fetch(process.env.REACT_APP_GET_STORE_NAMES, getStoreNames())
        if (storeNames.status !== 400) {
          const storeJson = await storeNames.json()
          storeNameObj = storeJson.result.stores
          if (storeNameObj.length === 0) {
            storeNameObj = storeData
          }
        }
      }
      /**End get store name**/
      console.log(responseJson.result)
      /** Get recommended objects **/
      const recommended = await fetch(
        process.env.REACT_APP_GET_PRODUCTS,
        getRecommendedProducts(responseJson.result.products)
      )
      const recommendedJson = await recommended.json()
      /** END Get recommended objects **/

      /** batch up recommended and similar items into one dispatch **/
      dispatch(
        GetProductDetails(
          responseJson.result.products,
          recommendedJson.result.products,
          storeNameObj
        )
      )
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export const getStoreNames = () => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders()
  }

  return appendant
}

export function getRecommendedProducts(data) {
  //recommended items
  let recommended = []

  data.map(product => {
    if (product.productRecommendation) {
      product.productRecommendation.map(e => {
        recommended.push(e)
        return null
      })
    }
    return null
  })

  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      productIds: recommended
    })
  }

  return appendant
}

export const GetProductDetails = (data, recommendedProducts, storeNames) => {
  return {
    data: data,
    recommendedProducts: recommendedProducts,
    storeNames: storeNames,
    type: GET_PRODUCT_DETAILS
  }
}

export const contentIsLoading = () => {
  return {
    data: [],
    type: GET_PRODUCT_DETAILS_LOADING
  }
}

export const noProductIds = () => {
  return {
    data: [],
    type: NO_PRODUCT_IDS
  }
}
