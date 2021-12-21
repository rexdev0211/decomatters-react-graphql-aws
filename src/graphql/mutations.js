/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($input: CreateTodoInput!, $condition: ModelTodoConditionInput) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($input: UpdateTodoInput!, $condition: ModelTodoConditionInput) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($input: DeleteTodoInput!, $condition: ModelTodoConditionInput) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`
export const createDevBlog = /* GraphQL */ `
  mutation CreateDevBlog($input: CreateDevBlogInput!) {
    createDevBlog(input: $input) {
      _id
      url
      _created_at
    }
  }
`
export const updateDevBlog = /* GraphQL */ `
  mutation UpdateDevBlog($input: UpdateDevBlogInput!) {
    updateDevBlog(input: $input) {
      _id
      url
      _created_at
    }
  }
`
export const deleteDevBlog = /* GraphQL */ `
  mutation DeleteDevBlog($input: DeleteDevBlogInput!) {
    deleteDevBlog(input: $input) {
      _id
      url
      _created_at
    }
  }
`
