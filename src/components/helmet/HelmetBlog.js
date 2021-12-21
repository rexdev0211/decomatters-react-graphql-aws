import { Helmet } from 'react-helmet/es/Helmet'
import React from 'react'

const HelmetBlog = props => {
  const currentUrl = document.location.href
  const { imageUrl, title, description } = props

  return (
    <Helmet>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description ? description : 'Decormatters Blog'} />
      <meta name="twitter:image" content={imageUrl} />

      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description ? description : 'Decormatters Blog'} />
      <meta property="og:site_name" content="DecorMatters" />
      <meta property="og:image" content={imageUrl} />
    </Helmet>
  )
}

export default HelmetBlog
