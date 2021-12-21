import { parseToken } from '../storage/authLocalStorage'

export const parseHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': process.env.REACT_APP_APPID
  }

  const ptoken = parseToken() ? parseToken() : undefined

  if (ptoken) {
    headers['X-Parse-Session-Token'] = ptoken
  }

  return headers
}

export const awsHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.REACT_APP_AWS_API_KEY
  }

  return headers
}

export const go = async (url, body) => {
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: body ? JSON.stringify(body) : null
  }

  const response = await fetch(url, option)
  const responseJson = await response.json()
  return responseJson.result
}
