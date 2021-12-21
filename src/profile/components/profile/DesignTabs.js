import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  user-select: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
`

const ListButton = styled.button`
  outline: none;
  padding: 15px 30px;
  border: 0;
  margin: 0;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: transparent;
  font-size: 18px;
  font-weight: ${props => (props.active === false ? '500' : '700')};
  color: ${props => (props.active === false ? '#777777' : 'black')};
  border-bottom: ${props => (props.active === false ? 'none' : '4px solid black')};

  cursor: pointer;
  white-space: nowrap;
`

const Tab = ({ data, onClick, selected }) => {
  return (
    <ListButton active={data.value === selected.value ? true : false} onClick={e => onClick(data)}>
      {data.label}
    </ListButton>
  )
}

const DesignTabs = ({ options, onChange, selected }) => {
  return (
    <Container>
      {options.map(item => (
        <Tab key={item.value} data={item} onClick={onChange} selected={selected} />
      ))}
    </Container>
  )
}

export default DesignTabs
