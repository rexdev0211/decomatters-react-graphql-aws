const LoginDomainCheck = url => {
  const valid_domains =
    process.env.REACT_APP_LOGIN_VALID_DOMAINS !== undefined
      ? process.env.REACT_APP_LOGIN_VALID_DOMAINS.split(',')
      : ['decormatters.com']

  let valid_domain_flag = false
  valid_domains.forEach(domain => {
    if (url.indexOf(domain) >= 0) {
      valid_domain_flag = true
    }
  })

  if (!valid_domain_flag && url !== '/') return false
  return true
}

export default LoginDomainCheck
