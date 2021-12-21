import React, { useEffect, useState } from 'react'
import Inspirations from '../components/feeds/InspirationFeed'
import QuestHero from '../components/heros/QuestHero'

import { useDispatch, useSelector } from 'react-redux'
import { getSavedUserInspiration } from '../redux/actions/SaveInspirationAction'
import { getFollowList } from '../redux/actions/FollowingActions'

import { getFeedByCatId } from '../redux/actions/InspirationFeedAction'
// import { getMarketProducts1 } from '../redux/actions/MarketProductFeedAction'
import { batch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MENU_LIST } from '../constants/MenuConstants'
import UsernameUpdate from '../components/username/UsernameUpdate'

let myStorage = window.sessionStorage
const InspirationHome = props => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { position } = useSelector(state => state.scroll)
  const auth = useSelector(state => state.auth)
  const [id, setPageId] = useState(name in MENU_LIST ? name : '')
  const [title, setTitle] = useState(MENU_LIST[name] ? MENU_LIST[name].title : '')

  useEffect(() => {
    window.scrollTo(0, position)
  }, [id, position])

  useEffect(() => {
    //add condition here to check if coming from design page
    //if position is greater than 0, means they clicked to details page

    const currPageName =
      myStorage.getItem('currPageName') !== 'undefined'
        ? myStorage.getItem('currPageName')
        : undefined

    if (position === 0 || name !== currPageName) {
      myStorage.setItem('currPageName', name)
      setTitle(name in MENU_LIST ? MENU_LIST[name].title : '')
      const hashtags =
        name in MENU_LIST && 'hashtags' in MENU_LIST[name] ? MENU_LIST[name].hashtags : []
      dispatch(getFeedByCatId(id, 0, hashtags))
    }
  }, [dispatch, id])

  useEffect(() => {
    setPageId(name in MENU_LIST ? name : '')
  }, [name])

  useEffect(() => {
    batch(() => {
      dispatch(getSavedUserInspiration())
      dispatch(getFollowList())
    })

    //if(isAuthenticated)
  }, [dispatch, auth])

  const showQuestHero = () => {
    return id === '' && name !== 'search'
  }

  return (
    <>
      <div>
        {showQuestHero() && <QuestHero />} {/* Only show search hero on landing page */}
        <Inspirations id={id} title={title} />
        <UsernameUpdate />
      </div>
    </>
  )
}

export default InspirationHome
