import {
  REGISTER_USER,
  USER_UPDATE,
  USER_VALID_SESSION_VALID,
  USER_VALID_SESSION_INVALID,
  USER_INVALID_SESSION_INVALID,
  SIGNING_IN,
  SIGNING_IN_VERIFIED,
  SIGNING_UP,
  RETURN_FROM_AUTH,
  AUTH_STATE
} from '../../constants/AuthActionsConstants'
import { user as userdata } from '../../storage/authLocalStorage'

const initialState = {
  isAuthenticated: userdata() ? true : false,
  showAuth: false,
  verified: true,
  authState: AUTH_STATE.NONE
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNING_IN: {
      return {
        ...state,
        showAuth: true,
        authState: AUTH_STATE.LOGIN
      }
    }
    case SIGNING_IN_VERIFIED: {
      return {
        ...state,
        showAuth: true,
        authState: AUTH_STATE.LOGIN
      }
    }
    case SIGNING_UP: {
      return {
        ...state,
        showAuth: true,
        authState: AUTH_STATE.SIGNUP
      }
    }
    case RETURN_FROM_AUTH: {
      return {
        ...state,
        showAuth: false
      }
    }
    case USER_UPDATE: {
      return {
        ...state
        /*
        user: {
          ...state.user,
          puser: {
            ...state.user.puser,
            ...action.user
          }
        }*/
      }
    }
    case USER_VALID_SESSION_VALID: {
      return {
        ...state,
        //user: action.user,
        showAuth: false,
        verified: true,
        isAuthenticated: true
      }
    }
    case USER_VALID_SESSION_INVALID: {
      return {
        ...state,
        //user: action.user,
        verified: false,
        isAuthenticated: true
      }
    }
    case USER_INVALID_SESSION_INVALID: {
      return {
        ...state,
        //user: null,
        verified: true,
        isAuthenticated: false
      }
    }
    case REGISTER_USER: {
      return {
        ...state,
        //user: action.user,
        verified: false,
        isAuthenticated: true
      }
    }
    default:
  }

  return state
}
