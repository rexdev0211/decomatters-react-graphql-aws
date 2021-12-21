import React from 'react'
import { gql, useQuery } from '@apollo/client'

const Blogs = gql`
  query Blogs {
    Blogs {
      _id
      backdropImageFile
      url
    }
  }
`

const ListBlog = () => {
  const { data, loading, error } = useQuery(Blogs)

  if (loading) return <p>Loading...</p>
  if (error) return error.graphQLErrors.map(({ message }, i) => <span key={i}>{message}</span>)

  return data.Blogs.map(item => (
    <div key={item._id}>
      <h3>{item.backdropImageFile}</h3>
      <p>{item.url}</p>
    </div>
  ))
}

export default ListBlog
