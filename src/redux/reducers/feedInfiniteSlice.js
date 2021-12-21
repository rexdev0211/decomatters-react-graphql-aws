import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { go } from '../../util/fetchUtil'
import { FEED_RESET, FEED_HARD_RESET } from '../constants'
import { DEV_ENDPOINT, PROD_ENDPOINT } from '../../profile/store/constants'
// Cache
const countersByName = {}
const pageLimit = 15

export const checkFeedEnd = (status, pageNum, isPageEnd) => {
  var nextPage = pageNum
  if (isPageEnd === true) return -1
  if (status === FEED_RESET || status === FEED_HARD_RESET) nextPage = 0
  return nextPage
}

export const fetchFeed = sliceName =>
  createAsyncThunk(`${sliceName}/fetchFeed`, async ({ status }, { getState }) => {
    const { page, end, endpoint, attr } = getState()[sliceName]

    const nextPage = checkFeedEnd(status, page, end)
    if (nextPage === -1) return null

    var body = {
      skip: nextPage * pageLimit,
      pageLimit: pageLimit
    }

    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    var url = ep + endpoint

    if (status !== FEED_HARD_RESET) {
      if (attr && attr.replace) {
        body = {
          ...attr.replace
        }
      }

      if (attr && attr.addition) {
        body = {
          ...body,
          ...attr.addition
        }
      }

      if (attr && attr.url) url = attr.url
    }

    const result = await go(url, body)

    if (result.expire) {
      return { expire: result.expire }
    }
    return {
      data: result,
      page: nextPage
    }
  })

export const createGenericSlice = (sliceName, loc, endpoint) => {
  return createSlice({
    name: sliceName,
    initialState: {
      loc,
      endpoint,
      feed: [],
      page: 0,
      end: false,
      error: null,
      loading: 'pending',
      attr: null
    },
    reducers: {
      setAttr: (state, { payload }) => {
        state.attr = payload
        state.feed = []
        state.end = false
        state.page = 0
      },
      setLoc: (state, { payload }) => {
        state.loc = payload
      }
    },
    extraReducers: {
      [fetchFeed(sliceName).pending]: (state, action) => {
        state.error = null
        if (action.meta && action.meta.arg === FEED_RESET) {
          state.feed = []
          state.page = 0
          state.end = false
        }
        if (state.page === 0) state.loading = 'pending'
      },
      [fetchFeed(sliceName).fulfilled]: (state, { payload }) => {
        state.loading = 'idle'
        if (!payload) return
        if (payload.expire) {
          state.error = 'expire'
          return
        }
        if (Object.keys(payload.data).length === 0 && payload.data.constructor === Object) {
          state.end = true
          state.feed = []
        } else {
          if (state.attr && state.attr.loc) {
            state.end = true
            if (state.attr.single) {
              state.feed = [payload.data[state.attr.loc]]
            } else {
              state.feed = [...payload.data[state.attr.loc]]
            }
          } else {
            if (payload.data[state.loc].length < pageLimit) state.end = true
            else state.end = false

            if (payload.page === 0) state.feed = [...payload.data[state.loc]]
            else state.feed = [...state.feed, ...payload.data[state.loc]]
          }
        }

        state.page += 1
        if (state.feed.length === 0) state.error = 'empty'
        else state.error = null
      },
      [fetchFeed(sliceName).rejected]: (state, { error }) => {
        console.log('test thunk rejected ')
      }
    }
  })
}

export const setLoc = feedName => countersByName[feedName].actions.setLoc
export const setAttr = feedName => countersByName[feedName].actions.setAttr

const createInfiniteFeed = (name, loc, endpoint) => {
  const slice = createGenericSlice(name, loc, endpoint)
  countersByName[name] = {
    actions: slice.actions
  }

  return slice.reducer
}

export default createInfiniteFeed
