import { createSlice } from '@reduxjs/toolkit'
import { parseHeaders } from '../../util/fetchUtil'

const BASE =
  process.env.REACT_APP_APPID === '1'
    ? 'https://decormatters-dev.herokuapp.com/parse/functions/'
    : `https://decormatters-prod.herokuapp.com/parse/functions/`

const ENDPOINTS = {
  GET_VIRTUAL_GIFTS: `${BASE}getVirtualGifts1`
}

const gift = createSlice({
  name: 'gift',
  initialState: {
    giftModalOpen: false,
    virtualGiftList: []
  },
  reducers: {
    openModal: state => {
      state.giftModalOpen = true
    },
    closeModal: state => {
      state.giftModalOpen = false
    },
    setVirtualGiftList: (state, action) => {
      state.virtualGiftList = action.payload
    }
  }
})

export const { openModal, closeModal } = gift.actions

export const getVirtualGifts = (skip = 0, previous = []) => {
  return async (dispatch, state) => {
    try {
      let response = await fetch(ENDPOINTS.GET_VIRTUAL_GIFTS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders(),
        body: JSON.stringify({ skip })
      })
      let { result } = await response.json()
      if (result && result.virtualGifts && result.virtualGifts.length)
        return dispatch(getVirtualGifts(skip + 10, previous.concat(result.virtualGifts)))
      else {
        return dispatch(gift.actions.setVirtualGiftList(previous))
      }
    } catch (error) {
      // handle error
    }
  }
}

export default gift.reducer
