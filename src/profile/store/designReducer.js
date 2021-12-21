import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { goStored } from '../utils'
import { DEV_ENDPOINT, PROD_ENDPOINT } from './constants'
import { getUserId as myid } from '../../storage/authLocalStorage'

export const loadMyPosts = createAsyncThunk('profile/loadMyPosts', async (data, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goStored(ep + 'getUserInspirations5', { userId: myid() })
  return result
})

export const loadDrafts = createAsyncThunk('profile/loadDrafts', async (data, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goStored(ep + 'getIdeas2', null)
  return result
})

export const loadMyRooms = createAsyncThunk('profile/loadMyRooms', async (data, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goStored(ep + 'getUserTemplates1', null)
  return result
})

const design = createSlice({
  name: 'design',
  initialState: {
    token: null,
    appid: 3,
    userid: null,
    drafts: [],
    myroom: null,
    myrooms: [],
    posts: []
  },
  reducers: {
    init: (state, action) => {
      if (!action.payload) return
      const d = action.payload
      state.token = d.token
      state.appid = d.appid
      state.userid = d.userid
    }
  },
  extraReducers: {
    [loadMyPosts.fulfilled]: (state, action) => {
      if (!action.payload) return
      state.posts = action.payload.userInspirations
    },
    [loadDrafts.fulfilled]: (state, action) => {
      if (!action.payload) return
      state.drafts = action.payload
    },
    [loadMyRooms.fulfilled]: (state, action) => {
      if (!action.payload) return
      state.myroom = action.payload
      state.myrooms = action.payload.userTemplates
    }
  }
})

export const { init } = design.actions

export default design.reducer
