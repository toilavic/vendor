import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import Navbar from './layout/Navbar'
import Welcome from './Welcome'
import Filters from './Filters'
import VendorToReview from './VendorToReview'
import VendorToApprove from './VendorToApprove'

const Main: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={(routeProps) => <Login {...routeProps} onLoginRedirect="/dashboard" />} />
        <div>
          <Navbar/>
          <Welcome/>
          <VendorToReview/>
          <VendorToApprove/>
        </div>
      </Switch>

    </>
  )
}

export default Main;