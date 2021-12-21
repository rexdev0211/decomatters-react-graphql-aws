import React from 'react'
import styles from './headerfooter.module.css'
import { Link } from 'react-router-dom'
import useModal from '../SMS/useModal'
import SMSModal from '../SMS/SMS'

const FooterLinks = () => {
  const { isShowing, toggle } = useModal()

  const closeToggle = () => {
    toggle()
  }

  return (
    <>
      <SMSModal isShowing={isShowing} hide={closeToggle} />
      <div className={styles.footerLinks}>
        <ul>
          <li>
            <Link to={'/team'}>Team</Link>
          </li>
          <li>
            <Link to={'/careers'}>Careers</Link>
          </li>
          <li>
            <Link to={'/about'}>About Us</Link>
          </li>
          <li>
            <Link to={'/blog'}>Blog</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to={'/terms'}>Terms Of Service</Link>
          </li>
          <li>
            <Link to={'/policy'}>Privacy Policy</Link>
          </li>
          <li onClick={toggle}>
            <button>Download the IOS App</button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default FooterLinks
