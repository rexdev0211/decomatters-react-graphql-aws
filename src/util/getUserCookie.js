export const getDomain = () => {
  const host = window.location.hostname

  //localhost requires different cookie name, not secure cookie
  if (host === 'localhost') return 'localhost;path=/;'

  let domainParts = host.split('.')
  //check to see if domaim has subdomain/domain.. if no sub, dont skip first part
  if (domainParts.length > 2) {
    domainParts.shift()
  }
  if (host === 'login.test.com') return '.test.com;path=/;'

  const domain = '.' + domainParts.join('.') + ';secure;path=/;'
  return domain
}

export const setCookie = (name, data) => {
  document.cookie = name + '=' + btoa(JSON.stringify(data)) + ';domain=' + getDomain()
}

export const deleteCookie = name => {
  const host = window.location.hostname
  let domainParts = host.split('.')

  //localhost requires different cookie name
  if (host === 'localhost') {
    document.cookie =
      name + '=;domain=' + domainParts.join('.') + ';expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    return
  }

  //check to see if domaim has subdomain/domain.. if no sub, dont skip first part
  if (domainParts.length > 2) {
    domainParts.shift()
  }
  document.cookie =
    name + '=;domain=.' + domainParts.join('.') + ';expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

const getCookie = cname => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return false
}

const getUserCookie = () => {
  const userCookie = getCookie('user')
  if (userCookie === false) return {}
  return JSON.parse(atob(userCookie))
}

// const getUserToken = () => {
//   const userCookie = getCookie('user')
//   if (userCookie === false) return null
//   const userCookieObject = JSON.parse(atob(userCookie))
//   return userCookieObject.puser.sessionToken
// }

export default getUserCookie
