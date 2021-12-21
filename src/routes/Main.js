import React, { useEffect, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Search from './Search'
import InspirationHome from './InspirationHome'
import Collections from './Collections'
//import Blog from './Blog'
//import BlogPost from './BlogPost'
import DesignDetails from './DesignDetails'
import MainHeader from '../components/headers/MainHeader'
import CheckIn from '../components/checkin/CheckInModal'
import FloatingButtons from '../components/checkin/FloatingButtons'
//import Secondary from './Secondary'
//import Profile from '../components/profile/Profile'
//import MyProfile from '../components/profile/MyProfile'
//import DesignerLink from '../components/DesignerLink/DesignerLink'
//import Profile from '../profile/Profile'
//import Settings from '../profile/Settings'
import { DMPurchaseCoinsMembership } from '@decormatters/dm-purchase'
import { useSelector, useDispatch } from 'react-redux'
import { parseToken, getUserId } from '../storage/authLocalStorage'
import { setShowPurchaseCoins } from '../redux/reducers/DMReducer'
import { loadMe } from '../profile/store/profileReducer'
import VirtualGiftModal from '../components/gift/VirtualGiftModal'

const Blog = React.lazy(() => import('./Blog'))
const BlogPost = React.lazy(() => import('./BlogPost'))
const Secondary = React.lazy(() => import('./Secondary'))
const Profile = React.lazy(() => import('../profile/Profile'))
const Settings = React.lazy(() => import('../profile/Settings'))

// import DesignerLink from '../components/DesignerLink/DesignerLink'

const Main = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { showPurchaseCoins } = useSelector(state => state.dm)
  const { me } = useSelector(state => state.profile)

  useEffect(() => {
    const handleCheckSession = e => {
      dispatch(loadMe({ history }))
    }
    window.addEventListener('focus', handleCheckSession)
    return () => window.removeEventListener('focus', handleCheckSession)
  })

  useEffect(() => {
    dispatch(loadMe({ history }))
  }, [dispatch])

  //loadMe

  const handleQuit = () => {
    dispatch(setShowPurchaseCoins(false))
  }

  const handleComplete = () => {
    //console.log("*(*(*(*(*(")
  }

  const handleDone = () => {
    dispatch(setShowPurchaseCoins(false))
    dispatch(loadMe({ history }))
  }

  return (
    <>
      <MainHeader />
      <Suspense fallback={<div></div>}>
        <Switch>
          {/*<Route exact path="/dm/me" component={MyProfile} />
        <Route exact path="/dm/:id" component={Profile} />*/}
          <Route exact path="/dm/:id" component={Profile} />
          <Route exact path="/dm/" component={Profile} />
          <Route path="/settings/" component={Settings} />
          <Route path={`/search/`} component={Search} />
          <Route path={`/s/:name`} component={Search} />
          <Route exact path="/design/:id" component={DesignDetails} />
          <Route exact path="/" component={InspirationHome} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/post/:blogTitle" component={BlogPost} />
          <Route exact path="/blog/categories/:catId" component={Blog} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/post/:blogTitle" component={BlogPost} />
          <Route exact path="/blog/:blogId/:blogTitle" component={BlogPost} />
          <Route exact path="/blog/:catId" component={Blog} />
          <Route
            path={['/policy', '/terms', '/about', '/team', '/careers']}
            component={Secondary}
          />
          <Route path={`/:name`} component={InspirationHome} /> {/*always last catch all*/}
        </Switch>
      </Suspense>
      <DMPurchaseCoinsMembership
        show={parseToken() ? showPurchaseCoins : false}
        coins={(me && me.numCoins) || 0}
        member={(me && me.haveMembership) || false}
        token={parseToken()}
        userid={getUserId()}
        appid={process.env.REACT_APP_APPID}
        onQuit={handleQuit}
        onComplete={handleComplete}
        onDone={handleDone}
      />
      <CheckIn />
      <VirtualGiftModal />
      <FloatingButtons />
    </>
  )
}

Main.propTypes = {
  action: PropTypes.object,
  history: PropTypes.object
}

export default Main
