import React from 'react'
import styled from 'styled-components'
import { DMPrimaryAltButton } from '@decormatters/dm-theme'

const EntryContainer = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 12px 0;
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  user-select: none;

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const EntryTitle = styled.div`
  font-weight: 700;
  margin-bottom: 15px;
`

const EntryBodyContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
`

const InfoContainer = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  margin-left: 12px;
`

const MaterialIcon = styled.svg`
  height: 33px;
  width: 33px;
`

const MaterialImg = styled.img`
  height: 33px;
  width: 33px;
`

const Actionable = ({ icon, img, alt, title, children, actionTitle, onClick, ...props }) => {
  const handleClick = e => {
    if (onClick) onClick()
  }

  return (
    <EntryContainer {...props}>
      <EntryTitle>{title}</EntryTitle>
      <EntryBodyContainer>
        {img && <MaterialImg src={img} alt={alt} />}
        {icon && <MaterialIcon as={icon} />}
        {(img || icon) && <InfoContainer>{children}</InfoContainer>}
        {!img && !icon && children}
        {actionTitle && (
          <DMPrimaryAltButton size="sm" onClick={handleClick}>
            {actionTitle}
          </DMPrimaryAltButton>
        )}
      </EntryBodyContainer>
    </EntryContainer>
  )
}

export default Actionable
