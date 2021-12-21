import React from 'react'
import styled from 'styled-components'
import { DMPrimaryButton } from '@decormatters/dm-theme'
import { ReactComponent as CheckIcon } from '../../assets/check.svg'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: stretch;
  align-self: stretch;

  margin: 50px;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`

const Actions = styled.div`
  position: absolute;
  right: 0;
`

const Check = styled(CheckIcon)`
  padding: 0;
  margin: 0;
  width: 14px;
  margin-left: 12px;
`

const SavedButton = styled(DMPrimaryButton)`
  &:disabled {
    background-color: #ff5e6d;
    color: white;
  }
`

const Layout = ({ title, description, scheme, children, submitting, edited, saved, onSave }) => {
  return (
    <Container>
      <Actions>
        {edited === true && saved === false && (
          <DMPrimaryButton scheme={scheme} disabled={submitting} onClick={onSave}>
            Save
          </DMPrimaryButton>
        )}
        {edited === false && saved === false && (
          <DMPrimaryButton scheme={scheme} disabled={true}>
            Save {saved && <Check />}
          </DMPrimaryButton>
        )}
        {saved === true && (
          <SavedButton scheme={scheme} disabled={true}>
            Save
            <Check />
          </SavedButton>
        )}
      </Actions>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
    </Container>
  )
}

export default Layout
