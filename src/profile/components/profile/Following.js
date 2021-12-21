import React from 'react'
import styled from 'styled-components'

const FollowContainer = styled.div`
  width: 100%;
  height: 74px;

  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${props => (props.scheme === 'dark' ? '#2D2D2D' : '#F5F5F5')};
`

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Count = styled.div`
  padding: 0;
  margin: 0;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
`

const Title = styled.div`
  font-size: 14px;
  user-select: none;
`

const Divider = styled.div`
  height: 90%;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.124);
`

const Spacer = styled.div`
  height: 31px;
`

const Follow = ({ scheme, following, followers }) => {
  return (
    <FollowContainer scheme={scheme}>
      <Content>
        {following !== false ? <Count scheme={scheme}>{following}</Count> : <Spacer />}
        <Title>Following</Title>
      </Content>
      <Divider />
      <Content>
        {followers !== false ? <Count scheme={scheme}>{followers}</Count> : <Spacer />}
        <Title>Followers</Title>
      </Content>
    </FollowContainer>
  )
}

export default Follow
