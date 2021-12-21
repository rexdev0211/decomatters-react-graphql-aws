import {
  GET_MARKET_FEED,
  GET_MARKET_FEED_PAGINATION,
  GET_MARKET_FEED_WAIT
} from '../../constants/MarketProductFeedConstants'

const initialState = {
  data: [],
  page: 1,
  loading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_FEED: {
      const data = action.data.marketProducts

      return {
        ...state,
        data: [...data],
        page: 1,
        loading: false
      }
    }

    case GET_MARKET_FEED_PAGINATION: {
      return {
        ...state,
        data: [...state.data, ...action.data.marketProducts],
        page: action.page + 1,
        loading: false
      }
    }
    case GET_MARKET_FEED_WAIT: {
      return {
        ...state,
        data: [],
        loading: true
      }
    }
    default:
      return state
  }
}
