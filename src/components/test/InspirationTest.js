import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

const inspirations = gql`
  query Inspirations {
    UserInspirations(limit: 2) {
      _created_at
      _id
      _p_designContest
      _p_idea
      _p_user
      user {
        _id
        aboutMe
        email
        emailVerified
        name
        numContestEntries
        numDesigns
        numFollowers
        numFollowing
        numUnseenNotifications
        numUserProducts
        openCount
        thumbProfileImageFile
        uniqueDisplayName
        username
      }
      categoryId
      numComments
      numLikes
      productIds
      products {
        style
        styleId
        styleName
      }
      spaceSize
      status
      styleId
      subTitle
      title
      type
    }
  }
`

const InspirationTest = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const { data, loading, error, refetch } = useQuery(inspirations)

  const onAuthenticated = () => {
    refetch()
  }
  useEffect(onAuthenticated, [isAuthenticated])

  if (loading) return <p>Loading...</p>
  if (error) return error.graphQLErrors.map(({ message }, i) => <span key={i}>{message}</span>)

  return data.UserInspirations.map(inspire => (
    <div key={inspire._id}>
      <h3>{inspire.title}</h3>
      <p>
        {inspire.user.uniqueDisplayName} {inspire.status}
      </p>
    </div>
  ))
}

export default InspirationTest
