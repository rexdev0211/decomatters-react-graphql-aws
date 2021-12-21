import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { go } from '../../util/fetchUtil'
import { DEV_ENDPOINT, PROD_ENDPOINT } from '../../profile/store/constants'
import { getBrands } from './BrandSlice'

export const getItemsByIds = createAsyncThunk(
  'design/getItemsByIds',
  async (d, { getState, dispatch }) => {
    const { brands } = getState().brand
    dispatch(setLoading(true))
    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    var url = ep + 'getItems2'

    if (brands.length === 0) await dispatch(getBrands())

    const result = await go(url, { itemIds: d })
    //console.log(result)
    return result.items
  }
)

export const getSimilarItemsByIds = createAsyncThunk(
  'design/getSimilarItemsByIds',
  async (d, { getState, dispatch }) => {
    dispatch(setLoading(true))
    dispatch(setInitialSimilar())
    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    var url = ep + 'getItems2'

    const result = await go(url, { itemIds: d })

    if (result.code) return null

    return {
      ids: d,
      items: result.items
    }
  }
)

const item = createSlice({
  name: 'item',
  initialState: {
    items: [],
    similar: [],
    loading: false
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    clearItems: (state, { payload }) => {
      state.items = []
    },
    setInitialSimilar: (state, { payload }) => {
      state.similar = []
    }
  },
  extraReducers: {
    [getItemsByIds.fulfilled]: (state, action) => {
      state.loading = false
      state.items = action.payload
    },
    [getSimilarItemsByIds.fulfilled]: (state, action) => {
      state.loading = false
      //Reorg to place selected item to top
      if (!action.payload) return
      const ids = action.payload.ids
      var order = []

      ids.forEach(e => {
        const it = action.payload.items.find(i => i.objectId === e)
        if (it) order.push(it)
      })
      let unique = [...new Set(order)]
      state.similar = unique
    }
  }
})

export const { setLoading, setInitialSimilar, clearItems } = item.actions

export default item.reducer
