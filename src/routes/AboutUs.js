import React from 'react'
// import React, { useEffect, useState } from 'react'
import './aboutus.module.css'
import styles from './snd.module.css'

export const AboutUsExternalPage = () => {
  return (
    <>
      <ExternalPages page={'aboutus'} url={'//company.decormatters.com'} />
    </>
  )
}

export const TeamExternalPage = () => {
  return (
    <>
      <ExternalPages page={'team'} url={'//company.decormatters.com/team'} />
    </>
  )
}

export const CareerExternalPage = () => {
  return (
    <>
      <ExternalPages page={'careers'} url={'//company.decormatters.com/careers'} />
    </>
  )
}
export const ExternalPages = props => {
  const { page, url } = props
  return (
    <>
      {/*<div dangerouslySetInnerHTML={{ __html: htmlText }}></div>*/}
      <iframe
        title={page}
        id={'about'}
        frameBorder="0"
        src={url}
        className={styles.externalPagesIframe}
      />
    </>
  )
}
