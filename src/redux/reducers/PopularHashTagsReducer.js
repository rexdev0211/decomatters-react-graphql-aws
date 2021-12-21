import {
  GET_POPULAR_HASHTAGS,
  WAIT_GET_POPULAR_HASHTAGS
} from '../../constants/PopularHashTagsConstants'

const initialState = {
  popularHashTags: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR_HASHTAGS: {
      return {
        ...state,
        popularHashTags: action.hashtags,
        loading: false
      }
    }
    case WAIT_GET_POPULAR_HASHTAGS: {
      return {
        ...state,
        loading: true
      }
    }
    default:
      return state
  }
}
