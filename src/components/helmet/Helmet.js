import React from 'react'
import { Helmet } from 'react-helmet'

const HelmetContainer = () => {
  return (
    <>
      <Helmet>
        <title> DecorMatters - Design Your Dream Home at Your Fingertips.</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="www.decormatters.com" />
        <meta
          name="twitter:title"
          content="DecorMatters - Design Your Dream Home at Your Fingertips. "
        />
        <meta
          name="twitter:description"
          content="Discover home decor ideas and interior design inspiration. Shop your favorite furniture stores and socialize with other interior designers."
        />
        <meta
          name="twitter:image"
          content="https://s3.amazonaws.com/decormatters-dev-web/assets/seo/seo-logo@3x.png"
        />

        <meta property="og:url" content="https://www.decormatters.com" />
        <meta
          property="og:title"
          content="DecorMatters - Design Your Dream Home at Your Fingertips. "
        />
        <meta
          property="og:description"
          content="Discover home decor ideas and interior design inspiration. Shop your favorite furniture stores and socialize with other interior designers."
        />
        <meta property="og:site_name" content="DecorMatters" />
        <meta
          property="og:image"
          content="https://s3.amazonaws.com/decormatters-dev-web/assets/seo/seo-logo@3x.png"
        />
      </Helmet>
    </>
  )
}

export default HelmetContainer
