import { SET_SCROLL_POSITION } from '../../constants/InspirationScrollConstants'
import { SEARCH_KEYWORD } from '../../constants/SearchConstants'
import { GET_FEED } from '../../constants/InspirationFeedConstants'

const initialState = {
  position: 0,
  location: '/'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SCROLL_POSITION: {
      // console.log(action.position)
      return {
        ...state,
        location: action.location,
        position: action.position
      }
    }
    case SEARCH_KEYWORD:
    case GET_FEED:
      return {
        ...state,
        position: 0,
        location: action.location
      }
    default:
      return state
  }
}
