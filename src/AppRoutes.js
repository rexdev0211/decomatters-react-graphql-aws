import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Main from './routes/Main'
import Auth from './components/auth/Auth'
import ShareBox from './components/social/ShareBox'

import VerifyModalAlert from './components/common/VerificationModal'
import HelpCenter from './routes/HelpCenter'
import LogOut from './routes/Logout'
import Login from './routes/Login'
import SampleLogin from './routes/SampleLogin'

const AppRoutes = () => {
  const { showAuth } = useSelector(state => state.auth)

  if (showAuth) {
    return <Auth />
  }

  return (
    <>
      <Switch>
        <Route path="/help-center" component={HelpCenter} />
        <Route path="/logout" component={LogOut} />
        <Route path="/login" component={Login} />
        <Route path="/samplelogin" component={SampleLogin} />
        <Route path={'/*'} component={Main} /> {/*always last*/}
      </Switch>
      <ShareBox />
      <VerifyModalAlert />
    </>
  )
}

AppRoutes.propTypes = {
  modal: PropTypes.bool
}

export default AppRoutes
