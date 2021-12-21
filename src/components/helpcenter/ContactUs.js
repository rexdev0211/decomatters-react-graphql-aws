import React from 'react'

import styles from './contactus.module.css'
import fbStyles from '../common/fc.module.css'

import * as firebase from 'firebase/app'
import 'firebase/analytics'

export const ContactUs = props => {
  const email = () => {
    const tag =
      'faq_contactus_email_' +
      props.title
        .split('&')
        .join(' ')
        .split(' ')
        .join('_')
        .replace('___', '_')
        .toLowerCase() +
      '_clicked'
    console.log(tag)
    firebase.analytics().logEvent(tag)

    const link =
      'mailto:help@decormatters.com' +
      // + "?cc=myCCaddress@example.com"
      '?subject=' +
      encodeURIComponent('Can I get assistance with the ' + props.title + ' topic?') +
      '&body=' +
      encodeURIComponent(
        'I am currently browsing the ' + props.title + ' topic and had a question. '
      )
    window.location.href = link
  }
  return (
    <>
      <div className={styles.contactus}>
        <h4> Still need help?</h4>
        <button className={fbStyles.pr} type="button" onClick={email}>
          Contact Us
        </button>
      </div>
    </>
  )
}
