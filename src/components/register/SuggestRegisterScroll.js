import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from '../common/FormControls'
import { gotoLogIn, gotoSignUp } from '../../redux/actions/AuthActions'

import * as firebase from 'firebase/app'
import 'firebase/analytics'

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.494792) 18.75%,
    #ffffff 53.65%
  );
  /*background-color: #fff2f3;*/
  height: 496px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  user-select: none;
`

const Message = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 20px;
`

const ActionContainer = styled.div`
  margin-bottom: 10px;
`

const Registered = styled.div`
  font-size: 12px;
  margin-bottom: 50px;
  font-weight: bold;
`

const LinkButton = styled.button`
  text-decoration: underline;
  border: none;
  font-weight: bold;
  color: #ff5e6d;
  padding: 0;
  margin: 0;
`

const SuggestRegisterScroll = props => {
  const dispatch = useDispatch()

  const handleSignUp = () => {
    const tag = 'suggest_signup_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoSignUp())
  }

  const handleLogIn = () => {
    const tag = 'suggest_login_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoLogIn())
  }
  return (
    <Container>
      <Message>Create a free account to explore more creations.</Message>
      <ActionContainer>
        <PrimaryButton onClick={handleSignUp}>Register Now</PrimaryButton>
      </ActionContainer>
      <Registered>
        Already registered? <LinkButton onClick={handleLogIn}>Sign in</LinkButton>
      </Registered>
    </Container>
  )
}

export default SuggestRegisterScroll
