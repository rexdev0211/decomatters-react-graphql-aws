import {
  GET_FEED,
  GET_FEED_WAIT,
  GET_FEED_PAGINATION,
  GET_FEED_LOADING
} from '../../constants/InspirationFeedConstants'
import { LIKE_CLICKED, LIKE_UNCLICKED } from '../../constants/LikeConstants'
import { SEARCH_KEYWORD, SEARCH_PAGINATION_KEYWORD } from '../../constants/SearchConstants'

const initialState = {
  data: [],
  page: 1,
  loading: true,
  currentCategoryId: '',
  searchWord: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED: {
      //      if(state.currentCategoryId === action.currentCategoryId) return {...state}
      return {
        ...state,
        data: [...action.data.userInspirations],
        page: 1,
        loading: false,
        searchWord: ''
      }
    }
    case GET_FEED_PAGINATION: {
      //    if(state.currentCategoryId == action.currentCategoryId) return {...state}
      return {
        ...state,
        data: [...state.data, ...action.data.userInspirations],
        page: action.page + 1,
        loading: false,
        searchWord: ''
      }
    }
    case GET_FEED_WAIT: {
      return {
        ...state,
        data: [],
        loading: true
      }
    }
    case LIKE_CLICKED: {
      let newData = state.data
      newData.forEach(item => {
        if (item.objectId === action.id) {
          item.numLikes++
        }
      })

      return {
        ...state,
        data: newData
      }
    }
    case LIKE_UNCLICKED: {
      let newData = state.data
      newData.forEach(item => {
        if (item.objectId === action.id) {
          item.numLikes--
        }
      })

      return {
        ...state,
        data: newData
      }
    }
    case GET_FEED_LOADING: {
      return {
        ...state,
        data: action.page === 0 ? [] : state.data, // only clear data for new menu
        loading: action.loading
      }
    }
    case SEARCH_KEYWORD: {
      return {
        ...state,
        data: [...action.data.userInspirations],
        page: 1,
        loading: false,
        searchWord: action.searchWord
      }
    }

    case SEARCH_PAGINATION_KEYWORD: {
      return {
        ...state,
        data: [...state.data, ...action.data.userInspirations],
        page: action.page + 1,
        loading: false,
        searchWord: action.searchWord
      }
    }
    default:
      return state
  }
}
