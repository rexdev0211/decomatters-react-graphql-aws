import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'

const NoItemsFoundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #c4c4c4;
  padding-left: 20px;
  padding-right: 20px;
`

const LoadingContainer = styled.div`
  margin: 0 auto;
`

const DesignFeed = ({ data, onFetch, onClick, card, loading, error, ...props }) => {
  const ob = useRef()
  const lastFeedItem = useCallback(
    node => {
      if (ob.current) ob.current.disconnect()
      ob.current = new IntersectionObserver(
        e => {
          if (e[0].isIntersecting) {
            if (onFetch) onFetch()
          }
        },
        {
          threshold: 1
        }
      )
      if (node) ob.current.observe(node)
    },
    [onFetch]
  )

  if (loading === 'pending') return <LoadingContainer>LOADING</LoadingContainer>

  if (!data) return <></>

  if (data && data.length === 0 && error === 'empty')
    return (
      <NoItemsFoundContainer>
        <div></div>
      </NoItemsFoundContainer>
    )

  return (
    <>
      {data.map((item, index) => {
        const Card = card
        return <Card key={index} data={item} refFn={lastFeedItem} onClick={onClick} {...props} />
      })}
    </>
  )
}

export default DesignFeed
