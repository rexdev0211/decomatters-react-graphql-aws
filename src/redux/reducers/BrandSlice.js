import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { go } from '../../util/fetchUtil'
import { DEV_ENDPOINT, PROD_ENDPOINT } from '../../profile/store/constants'

export const getBrands = createAsyncThunk('design/getBrands', async (d, { dispatch }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  var url = ep + 'getStores1'
  const result = await go(url)

  return result.stores
})

const brand = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    brandsByKeys: {}
  },
  reducers: {},
  extraReducers: {
    [getBrands.fulfilled]: (state, { payload }) => {
      if (!payload) return
      //state.loading = false
      state.brands = payload

      var obj = {}
      payload.forEach(e => {
        obj[e.indixStoreId] = {
          ...e
        }
      })
      state.brandsByKeys = obj
    }
  }
})

//export const { setLoading, clearItems } = brand.actions

export default brand.reducer
