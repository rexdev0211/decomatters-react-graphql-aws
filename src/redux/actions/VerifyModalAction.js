import { OPEN_MODAL, CLOSE_MODAL } from '../../constants/VerifyModalConstants'

export const OpenModal = verified => {
  return {
    verified: verified,
    type: OPEN_MODAL
  }
}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL
  }
}
