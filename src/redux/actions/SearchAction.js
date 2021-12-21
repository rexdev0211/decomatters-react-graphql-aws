// import { SEARCH_KEYWORD, SEARCH_LOADING } from '../../constants/SearchConstants'
// import * as firebase from 'firebase'
// import { logoutExpired } from './AuthActions'
import { setLikes } from './LikeAction'
import {
  getSearchFeed,
  getSearchFeedPagination,
  requestHelper,
  clearData
} from './InspirationFeedAction'

const PAGE_LIMIT = 48
export const searchByWord = (word, page) => {
  if (!page) page = 0

  // if (page === 0) {
  //   const pageid = id === '' ? 0 : id
  //   firebase.analytics().logEvent('page_view', {
  //     content_type: 'inspirations',
  //     content_id: pageid
  //   })
  // }
  const requestBody = {
    text: word,
    pageLimit: PAGE_LIMIT,
    skip: page * PAGE_LIMIT,
    // types: ['design', 'pgc', 'blog', 'vlog', 'contest']
    kinds: ['featured'] //"featured",
  }

  //get header and request body
  const appendant = requestHelper(requestBody)

  //getFeed(json.result.userInspirations)
  return async dispatch => {
    try {
      if (page < 1) dispatch(clearData())
      const response = await fetch(process.env.REACT_APP_SEARCH_INSPIRATION, appendant)

      const responseJson = await response.json()

      if (page < 1) dispatch(getSearchFeed(responseJson.result, word))
      else {
        dispatch(getSearchFeedPagination(responseJson.result, word, page))
      }
      // if (response.status === 400 || responseJson.code === 209) {
      //   //we need to clear auth
      //   dispatch(logoutExpired())
      //   window.location.reload()
      // }
      // dispatch(contentIsLoading(false, page))
      //
      // if (page < 1) {
      //   dispatch(getFeed(responseJson.result, id))
      // } else {
      //   dispatch(getFeedPagination(responseJson.result, page, id))
      // }

      //likes data come from this call, set to likes action
      dispatch(setLikes(responseJson.result))

      // dispatch(contentFetchSuccess(responseJson));
    } catch (error) {
      // dispatch(contentHasErrored(true, error.toString()));
    }
  }
}
