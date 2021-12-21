/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
    }
  }
`
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
    }
  }
`
export const onCreateDevBlog = /* GraphQL */ `
  subscription OnCreateDevBlog($_id: String) {
    onCreateDevBlog(_id: $_id) {
      _id
      url
      _created_at
    }
  }
`
export const onUpdateDevBlog = /* GraphQL */ `
  subscription OnUpdateDevBlog($_id: String) {
    onUpdateDevBlog(_id: $_id) {
      _id
      url
      _created_at
    }
  }
`
export const onDeleteDevBlog = /* GraphQL */ `
  subscription OnDeleteDevBlog($_id: String) {
    onDeleteDevBlog(_id: $_id) {
      _id
      url
      _created_at
    }
  }
`
