import { SET_SCROLL_POSITION } from '../../constants/InspirationScrollConstants'

export const setScrollPos = (yPos, location) => {
  return {
    position: yPos,
    location: location,
    type: SET_SCROLL_POSITION
  }
}
