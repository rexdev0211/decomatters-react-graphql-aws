import {
  DELETE_SAVED_PRODUCTS,
  GET_SAVED_PRODUCTS,
  SAVE_PRODUCT,
  SAVE_ITEM,
  DELETE_SAVED_ITEMS
} from '../../constants/SaveProductConstants'

import { parseHeaders } from '../../util/fetchUtil'
import { gotoLogIn } from './AuthActions'
import verifyEmailAlert from '../../util/verifyEmail'

export function GetAllSavedProducts() {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      pageLimit: 100
      // productIds: productIds
    })
  }
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser, true))
    ) {
      return false
    }
    if (state().auth.isAuthenticated === false) {
      return false
    }
    // dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_GET_ALL_SAVED_PRODUCTS2, appendant)
      const responseJson = await response.json()
      dispatch(getSavedProductsList(responseJson.result.savedProducts))
      // dispatch(saveProductIds(productIds))
      // dispatch(GetProductDetails(responseJson.result.products));
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export function SaveProduct(productIds) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      productIds: productIds
    })
  }
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser))
    ) {
      return false
    }
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    // dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_SAVE_PRODUCT2, appendant)
      const responseJson = await response.json()
      if (responseJson.code === 141) {
        return false
      }
      dispatch(saveProductIds(productIds))
      dispatch(GetAllSavedProducts())
      // dispatch(GetProductDetails(responseJson.result.products));
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export function DeleteSavedProducts(productSavedObjectIds, productId) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      objectIds: productSavedObjectIds
    })
  }
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser))
    ) {
      return
    }
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return
    }
    // dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_DELETE_SAVED_PRODUCT2, appendant)
      await response.json()
      dispatch(deleteSaveProductIds(productSavedObjectIds, productId))
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

//--------------------------------------
// ITEMS
//--------------------------------------

export function SaveItem(itemIds) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({ itemIds })
  }
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser))
    ) {
      return false
    }
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    // dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_SAVE_PRODUCT2, appendant)
      const responseJson = await response.json()
      if (responseJson.code === 141) {
        return false
      }
      dispatch(saveItemIds(itemIds))
      dispatch(GetAllSavedProducts())
      // dispatch(GetProductDetails(responseJson.result.products));
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export function DeleteSavedItems(productSavedObjectIds, itemId) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      objectIds: productSavedObjectIds
    })
  }
  return async (dispatch, state) => {
    if (
      state().auth.user &&
      state().auth.user.puser &&
      !(await verifyEmailAlert(dispatch, state().auth.user.puser))
    ) {
      return
    }
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return
    }
    // dispatch(contentIsLoading())
    try {
      const response = await fetch(process.env.REACT_APP_DELETE_SAVED_PRODUCT2, appendant)
      await response.json()
      dispatch(deleteSaveProductIds(productSavedObjectIds, itemId))
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

//goes to feedareducer here
export const saveProductIds = productIds => {
  return {
    productIds: productIds,
    type: SAVE_PRODUCT
  }
}

export const deleteSaveProductIds = (productSavedObjectIds, productId) => {
  return {
    productId: productId,
    productIds: productSavedObjectIds,
    type: DELETE_SAVED_PRODUCTS
  }
}

export const saveItemIds = itemIds => {
  return {
    itemIds,
    type: SAVE_ITEM
  }
}

export const deleteSaveItemIds = (itemIds, itemId) => {
  return {
    itemId,
    itemIds,
    type: DELETE_SAVED_ITEMS
  }
}

export const getSavedProductsList = data => {
  return {
    data: data,
    type: GET_SAVED_PRODUCTS
  }
}
