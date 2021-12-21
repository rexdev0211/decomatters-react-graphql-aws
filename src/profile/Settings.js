import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch, useHistory } from 'react-router-dom'
import Nav from './components/settings/Nav'

import Basic from './components/settings/Basic'
import Personal from './components/settings/Personal'
import Plan from './components/settings/Plan'
import Account from './components/settings/Account'

import { parseToken, user, getUserId } from '../storage/authLocalStorage'
import { init as profileInit, loadMe } from './store/profileReducer'
import { updateUser } from '../redux/actions/AuthActions'
import { updatePUser } from '../storage/authLocalStorage'

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: stretch;
  align-self: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`

const NavContainer = styled.div`
  width: 100%;
  margin-left: 12px;
  @media (min-width: 768px) {
    width: 200px;
  }
`

const BodyContainer = styled.div`
  background-color: ${props => (props.scheme === 'dark' ? 'black' : 'white')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  width: 100%;

  @media (min-width: 992px) {
    width: 770px;
  }

  @media (min-width: 1200px) {
    width: 970px;
  }
`

const nav = [
  {
    label: 'Profile',
    value: 'basic',
    path: '/settings/basic'
  },
  {
    label: 'Personalization',
    value: 'personal',
    path: '/settings/personalization'
  },
  {
    label: 'My Plan',
    value: 'plan',
    path: '/settings/plan'
  },
  {
    label: 'Account and Security',
    value: 'account',
    path: '/settings/account'
  }
]

const Settings = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (!location) return
    if (!location.pathname) return

    const fi = nav.findIndex(d => d.path === location.pathname)
    if (fi > -1) setSelected(nav[fi])
    else setSelected(nav[0])
  }, [location])

  useEffect(() => {
    dispatch(loadMe({ history }))
  }, [dispatch])

  const handleNav = e => {
    setSelected(e)
    history.push(e.path)
  }

  const handleUserUpdate = data => {
    //console.log(data)
    updatePUser(data)
    //dispatch(updateUser(data))
  }

  return (
    <Container>
      <NavContainer>
        <Nav data={nav} selected={selected} onClick={handleNav} />
      </NavContainer>
      <BodyContainer>
        <Switch>
          <Route path={'/settings/personalization'}>
            <Personal onUserUpdate={handleUserUpdate} />
          </Route>
          <Route path={'/settings/plan'}>
            <Plan onUserUpdate={handleUserUpdate} />
          </Route>
          <Route path={'/settings/account'}>
            <Account />
          </Route>
          <Route path={'/settings/basic'}>
            <Basic onUserUpdate={handleUserUpdate} />
          </Route>
          <Route path={'/settings'}>
            <Basic onUserUpdate={handleUserUpdate} />
          </Route>
        </Switch>
      </BodyContainer>
    </Container>
  )
}

export default Settings
