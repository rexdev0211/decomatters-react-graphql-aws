import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { DMProfilePic, DMPrimaryAltButton } from '@decormatters/dm-theme'
import Following from './Following'
import Info from './Info'
import Actionable from './Actionable'
import Badges from './Badges'
import { FollowAction, unFollowAction } from '../../../redux/actions/FollowingActions'

import BadgeModal from './BadgeModal'

const Container = styled.div`
  flex: 0 0 410px;
  background-color: white;
  overflow: hidden;
`

const Content = styled.div`
  padding: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const Username = styled.div`
  width: 100%;
  margin-bottom: 22px;
  white-space: nowrap;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
`

const Description = styled.div`
  width: 100%;
  font-size: 18px;
  white-space: nowrap;
  margin-bottom: 22px;
  overflow: hidden;

  text-align: center;
`

const FollowButton = styled(DMPrimaryAltButton)`
  margin: 25px 0;
`

const SidebarOthers = () => {
  const { others } = useSelector(state => state.profile)
  const { following } = useSelector(state => state.follows) // list of who the logged-in user follows
  const dispatch = useDispatch()

  const history = useHistory()
  const mBadge = useRef()

  const handleBadgeClick = e => {
    mBadge.current.show(e)
  }

  let id = others && others.objectId
  const handleFollow = () => {
    dispatch(FollowAction(id))
  }

  const handleUnfollow = () => {
    dispatch(unFollowAction(id))
  }

  let followed = following.includes(id) // boolean for whether the logged-in user follows the user on this page

  let followedStyle = {
    color: '#8B8B8B',
    backgroundColor: '#EDEDED',
    borderColor: '#EDEDED'
  }

  return (
    <Container>
      <BadgeModal ref={mBadge} />
      <Content>
        <DMProfilePic pic={others && others.pic} level={(others && others.userLevel) || 0} />
        <FollowButton
          onClick={followed ? handleUnfollow : handleFollow}
          style={followed ? followedStyle : null}
        >
          {followed ? 'Followed' : 'Follow'}
        </FollowButton>
        <Username>{others && others.uniqueDisplayName}</Username>
        {others && others.aboutMe && <Description>{others.aboutMe}</Description>}
        <Following
          following={(others && others.numFollowing) || 0}
          followers={(others && others.numFollowers) || 0}
        />
        <Info
          title="Posts"
          value={Math.abs((others && others.numDesigns) || 0)}
          style={{ marginTop: '28px' }}
        />
        <Info title="Challenges Joined" value={(others && others.numContestEntries) || 0} />
        <Info title="Challenges Featured" value={(others && others.numContestWins) || 0} />
        <Actionable title="Badges" style={{ marginTop: '28px' }}>
          <Badges badgesComplete={others && others.badgeRewards} onClick={handleBadgeClick} />
        </Actionable>
      </Content>
    </Container>
  )
}

export default SidebarOthers
