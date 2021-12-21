import { CLICK_PRICE_TAG, CLEAR_PRICE_TAG } from '../../constants/PriceTagConstants'

export const PriceTagClick = id => dispatch => {
  dispatch(PriceTagClickAction(id))
  return true
}

const PriceTagClickAction = id => {
  return {
    type: CLICK_PRICE_TAG,
    productId: id
  }
}

export const PriceTagClear = () => {
  return { type: CLEAR_PRICE_TAG }
}
