import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { listDevBlogs } from '../../graphql/queries'

const Blog = () => {
  const { loading, error, data } = useQuery(gql(listDevBlogs))

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error}</p>

  console.log(data)
  return data.listDevBlogs.items.map(item => (
    <div key={item._id}>
      <p>{item.url}</p>
    </div>
  ))
}

export default Blog
