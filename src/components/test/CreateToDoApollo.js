import React from 'react'
import { createTodo } from '../../graphql/mutations'
import { gql, useMutation } from '@apollo/client'

const CreateToDo = () => {
  let name
  let description
  const [addTodo] = useMutation(gql(createTodo))

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        addTodo({
          variables: {
            input: {
              name: name.value,
              description: description.value
            }
          }
        })
        name.value = ''
        description.value = ''
      }}
    >
      <input
        ref={node => {
          name = node
        }}
      />
      <input
        ref={node => {
          description = node
        }}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default CreateToDo
