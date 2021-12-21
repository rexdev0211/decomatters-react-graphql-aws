import { OPEN_SHARE_BOX, CLOSE_SHARE_BOX } from '../../constants/ShareConstants'
import { updateQuest } from './QuestActions'

export const OpenShareBox = props => dispatch => {
  dispatch(updateQuest(1))
  dispatch({
    id: props.id,
    imgUrl: props.imgUrl,
    position: props.position,
    type: OPEN_SHARE_BOX,
    shareType: props.shareType,
    customUrl: props.customUrl ? props.customUrl : null
  })
}

export function CloseShareBox() {
  return {
    type: CLOSE_SHARE_BOX
  }
}
