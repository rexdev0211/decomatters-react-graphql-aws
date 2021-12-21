import React from 'react'
import { deleteAuthStorage } from '../storage/authLocalStorage'
import LoginDomainCheck from '../util/loginDomainCheck'

const LogOut = () => {
  const logOutCallback = () => {
    //check to make sure user confirms log out
    if (window.confirm('Are you sure to want to logout?')) {
      deleteAuthStorage()
      window.location.replace('/')
      return
    }

    //user clicked cancel, redirect back to current state
    const search = window.location.search
    const params = new URLSearchParams(search)
    const url = params.get('r') ? decodeURIComponent(params.get('r')) : '/'

    //check to only allow redirect to decormatters.com or dev (should add env var disable here)
    if (LoginDomainCheck(url) === false) {
      window.location.replace('/')
      return
    }

    params.get('r') ? window.location.replace(params.get('r')) : window.location.replace('/')
    return
  }

  logOutCallback()
  return <></>
}

export default LogOut
