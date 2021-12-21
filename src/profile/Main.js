import React, { useEffect } from 'react'
/*
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, batch } from 'react-redux'
import rootReducer from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Profile from './Profile'
import Settings from './Settings'

import { init as profileInit, loadProfile } from './store/profileReducer'
import { init as designInit, loadDrafts, loadMyPosts, loadMyRooms } from './store/designReducer'
*/
/*
const store = configureStore({
  reducer: rootReducer
})

const Content = ({ token, appid, userid, me, ...props }) => {
  const dispatch = useDispatch()

  dispatch(profileInit({ token, appid, userid, me }))
  dispatch(designInit({ token, appid, userid }))

  useEffect(() => {
    batch(() => {
      dispatch(loadProfile())
      dispatch(loadDrafts())
      dispatch(loadMyPosts())
      dispatch(loadMyRooms())
    })
  }, [])

  return (
    <Switch>
      <Route path={'/dm/:id'}>
        <Profile {...props} />
      </Route>
      <Route path={'/dm'}>
        <Profile {...props} />
      </Route>
      <Route path={['/settings']}>
        <Settings {...props} />
      </Route>
    </Switch>
  )
}
*/
const Main = props => {
  return <></>
  /*
  return (
    <Provider store={store}>
      <Router>
        <Content {...props} />
      </Router>
    </Provider>
  )*/
}

export default Main
