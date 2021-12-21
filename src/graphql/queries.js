/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
    }
  }
`
export const listTodos = /* GraphQL */ `
  query ListTodos($filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`
export const getDevBlog = /* GraphQL */ `
  query GetDevBlog($_id: String!) {
    getDevBlog(_id: $_id) {
      _id
      url
      _created_at
    }
  }
`
export const listDevBlogs = /* GraphQL */ `
  query ListDevBlogs($filter: TableDevBlogFilterInput, $limit: Int, $nextToken: String) {
    listDevBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        _id
        url
        _created_at
      }
      nextToken
    }
  }
`
