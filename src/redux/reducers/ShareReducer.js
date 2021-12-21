import { OPEN_SHARE_BOX, CLOSE_SHARE_BOX } from '../../constants/ShareConstants'

const initialState = {
  active: false,
  url: '',
  imgUrl: '',
  top: 0,
  left: 0,
  position: {},
  customUrl: '',
  shareType: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_SHARE_BOX: {
      const bodyRect = document.body.getBoundingClientRect()
      if (bodyRect.width < 900) document.body.style = 'overflow-y:hidden'

      return {
        ...state,
        active: true,
        id: action.id,
        position: action.position,
        top: action.position.top,
        left: action.position.left,
        imgUrl: action.imgUrl,
        customUrl: action.customUrl,
        shareType: action.shareType
      }
    }
    case CLOSE_SHARE_BOX: {
      const bodyRect = document.body.getBoundingClientRect()
      if (bodyRect.width < 900) document.body.style = 'overflow-y:scroll'
      return {
        ...state,
        active: false
      }
    }

    default:
      return state
  }
}
