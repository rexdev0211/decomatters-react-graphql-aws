// Actions related to authentication
export const USER_AUTHENTICATED = 'user_authenticated'
export const AUTH_MFA = 'auth_mfa'
export const AUTH_NEW_PASSWORD_REQUIRED = 'auth_new_password_required'
export const USER_INVALID = 'user_invalid'
export const REGISTER_USER = 'register_user'
export const REGISTER_USER_CONFIRM = 'register_user_confirm'
export const REGISTER_MFA = 'register_mfa'
export const REGISTER_USER_ERROR = 'register_user_error'
export const FORGOT_PASSWORD = 'forgot_password'
export const FORGOT_PASSWORD_CONFIRM = 'forgot_password_confirm'
export const AUTH_ERROR = 'auth_error'
// Actions associated with Your own API
export const REQRES_FETCH_ALL_SUCCESS = 'reqres_fetch_all_success'
export const REQRES_CREATE_SUCCESS = 'reqres_create_success'
export const REQRES_ERROR = 'reqres_error'
export const VALIDATE_USER_SESSION_VALID = 'VALIDATE_USER_SESSION_VALID'
export const VALIDATE_USER_SESSION_INVALID = 'VALIDATE_USER_SESSION_INVALID'

export const USER_VALID_SESSION_VALID = 'user_valid_session_valid'
export const USER_VALID_SESSION_INVALID = 'user_valid_session_invalid'
export const USER_INVALID_SESSION_VALID = 'user_invalid_session_valid'
export const USER_INVALID_SESSION_INVALID = 'user_invalid_session_invalid'

export const USER_UPDATE = 'user_update'

export const SIGNING_IN = 'signing_in'
export const SIGNING_IN_VERIFIED = 'signing_in_verified'
export const SIGNING_UP = 'signing_up'
export const RETURN_FROM_AUTH = 'return_from_auth'
export const DEFAULT_PROFILE_PICS = [
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile1.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile2.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile3.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile4.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile6.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile7.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile8.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile9.png',
  'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile10.png'
]
export const AUTH_STATE = {
  NONE: 0,
  LOGIN: 1,
  SIGNUP: 2
}
