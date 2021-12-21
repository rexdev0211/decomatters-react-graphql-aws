import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  user-select: none;

  li {
    display: inline-block;
    padding: 0 10px;
    padding-top: 25px;
  }

  @media (min-width: 768px) {
    li {
      display: block;
    }
  }
`
//  979797
const Bar = styled.div`
  background-color: transparent;
  margin-top: 14px;
  width: 40px;
  height: 4px;
`

const ListLink = styled.div`
  font-weight: ${props => (props.isSelected === true ? 'bold' : '500')};
  font-size: 16px;
  cursor: pointer;
  color: ${props =>
    props.isSelected === true
      ? props.scheme === 'dark'
        ? 'white'
        : 'black'
      : props.scheme === 'dark'
      ? '#BBBBBB'
      : '#979797'};

  white-space: nowrap;

  &:hover {
    color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  }

  ${Bar} {
    background-color: ${props =>
      props.isSelected === true ? (props.scheme === 'dark' ? 'white' : 'black') : 'transparent'};
  }
`
const Nav = ({ data, scheme, selected, onClick }) => {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    if (data === selected) {
      setIsSelected(true)
    }
    setIsSelected(false)
  }, [data, selected])

  return (
    <List>
      {data.map((d, i) => {
        return (
          <li key={i}>
            <ListLink
              exact
              to={d.path}
              scheme={scheme}
              isSelected={d === selected ? true : false}
              onClick={e => onClick(d)}
            >
              {d.label}
              <Bar />
            </ListLink>
          </li>
        )
      })}
    </List>
  )
}

export default Nav
