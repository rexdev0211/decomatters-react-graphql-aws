import { Helmet } from 'react-helmet/es/Helmet'
import React from 'react'

const HelmetDesignDetails = props => {
  const currentUrl = document.location.href
  const imageUrl = props.data.idea
    ? props.data.idea.thumbImageFile.url
    : props.data.feedImageFile
    ? props.data.feedImageFile.url
    : ''

  return (
    <Helmet>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={currentUrl} />
      <meta name="twitter:title" content={props.data.title} />
      <meta
        name="twitter:description"
        content={
          props.data.subTitle ? props.data.subTitle : 'Design created with the DecorMatters app.'
        }
      />
      <meta name="twitter:image" content={imageUrl} />

      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={props.data.title} />
      <meta
        property="og:description"
        content={
          props.data.subTitle ? props.data.subTitle : 'Design created with the DecorMatters app.'
        }
      />
      <meta property="og:site_name" content="DecorMatters" />
      <meta property="og:image" content={imageUrl} />
    </Helmet>
  )
}

export default HelmetDesignDetails
