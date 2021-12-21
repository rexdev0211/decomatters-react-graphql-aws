import {
  GET_FEED,
  GET_FEED_PAGINATION,
  GET_FEED_LOADING,
  GET_FEED_WAIT
} from '../../constants/InspirationFeedConstants'
import { setLikes } from './LikeAction'
import { parseHeaders } from '../../util/fetchUtil'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { logoutExpired } from './AuthActions'
import { SEARCH_KEYWORD, SEARCH_PAGINATION_KEYWORD } from '../../constants/SearchConstants'
import { MENU_LIST } from '../../constants/MenuConstants'

export const requestHelper = body => {
  return {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify(body)
  }
}

export function getFeeds(id, page) {
  if (!page) page = 0
  const requestBody = {
    pageLimit: 64,
    skip: page * 64,
    // // status: "active",
    kinds: ['featured'], //"featured",
    // sort: "numLikes"
    // types: ["blog", "vlog"]
    types: ['design', 'pgc', 'blog']
    // types: ["pgc"]
    // categoryId: ["16703"]
  }

  return getFeedAPI(requestBody, page)
}

export const getFeedByCatId = (id, page, hashtags) => {
  if (!page) page = 0

  if (page === 0) {
    const pageid = id === '' ? 0 : id
    firebase.analytics().logEvent('page_view', {
      content_type: 'inspirations',
      content_id: pageid
    })
  }
  const requestBody = {
    pageLimit: 64,
    skip: page * 64,
    // // status: "active",
    kinds: ['featured'], //"featured",
    // sort: "numLikes"
    // types: ["blog", "vlog"]
    types: ['design', 'pgc', 'blog', 'vlog', 'contest']
    // hashtags: ['2020']
    // types: ["pgc"]
  }

  //if (id) requestBody['categoryId'] = id
  if (id) requestBody['hashtags'] = hashtags

  return getFeedAPI(requestBody, page, id)
}

const getFeedAPI = (requestBody, page, id) => {
  if (!page) page = 0

  //get header and request body
  const appendant = requestHelper(requestBody)

  //getFeed(json.result.userInspirations)
  return async dispatch => {
    if (page === 0) dispatch(clearData())
    dispatch(contentIsLoading(true, page))
    try {
      const response = await fetch(process.env.REACT_APP_GET_USER_INSPIRATIONS, appendant)

      const responseJson = await response.json()

      if (response.status === 400 || responseJson.code === 209) {
        //we need to clear auth
        dispatch(logoutExpired())
        window.location.reload()
      }
      dispatch(contentIsLoading(false, page))

      if (page < 1) {
        dispatch(getFeed(responseJson.result, id))
      } else {
        dispatch(getFeedPagination(responseJson.result, page, id))
      }

      //likes data come from this call, set to likes action
      dispatch(setLikes(responseJson.result))

      // dispatch(contentFetchSuccess(responseJson));
    } catch (error) {
      // dispatch(contentHasErrored(true, error.toString()));
    }
  }
}

export const getFeed = (data, currentCategoryId) => {
  return {
    type: GET_FEED,
    data: data,
    page: 1,
    currentCategoryId: currentCategoryId
  }
}

export const getFeedPagination = (data, page, currentCategoryId) => {
  return {
    type: GET_FEED_PAGINATION,
    data: data,
    page: page,
    currentCategoryId: currentCategoryId
  }
}

export const contentIsLoading = (loading, page) => {
  return {
    page: page,
    type: GET_FEED_LOADING,
    loading: loading
  }
}

export const getSearchFeed = (data, word) => {
  return {
    type: SEARCH_KEYWORD,
    data: data,
    page: 1,
    searchWord: word
  }
}

export const getSearchFeedPagination = (data, word, page) => {
  return {
    type: SEARCH_PAGINATION_KEYWORD,
    data: data,
    page: page,
    searchWord: word
  }
}

export const clearData = () => {
  return {
    type: GET_FEED_WAIT
  }
}
