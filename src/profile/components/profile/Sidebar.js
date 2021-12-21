import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { DMProfilePic, DMPrimaryAltButton } from '@decormatters/dm-theme'
import Following from './Following'
import Info from './Info'
import Actionable from './Actionable'
import Badges from './Badges'
import { formatMoney } from '../../utils'

import { ReactComponent as CoinIcon } from '../../assets/coin.svg'
import { useSelector, useDispatch } from 'react-redux'

import { setShowPurchaseCoins } from '../../../redux/reducers/DMReducer'

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
  margin-top: 28px;
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

const EditProfileButton = styled(DMPrimaryAltButton)`
  margin: 25px 0;
`

const Sidebar = () => {
  const MEMBER = 'https://didr9pubr8qfh.cloudfront.net/designer/badge_membership_on.png'
  const NONE_MEMBER = 'https://didr9pubr8qfh.cloudfront.net/designer/badge_membership_off.png'

  const { me } = useSelector(state => state.profile)

  const dispatch = useDispatch()
  const history = useHistory()
  const mBadge = useRef()

  const handleCoin = e => {
    //if (onRefill) onRefill()
    dispatch(setShowPurchaseCoins(true))
  }

  const handleBadgeClick = e => {
    mBadge.current.show(e)
  }

  const handleEdit = e => {
    history.push('/settings')
  }

  return (
    <Container>
      <BadgeModal ref={mBadge} />
      <Content>
        <DMProfilePic pic={me && me.pic} level={(me && me.userLevel) || 0} />
        <Username>{me && me.uniqueDisplayName}</Username>
        {me && me.aboutMe && <Description>{me.aboutMe}</Description>}
        <Following
          following={(me && me.numFollowing) || 0}
          followers={(me && me.numFollowers) || 0}
        />
        <EditProfileButton onClick={handleEdit}>Edit Profile</EditProfileButton>
        <Info title="Posts" value={Math.abs((me && me.numDesigns) || 0)} />
        <Info title="My Rooms" value={(me && me.numUserTemplates) || 0} />
        <Info title="My Decors" value={(me && me.numMyDecor) || 0} />
        <Info title="Challenges Joined" value={(me && me.numContestEntries) || 0} />
        <Actionable
          title="Membership"
          img={me && me.haveMembership ? MEMBER : NONE_MEMBER}
          alt="Membership Badge"
          actionTitle={me && me.haveMembership ? null : 'Upgrade'}
          onClick={handleCoin}
        >
          {me && me.membership && me.membership.name ? `${me.membership.name} Member` : 'Starter'}
        </Actionable>
        <Actionable title="Dcoins" icon={CoinIcon} actionTitle="Refill" onClick={handleCoin}>
          {me && me.numCoins && formatMoney(me.numCoins, 0)}
        </Actionable>
        <Actionable title="Badges">
          <Badges
            badgesComplete={me && me.badgeRewards}
            badgesIncomplete={me && me.badgesNotStarted}
            onClick={handleBadgeClick}
          />
        </Actionable>
      </Content>
    </Container>
  )
}

export default Sidebar
