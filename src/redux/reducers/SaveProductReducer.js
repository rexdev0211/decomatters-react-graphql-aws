import {
  GET_SAVED_PRODUCTS,
  SAVE_PRODUCT,
  DELETE_SAVED_PRODUCTS,
  SAVE_ITEM,
  DELETE_SAVED_ITEMS
} from '../../constants/SaveProductConstants'
import { INSPIRATION_GET } from '../../constants/SaveInspirationConstants'
import { USER_INVALID_SESSION_INVALID } from '../../constants/AuthActionsConstants'

const initialState = {
  allSavedProducts: [],
  savedProductIds: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INSPIRATION_GET: {
      const pids = action.productIds ? action.productIds : []
      const iids = action.itemIds ? action.itemIds : []
      return {
        ...state,
        savedProductIds: [...state.savedProductIds, ...pids, ...iids]
      }
    }
    case SAVE_PRODUCT: {
      const saveList = state.savedProductIds.concat(action.productIds)
      return {
        ...state,
        savedProductIds: saveList
      }
    }

    case DELETE_SAVED_PRODUCTS: {
      const filteredItems = state.savedProductIds.filter(item => !action.productId.includes(item))

      return {
        ...state,
        savedProductIds: filteredItems
      }
    }

    case SAVE_ITEM: {
      const saveList = state.savedProductIds.concat(action.itemIds)
      return {
        ...state,
        savedProductIds: saveList
      }
    }

    case DELETE_SAVED_ITEMS: {
      const filteredItems = state.savedProductIds.filter(item => !action.productId.includes(item))

      return {
        ...state,
        savedProductIds: filteredItems
      }
    }
    case GET_SAVED_PRODUCTS: {
      let savedListLookup = []
      let savedList = action.data
      let keys = []

      for (let key in savedList) {
        try {
          if (savedList[key].item.objectId) {
            //console.log(savedList[key].item.objectId, savedList[key].objectId)
            savedListLookup[savedList[key].item.objectId] = savedList[key].objectId
            keys.push(savedList[key].item.objectId)
          } else if (savedList[key].product.objectId) {
            savedListLookup[savedList[key].product.objectId] = savedList[key].objectId
            keys.push(savedList[key].product.objectId)
          } else if (savedList[key].marketProduct.objectId) {
            savedListLookup[savedList[key].marketProduct.objectId] = savedList[key].objectId
            keys.push(savedList[key].marketProduct.objectId)
          }
        } catch (err) {}
      }

      return {
        ...state,
        //need allSavedProducts in order to delete. cant delete by productId, but by the products objectID
        allSavedProducts: savedListLookup,
        savedProductIds: keys
      }
    }

    case USER_INVALID_SESSION_INVALID: {
      return initialState
    }
    default:
      return state
  }
}
