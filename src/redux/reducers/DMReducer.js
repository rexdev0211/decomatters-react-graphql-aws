import { createSlice } from '@reduxjs/toolkit'

const dm = createSlice({
  name: 'dm',
  initialState: {
    designBrowseCount: 0,
    designMaxBrowseCount: 5,
    modalOpen: false,
    showPurchaseCoins: false
  },
  reducers: {
    reset: (state, action) => {
      state.designBrowseCount = 0
    },
    count: (state, action) => {
      state.designBrowseCount = state.designBrowseCount + 1
    },
    setModalOpen: (state, action) => {
      state.modalOpen = true
    },
    setModalClose: (state, action) => {
      state.modalOpen = false
    },
    setShowPurchaseCoins: (state, action) => {
      state.showPurchaseCoins = action.payload ? action.payload : false
    }
  }
})

export const { reset, count, setModalOpen, setModalClose, setShowPurchaseCoins } = dm.actions

export default dm.reducer
