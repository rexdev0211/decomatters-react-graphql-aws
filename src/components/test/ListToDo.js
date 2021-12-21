import React from 'react'
import { listTodos } from '../../graphql/queries'
import { gql, useQuery } from '@apollo/client'

const ListToDo = () => {
  const { loading, error, data } = useQuery(gql(listTodos))

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error}</p>

  return data.listTodos.items.map(item => (
    <div key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  ))
}

export default ListToDo
