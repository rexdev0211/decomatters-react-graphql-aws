import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  user-select: none;
  margin-bottom: 16px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
`

const Value = styled.div`
  font-weight: 700;
`

const Info = ({ title, value, ...props }) => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  )
}

export default Info
