import { SET_PRODUCT_DETAILS_TAB } from '../../constants/ProductDetailsTabConstants'

export function setTabAction(id) {
  return {
    tabId: id,
    type: SET_PRODUCT_DETAILS_TAB
  }
}
