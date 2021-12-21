import React from 'react'
import styled from 'styled-components'
import { ReactComponent as RemoveIcon } from '../assets/close.svg'
import { ReactComponent as DropIcon } from '../assets/droparrowlg.svg'

const GroupContainer = styled.div`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
`

const Label = styled.label`
  display: flex;
`

const Title = styled.span`
  padding: 0;
  margin: 0;
  margin-right: 6px;
  font-size: 14px;
  font-weight: bold;
`

const SubTitle = styled.span`
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #8b8b8b;
`

const TextInput = styled.input`
  margin-top: 8px;
  font-weight: 500;
  font-size: 14px;

  border: none;
  border-radius: 5px;
  height: 48px;
  text-indent: 10px;
  outline-color: #ff5e6d;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  background-color: ${props => (props.scheme === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
`

const ErrorContainer = styled.div`
  margin-top: 4px;
  color: #dd0000;
`

const CompleteContainer = styled.div`
  margin-top: 4px;
`
//color: ${props => props.theme.form.label};
export const InputGroup = ({ scheme, ...props }) => {
  return (
    <GroupContainer>
      <Label>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </Label>
      <TextInput
        scheme={scheme}
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        value={props.value}
        {...props}
      />
      {props.error && <ErrorContainer>{props.error}</ErrorContainer>}
      {props.complete && <CompleteContainer>{props.complete}</CompleteContainer>}
    </GroupContainer>
  )
}

//-------------------------------------------------------------------------------------------

const TextAreaInput = styled.textarea`
  margin-top: 8px;
  font-size: 14px;
  background-color: ${props => (props.scheme === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  padding: 10px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-family: 'Helvetica Neue';
`

export const TextAreaGroup = ({ scheme, ...props }) => {
  return (
    <GroupContainer>
      <Label>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </Label>
      <TextAreaInput
        scheme={scheme}
        rows="5"
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        value={props.value}
        {...props}
      />
    </GroupContainer>
  )
}

//-------------------------------------------------------------------------------------------

const CustomContainer = styled.div`
  margin-top: 8px;
`

export const CustomGroup = ({ scheme, children, ...props }) => {
  return (
    <GroupContainer>
      <Label>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </Label>
      <CustomContainer>
        {children}
        {props.error && <ErrorContainer>{props.error}</ErrorContainer>}
        {props.complete && <CompleteContainer>{props.complete}</CompleteContainer>}
      </CustomContainer>
    </GroupContainer>
  )
}

//-------------------------------------------------------------------------------------------

const InlineGroupContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-self: stretch;
  align-items: stretch;
  width: 100%;

  & div {
    width: 100%;
  }
`

export const InlineGroup = props => {
  return <InlineGroupContainer>{props.children}</InlineGroupContainer>
}

//-------------------------------------------------------------------------------------------

const SelectInput = styled.select`
  margin-top: 8px;
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => (props.scheme === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  height: 48px;
  text-indent: 10px;
  outline-color: #ff5e6d;
  box-sizing: border-box;
  width: 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
`

const Drop = styled(DropIcon)`
  position: absolute;
  right: 10px;
  bottom 28px;
  width: 15px;
  height: 15px;
  stroke: #8B8B8B;
  fill: #8B8B8B;
  pointer-events: none;
`

export const SelectGroup = ({ scheme, ...props }) => {
  return (
    <GroupContainer>
      <Label>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </Label>
      <SelectInput
        scheme={scheme}
        type={props.type}
        id={props.id}
        name={props.id}
        value={props.value}
        {...props}
      ></SelectInput>
      <Drop />
    </GroupContainer>
  )
}

//-------------------------------------------------------------------------------------------

const TagContainer = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  background: ${props => (props.scheme === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 2px solid transparent;

  & ul {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`
//border: 1px solid #ff5e6d;

const Tags = styled.li`
  align-items: center;
  background: ${props => (props.scheme === 'dark' ? '#8B8B8B' : '#FFFFFF')};
  color: ${props => (props.scheme === 'dark' ? '#FFFFFF' : '#000000')};
  border-radius: 30px;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 5px 15px;
  height: 25px;
  user-select: none;
  font-size: 14px;
  margin-bottom: 5px;
  margin-right: 12px;
`

const TagsRemove = styled(RemoveIcon)`
  stroke: ${props => (props.scheme === 'dark' ? '#FFFFFF' : '#ff5e6d')};
  width: 14px;
  height: 14px;
  padding-left: 5px;
  cursor: pointer;
`

const TagInputContainer = styled.li`
  list-style: none;
  flex-grow: 1;
  padding: 0;
`

const TagInput = styled.input`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 27px;
  outline: none;
  background: transparent;
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  &:focus ${TagContainer} {
    border: 2px solid #ff5e6d;
  }
`

export const TagsGroup = ({ scheme, ...props }) => {
  return (
    <GroupContainer>
      <Label>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </Label>
      <TagContainer scheme={scheme}>
        <ul>
          {props.tags.map((tag, i) => (
            <Tags key={tag} scheme={scheme}>
              <span>#{tag}</span>
              <TagsRemove scheme={scheme} onClick={e => props.onRemove(i)} />
            </Tags>
          ))}
          <TagInputContainer>
            <TagInput
              scheme={scheme}
              type="text"
              onKeyDown={props.onInputKeyDown}
              value={props.word}
              onChange={props.onChange}
            />
          </TagInputContainer>
        </ul>
      </TagContainer>
    </GroupContainer>
  )
}
