import React, { useEffect } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from './components/profile/Sidebar'
import Designs from './components/profile/Designs'

import { getUserId } from '../storage/authLocalStorage'
import { loadMe, loadOthers } from './store/profileReducer'
import { loadDrafts, loadMyRooms } from './store/designReducer'
import SidebarOthers from './components/profile/SidebarOthers'
import DesignsOthers from './components/profile/DesignsOthers'

const Container = styled.div`
  height: 100vh;
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
`

const Me = ({ userid }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    batch(() => {
      dispatch(loadMe({ history }))
      dispatch(loadDrafts())
      dispatch(loadMyRooms())
      //dispatch(loadMyPosts())
    })
  }, [dispatch])

  return (
    <Container>
      <Sidebar />
      <Designs userid={userid} />
    </Container>
  )
}

const Others = ({ userid }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userid) return
    dispatch(loadOthers(userid))
  }, [dispatch, userid])

  return (
    <Container>
      <SidebarOthers />
      <DesignsOthers userid={userid} />
    </Container>
  )
}

const Profile = ({ match }) => {
  const { id } = match.params
  if (!id || id === getUserId()) return <Me userid={getUserId()} />
  return <Others userid={id} />
}

export default Profile
