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

const getHeaders = (token, appid) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': appid
  }

  if (token) {
    headers['X-Parse-Session-Token'] = token
  }
  return headers
}

export const go = async (url, body, token, appid = 3) => {
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(token, appid),
    body: body ? JSON.stringify(body) : null
  }

  const response = await fetch(url, option)
  const responseJson = await response.json()

  if (responseJson.code) {
    if (responseJson.code === 209) {
      return { expire: true }
    }
    return {}
  }
  return responseJson.result
}

export const goStored = async (url, body) => {
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

export const goRoot = async (url, body, token, appid = 3) => {
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(token, appid),
    body: body ? JSON.stringify(body) : null
  }

  const response = await fetch(url, option)
  const responseJson = await response.json()
  return responseJson
}

export const goRootStored = async (url, body) => {
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: body ? JSON.stringify(body) : null
  }

  const response = await fetch(url, option)
  const responseJson = await response.json()
  return responseJson
}

export const formatMoney = (amount, decimalCount = 2, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  } catch (e) {
    //console.log(e)
  }
}
