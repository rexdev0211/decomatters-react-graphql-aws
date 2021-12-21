import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_LOADING,
  NO_PRODUCT_IDS
} from '../../constants/ProductDetailsConstants'

const initialState = {
  data: [],
  loading: true,
  allSavedProducts: [],
  recommendedProducts: [],
  storeNames: []
}

const normalizeStoreName = storeNames => {
  let storeObjs = []
  storeNames.map(store => {
    let storeObj = {
      storeId: store.indixStoreId ? store.indixStoreId : store.storeId,
      logoUrl: store.imageName ? store.imageName : store.cfLogoUrl,
      storeName: store.storeName
    }
    return storeObjs.push(storeObj)
  })
  return storeObjs
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAILS: {
      return {
        ...state,
        data: action.data,
        recommendedProducts: action.recommendedProducts,
        storeNames:
          state.storeNames.length === 0 ? normalizeStoreName(action.storeNames) : state.storeNames,
        loading: false
      }
    }
    case GET_PRODUCT_DETAILS_LOADING: {
      return {
        ...state,
        data: [],
        recommendedProducts: [],
        loading: true
      }
    }
    case NO_PRODUCT_IDS: {
      return initialState
    }
    default:
      return state
  }
}
