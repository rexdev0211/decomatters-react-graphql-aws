import React, { useEffect, useState } from 'react'
import styles from './headerfooter.module.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/dm-logo.svg'
import logoStyle from '../navs/nv.module.css'
import BlogSocialMedia from './BlogSocialMedia'
import FooterLinks from './FooterLinks'

const BlogFooter = props => {
  const getCurrentCounter = () => {
    let start = new Date()
    start.setHours(0, 0, 0, 0)
    const startNum =
      1248325 + Math.floor((new Date().getTime() / 1000 - 1593475200) / 86400) * (86400 / 20)

    return Math.floor(
      startNum + Math.floor(new Date().getTime() / 1000 - start.getTime() / 1000) / 20
    )
  }
  const [designCount, setDesignCount] = useState(getCurrentCounter)

  const getYear = () => {
    return new Date().getFullYear()
  }

  useEffect(() => {
    //getTotalDesignCount()
    const timer = setInterval(() => {
      setDesignCount(getCurrentCounter())
    }, 2000)
    return () => clearTimeout(timer)
  }, [designCount])

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.text}>
          <div className={styles.logoSocialContainer}>
            <div className={styles.logoContainer}>
              <div className={`${logoStyle.nbl}`}>
                <Link to="/">
                  <Logo className={logoStyle.dml} />
                </Link>
              </div>
            </div>
            <h3 className={styles.headline}>Get inspired and unleash your creativity</h3>
            <BlogSocialMedia></BlogSocialMedia>
          </div>
        </div>

        <FooterLinks />
        <div className={styles.bottomCaption}>
          <div className={styles.reserved}>
            @ {getYear()} DecorMatters, Inc. All rights reserved.
          </div>
          <div className={styles.designsCreated}>
            <span>{Number(designCount).toLocaleString()}</span> Designs Created in DecorMatters
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogFooter
