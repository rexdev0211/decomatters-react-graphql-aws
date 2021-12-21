import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Policy from './Policy'
import Terms from './Terms'
import { AboutUsExternalPage, CareerExternalPage, TeamExternalPage } from './AboutUs'

const Secondary = props => {
  return (
    <>
      <Switch>
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/about" component={AboutUsExternalPage} />
        <Route exact path="/team" component={TeamExternalPage} />
        <Route exact path="/careers" component={CareerExternalPage} />
      </Switch>
    </>
  )
}

export default Secondary
