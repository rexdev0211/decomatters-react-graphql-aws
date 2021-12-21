import React, { useEffect } from 'react'
import styled from 'styled-components'
import DesignTabs from './DesignTabs'
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
    label: 'Posts'
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

const DesignsOthers = ({ userid }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { feed, error, loading } = useSelector(state => state.inspiration)

  useEffect(() => {
    var attr = {
      addition: {
        userId: userid
      }
    }

    dispatch(setAttr('inspiration')(attr))
    dispatch(fetchFeed('inspiration')({ status: FEED_RESET }))
  }, [dispatch, userid])

  const handlePostClick = e => {
    if (!e) return
    history.push('/design/' + e.objectId)
  }

  const handleFetchMore = e => {
    dispatch(fetchFeed('inspiration')({ status: null }))
  }

  return (
    <Container>
      <DesignTabs options={options} selected={options[0]} />
      <FeedContainer>
        <DesignFeed
          data={feed}
          onFetch={handleFetchMore}
          card={BasicDesignCard}
          loading={loading}
          error={error}
          onClick={handlePostClick}
        />
      </FeedContainer>
    </Container>
  )
}

export default DesignsOthers
