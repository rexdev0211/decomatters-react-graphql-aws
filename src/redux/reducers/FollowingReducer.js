import { GET_FOLLOWING_LIST, UNFOLLOW, ADD_FOLLOW } from '../../constants/FollowingContants'

const initialState = {
  following: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING_LIST: {
      return {
        ...state,
        following: action.list.followingIds
      }
    }

    case UNFOLLOW: {
      return {
        ...state,
        following: state.following.filter(e => e !== action.id)
      }
    }

    case ADD_FOLLOW: {
      return {
        ...state,
        following: state.following.concat(action.id)
      }
    }
    default:
      return state
  }
}
