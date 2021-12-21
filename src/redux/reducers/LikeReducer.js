import {
  LIKE_CLICKED,
  LIKE_UNCLICKED,
  SET_LIKES,
  RESET_LIKES,
  ALREADY_LIKED,
  ALREADY_UNLIKED
} from '../../constants/LikeConstants'
import { USER_INVALID_SESSION_INVALID } from '../../constants/AuthActionsConstants'

const initialState = {
  likes: [],
  updatedLikeObj: { id: '', numOfLikes: 0 }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_CLICKED: {
      return {
        ...state,
        updatedLikeObj: { id: action.id, numOfLikes: action.numLikes },
        likes: state.likes.concat(action.id) // add to array
      }
    }
    case LIKE_UNCLICKED: {
      return {
        ...state,
        updatedLikeObj: { id: action.id, numOfLikes: action.numLikes },
        likes: state.likes.filter(e => e !== action.id) // remove from array
      }
    }
    case SET_LIKES: {
      return {
        ...state,
        likes: state.likes.concat(
          action.data.currentUserlikes.map(obj => obj.userInspiration.objectId)
        )
      }
    }
    case ALREADY_LIKED: {
      return {
        ...state,
        likes: state.likes.concat(action.id)
      }
    }
    case ALREADY_UNLIKED: {
      return {
        ...state,
        likes: state.likes.filter(e => e !== action.id)
      }
    }

    case RESET_LIKES: {
      return initialState
    }
    case USER_INVALID_SESSION_INVALID: {
      return initialState
    }

    default:
      return state
  }
}
