import {
  GET_MARKET_FEED,
  GET_MARKET_FEED_PAGINATION
} from '../../constants/MarketProductFeedConstants'
import { requestHelper } from './InspirationFeedAction'

export function getMarketProducts1(ids, page) {
  if (!page) page = 0
  const requestBody = {
    categoryIds: [ids],
    skip: page * 10
  }

  //get header and request body
  const appendant = requestHelper(requestBody)

  //getFeed(json.result.userInspirations)
  return async dispatch => {
    // dispatch(contentIsLoading(true));
    try {
      const response3 = await fetch(
        'https://decormatters-prod.herokuapp.com/parse/functions/getMarketProductCategories1',
        appendant
      )
      console.log(response3)
      const response = await fetch(
        'https://decormatters-prod.herokuapp.com/parse/functions/getMarketProducts1',
        appendant
      )
      // dispatch(contentIsLoading(false));
      const responseJson = await response.json()
      console.log(responseJson)
      if (page < 1) {
        dispatch(getFeed(responseJson.result))
      } else {
        dispatch(getFeedPagination(responseJson.result, page))
      }

      // dispatch(contentFetchSuccess(responseJson));
    } catch (error) {
      // dispatch(contentHasErrored(true, error.toString()));
    }
  }
}

export const getFeed = data => {
  return {
    type: GET_MARKET_FEED,
    data: data,
    page: 1
  }
}

export const getFeedPagination = (data, page) => {
  return {
    type: GET_MARKET_FEED_PAGINATION,
    data: data,
    page: page
  }
}
