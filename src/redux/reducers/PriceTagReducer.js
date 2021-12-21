import { CLEAR_PRICE_TAG, CLICK_PRICE_TAG } from '../../constants/PriceTagConstants'

const initialState = {
  productId: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLICK_PRICE_TAG: {
      return {
        ...state,
        productId: action.productId
      }
    }

    case CLEAR_PRICE_TAG: {
      return {
        initialState
      }
    }
    default:
      return state
  }
}
