import React from 'react'
import styled from 'styled-components'

import { LoadingIndicator2 } from '../../feeds/LoadingIndicator'
import NoItems from '../../../assets/noitems.png'
import ProductCard from './ProductCard'

const Title = styled.div`
  padding: 18px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`

const FeedContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 18px;
  padding-left: 18px;
`

const ContentContainer = styled.div`
  height: 750px;
  overflow-y: auto;
`

const ProductContainer = ({ title, children, ...props }) => {
  return (
    <>
      <Title>{title}</Title>
      <ContentContainer {...props}>{children}</ContentContainer>
    </>
  )
}

export const Product = ({ title, loading, data, ...props }) => {
  if (loading)
    return (
      <ProductContainer title={title}>
        <LoadingIndicator2 loading={loading} />
      </ProductContainer>
    )
  if (data && data.length === 0)
    return (
      <ProductContainer title={title} style={{ textAlign: 'center' }}>
        <img src={NoItems} alt={'no-items'} width="70%" /> <p>NO ITEMS YET</p>
      </ProductContainer>
    )
  return (
    <ProductContainer title={title}>
      <FeedContainer>
        {data.map((d, i) => (
          <ProductCard id={d.objectId} key={d.objectId + i} data={d} {...props} />
        ))}
      </FeedContainer>
    </ProductContainer>
  )
}

export default Product
