import { GET_DETAILS, GET_DETAILS_LOADING } from '../../constants/DesignDetailsConstants'
import {
  INSPIRATION_GET,
  INSPIRATION_REMOVED,
  INSPIRATION_SAVED
} from '../../constants/SaveInspirationConstants'
import { LIKE_CLICKED, LIKE_UNCLICKED } from '../../constants/LikeConstants'
import { USER_INVALID_SESSION_INVALID } from '../../constants/AuthActionsConstants'

const initialState = {
  data: [],
  objectId: '',
  likes: [],
  feedType: '',
  numLikes: 0,
  savedActive: null,
  loading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_INVALID_SESSION_INVALID: {
      return {
        ...state,
        savedActive: null,
        likes: []
      }
    }
    case GET_DETAILS: {
      return {
        ...state,
        objectId: action.id,
        feedType: action.data.userInspiration.type,
        data: action.data.userInspiration,
        likes: action.data.currentUserlikes ? true : false,
        numLikes: action.data.userInspiration.numLikes,
        loading: false
      }
    }
    case GET_DETAILS_LOADING: {
      return initialState
    }

    case LIKE_CLICKED: {
      return {
        ...state,
        likes: action.id === state.objectId ? true : false,
        numLikes: state.numLikes ? state.numLikes + 1 : 1
      }
    }
    case LIKE_UNCLICKED: {
      return {
        ...state,
        likes: action.id === state.objectId ? false : state.likes,
        numLikes: state.numLikes - 1
      }
    }

    case INSPIRATION_GET: {
      return {
        ...state,
        savedActive: () => {
          return action.data[state.feedType + 'Ids'].includes(state.objectId)
        }
      }
    }
    case INSPIRATION_SAVED: {
      return {
        ...state,
        savedActive: action.id === state.objectId
      }
    }
    case INSPIRATION_REMOVED: {
      return {
        ...state,
        savedActive: !(action.id === state.objectId)
      }
    }
    default:
      return state
  }
}
