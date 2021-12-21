import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { LoadingIndicator2 } from '../../feeds/LoadingIndicator'
import NoItems from '../../../assets/noitems.png'
import { PriceSelected } from '../PriceSelected'
import { SaveProductIcon } from '../SaveProductIcon'

import { formatter } from '../../../util/normalizedata'

import * as firebase from 'firebase/app'
import 'firebase/analytics'

const Container = styled.div`
  width: 194px;
  height: 220px;
  background: #ffffff;
  /* Shadow/ProductCard */

  /*box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);*/
  border-radius: 10px;
  position: relative;
  padding: 10px 10px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;

  -webkit-animation: appear 0.25s;
  animation: appear 0.25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  font-size: 14px;

  overflow: hidden;

  cursor: pointer;
`

const InfoContainer = styled.div`
  position: absolute;
  top: 185px;
  text-align: center;
  width: 90%;
`

const Title = styled.div`
  font-weight: 500;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow: hidden;
`

const Price = styled.div`
  font-weight: 700;
`

const ThumbContainer = styled.div`
  padding-top: 40px;
  width: 110px;
  height: 110px;
`

const ThumbImage = styled.img`
  object-fit: contain;
`

const StoreNameContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 12px;
`

const StoreImageContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 12px;
`

const StoreImage = styled.img`
  object-fit: contain;
  width: 75px;
  height: 30px;
`

const storeDataMap = (stores, id, name) => {
  if (stores[id])
    return (
      <StoreImageContainer>
        <StoreImage src={stores[id].imageName} alt={name} />
      </StoreImageContainer>
    )

  return <StoreNameContainer>{name}</StoreNameContainer>
  /*
  const filterStore = storeNames.filter(store => store.storeId === id)
  return filterStore[0] !== undefined && filterStore[0].logoUrl !== undefined ? (
    <img src={filterStore[0].imageName} alt={item.storeName} />
  ) : (
    <div>{item.storeName}</div>
  )
  */
}

export const ProductCard = ({ data, name, storeNames, savedProductIds, allSavedProducts }) => {
  const { brandsByKeys } = useSelector(state => state.brand)
  var url = 'https://' + data.baseUrl + '/' + data.thumbImageFileLoc + data.thumbImageFileName

  const cap = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleToProduct = () => {
    if (!data.productUrl) return
    firebase.analytics().logEvent('select_content', {
      content_type: name ? name : 'product',
      content_id: data.objectId,
      items: [
        {
          name: data.title,
          brand: data.storeId
        }
      ]
    })

    const tag = 'design_' + name + '_clicked'
    firebase.analytics().logEvent(tag)

    window.open(data.productUrl, '_blank')
  }

  return (
    <Container>
      {storeDataMap(brandsByKeys, data.storeId, data.storeName)}
      <SaveProductIcon
        savedProductIds={savedProductIds}
        id={data.objectId}
        saveObjectId={allSavedProducts[data.objectId]}
        type="Item"
      />
      <ThumbContainer onClick={handleToProduct} rel="noopener noreferrer">
        <ThumbImage
          alt={data.title ? data.title : 'Decormatters'}
          src={url}
          onError={e => (e.target.src = '/onerror.png')}
          width="100%"
          height="100%"
        />
      </ThumbContainer>
      <InfoContainer>
        <Title>{cap(data.title)}</Title>
        {data.salePrice && data.salePrice > 0 && <Price>{formatter.format(data.salePrice)}</Price>}
      </InfoContainer>
    </Container>
  )
}

export default ProductCard
