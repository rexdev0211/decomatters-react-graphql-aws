import { OPEN_MODAL, CLOSE_MODAL } from '../../constants/VerifyModalConstants'

const initialState = {
  active: false,
  verified: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        verified: action.verified,
        active: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        active: false
      }
    }

    default:
      return state
  }
}
