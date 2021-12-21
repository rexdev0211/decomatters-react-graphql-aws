import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DesignTabs from './DesignTabs'
import Feed from './Feed'
import BasicDesignCard from './cards/BasicDesignCard'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import DesignFeed from '../DesignFeed'

import { fetchFeed, setAttr } from '../../../redux/reducers/feedInfiniteSlice'
import { FEED_RESET } from '../../../redux/constants'

const Container = styled.div`
  flex: 1 1 auto;
  background-color: #f5f5f5;
  padding: 24px 56px;
`

const FeedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const options = [
  {
    value: 'posts',
    label: 'My Posts'
  },
  {
    value: 'drafts',
    label: 'Drafts'
  },
  {
    value: 'myrooms',
    label: 'My Rooms'
  }
]

export const getDesignerDomain = url => {
  var separators = ['/', '.']
  var temp = url.split(new RegExp('[' + separators.join('') + ']', 'g'))
  var domain = 'https://designer.decormatters.com'
  temp.forEach((d, i) => {
    if (d === 'dev') {
      domain = 'https://designer-dev.decormatters.com'
    }
    if (d === 'stage') {
      domain = 'https://designer-stage.decormatters.com'
    }
    if (d === 'www') {
      domain = 'https://designer.decormatters.com'
    }
    if (d === 'localhost:3000') {
      domain = 'http://localhost:3001'
    }
    if (d === 'localhost:3001') {
      domain = 'http://localhost:3000'
    }
  })

  return domain
}

const Designs = ({ userid }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState(options[0])
  const { drafts, myrooms } = useSelector(state => state.design)

  const { feed, error, loading } = useSelector(state => state.inspiration)
  /*
  useEffect(() => {
    console.log(feed)
  },[feed])
*/
  useEffect(() => {
    if (!userid) return

    var attr = {
      addition: {
        userId: userid
      }
    }

    dispatch(setAttr('inspiration')(attr))
    dispatch(fetchFeed('inspiration')({ status: FEED_RESET }))
  }, [dispatch, userid])

  const handleFetchMore = e => {
    dispatch(fetchFeed('inspiration')({ status: null }))
  }

  const handlePostClick = e => {
    if (!e) return
    history.push('/design/' + e.objectId)
  }
  //http://localhost:3001/design/6sEsdzisrF

  const handleDraftClick = e => {
    if (!e) return
    const loc = getDesignerDomain(window.location.href)
    window.location.href = loc + '/design/' + e.objectId
  }

  const handleMyRoomClick = e => {
    // history.push('design/new', { idea: convertDataToArtboard(data.objectId, data.cfImageUrl,[]), type: 'myrooms', from })
    const loc = getDesignerDomain(window.location.href)
    window.location.href = loc + '/design/new?type=myrooms&template=' + e.cfImageUrl
  }

  return (
    <Container>
      <DesignTabs options={options} selected={selectedTab} onChange={e => setSelectedTab(e)} />
      <FeedContainer>
        {selectedTab.value === 'posts' && (
          <DesignFeed
            data={feed}
            onFetch={handleFetchMore}
            card={BasicDesignCard}
            loading={loading}
            error={error}
            onClick={handlePostClick}
          />
        )}
        {selectedTab.value === 'drafts' && (
          <Feed data={drafts} card={BasicDesignCard} onClick={handleDraftClick} />
        )}
        {selectedTab.value === 'myrooms' && (
          <Feed data={myrooms} card={BasicDesignCard} onClick={handleMyRoomClick} />
        )}
      </FeedContainer>
    </Container>
  )
}

export default Designs
