import { useHistory } from 'react-router-dom'
import { ReactComponent as BackBtn } from '../../assets/BackNavBtn.svg'
import { ReactComponent as BackBtnNav } from '../../assets/Back.svg'
import styles from './backbutton.module.css'
import React from 'react'

/* Show backbutton mobile on these pages */
/* Show web will display button on desktop */
const showPages = [
  { uri: '/design', showWeb: 1 },
  { uri: 'blog/', showWeb: 0 },
  { uri: 'profile/', showWeb: 1 }
]

const BackButton = props => {
  const history = useHistory()

  //only show on design page for now.
  const goBack = () => {
    if (
      history.location.fromSite ||
      history.location.state !== undefined ||
      history.action === 'REPLACE' ||
      history.action === 'PUSH'
    ) {
      history.goBack()
    } else {
      history.replace('/')
    }
  }

  const isActive = () => {
    let className = styles.active
    const pathName = history.location.pathname

    const result = showPages.filter(word => pathName.indexOf(word.uri) > -1)

    if (result.length > 0 && result[0].showWeb !== 1) {
      className += ' ' + styles.hide
    }

    if (result.length > 0) return className
    return ''
  }

  return (
    <div className={`${styles.backBtnContainer} ${isActive()}`}>
      <BackBtn onClick={goBack} className={`${styles.backBtn} ${isActive()}`} />
      <BackBtnNav onClick={goBack} className={`${styles.backBtnNav} ${isActive()}`} />
    </div>
  )
}

export default BackButton
