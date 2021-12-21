import React from 'react'
import { Link } from 'react-router-dom'

const SearchMenu = () => {
  return (
    <ul horizontal="sm">
      <li>
        <Link to="/s/inpiration">Inspirations</Link>
      </li>
      <li>
        <Link to="/s/collections">Collections</Link>
      </li>
      <li>
        <Link to="/s/users">Users</Link>
      </li>
    </ul>
  )
}

export default SearchMenu
