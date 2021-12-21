import { SET_PRODUCT_DETAILS_TAB } from '../../constants/ProductDetailsTabConstants'

const initialState = {
  selectedTab: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_DETAILS_TAB: {
      return {
        ...state,
        selectedTab: action.tabId
      }
    }
    default:
      return state
  }
}
