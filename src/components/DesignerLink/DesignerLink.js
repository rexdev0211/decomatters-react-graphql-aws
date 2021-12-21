import React from 'react'
import styles from './designerlink.module.css'
import commonStyles from '../common/fc.module.css'
import { useSelector } from 'react-redux'
const DesignerLink = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const getDomain = url => {
    var separators = ['/', '.']
    var temp = url.split(new RegExp('[' + separators.join('') + ']', 'g'))
    var domain = 'https://designer.decormatters.com'
    temp.forEach((d, i) => {
      if (d === 'dev') {
        domain = 'https://designer-dev.decormatters.com'
      }
      if (d === 'stage') {
        domain = 'https://designer-stage.decormatters.com'
      }
      if (d === 'www') {
        domain = 'https://designer.decormatters.com'
      }
      if (d === 'localhost:4000') {
        domain = 'http://localhost:4001'
      }
      if (d === 'localhost:3000') {
        domain = 'http://localhost:3001'
      }
    })

    return domain
  }

  const goToDesigner = () => {
    const domain = getDomain(window.location.href)
    window.location.href = domain
  }

  if (!isAuthenticated) return null
  return (
    <>
      <div className={styles.designerLinkContainer}>
        <button className={commonStyles.pr} onClick={goToDesigner}>
          Create Design
        </button>
      </div>
    </>
  )
}

export default DesignerLink
