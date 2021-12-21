import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import HelmetContainer from './components/helmet/Helmet'
import MobileFooter from './components/mobile/MobileFooter'
import TagManager from 'react-gtm-module'
import SuggestRegister from './components/register/SuggestRegister'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from './redux/reducers/DMReducer'

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTAG_ID //'GTM-NDH37RD'
}
TagManager.initialize(tagManagerArgs)
const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, showAuth } = useSelector(state => state.auth)
  const { designBrowseCount, designMaxBrowseCount } = useSelector(state => state.dm)
  const [showSuggest, setShowSuggest] = useState(false)

  useEffect(() => {
    if (isAuthenticated === false) {
      if (designBrowseCount >= designMaxBrowseCount) {
        setShowSuggest(true)
      }
    }
  }, [designBrowseCount, designMaxBrowseCount, isAuthenticated])

  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuggest(true)
    }, 300000);
    if(isAuthenticated) clearTimeout(timer)
    return () => clearTimeout(timer);
  },[isAuthenticated])
  */
  return (
    <>
      <HelmetContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <MobileFooter />
      {showSuggest && !isAuthenticated && !showAuth && <SuggestRegister />}
    </>
  )
}

export default App
