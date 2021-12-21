import {
  INSPIRATION_GET,
  INSPIRATION_REMOVED,
  INSPIRATION_SAVED,
  SAVE_INSPIRATION_TYPE_LOOKUP
} from '../../constants/SaveInspirationConstants'
import { USER_INVALID_SESSION_INVALID } from '../../constants/AuthActionsConstants'

const initialState = {
  savedList: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INSPIRATION_GET: {
      return {
        ...state,
        savedList: action.data ? action.data : {},
        savedProductIds: action.productIds
      }
    }
    case INSPIRATION_SAVED: {
      const key =
        action.feedType in SAVE_INSPIRATION_TYPE_LOOKUP
          ? SAVE_INSPIRATION_TYPE_LOOKUP[action.feedType]
          : ''

      if (typeof state.savedList !== 'undefined' && key in state.savedList) {
        state.savedList[key].push(action.id)
      } else {
        state.savedList[key] = [action.id]
      }

      return {
        ...state,
        savedList: state.savedList
      }
    }
    case INSPIRATION_REMOVED: {
      const key =
        action.feedType in SAVE_INSPIRATION_TYPE_LOOKUP
          ? SAVE_INSPIRATION_TYPE_LOOKUP[action.feedType]
          : ''

      state.savedList[key] = state.savedList[key].filter(e => e !== action.id)

      return {
        ...state,
        savedList: state.savedList
      }
    }
    case USER_INVALID_SESSION_INVALID: {
      return initialState
    }

    default:
      return state
  }
}
