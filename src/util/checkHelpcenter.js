// import React from 'react'
const hidePages = ['help-center', 'terms', 'policy', 'about', 'login']
export const isHelpCenterLink = () => {
  return showMobileFooter()
}

export const showMobileFooter = () => {
  let result = hidePages.some(function(e) {
    return (
      window.location.pathname.indexOf(e) > 0 &&
      navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    )
  })

  return result
}
