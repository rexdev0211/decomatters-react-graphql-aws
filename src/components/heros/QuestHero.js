import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './sh.module.css'
import { ReactComponent as Close } from '../../assets/cross.svg'
import { ReactComponent as Check } from '../../assets/check.svg'
import { closeQuest, updateQuest } from '../../redux/actions/QuestActions'
import useModal from '../SMS/useModal'
import SMSModal from '../SMS/SMS'

const QuestItem = ({ data, user }) => {
  const { isShowing, toggle, setIsShowing } = useModal()
  const dispatch = useDispatch()

  const handleGetApp = () => {
    dispatch(updateQuest(2))
    setIsShowing(true)
    //hack for mobile
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
      setTimeout(() => setIsShowing(false), 200)
    }
  }

  const openLogin = () => {
    //if (!user) dispatch(gotoLogIn())
  }

  if (data.link) {
    return (
      <li title={data.desc} onClick={openLogin} key={data.id} className={styles.qli}>
        <span className={styles.title}>
          <Check className={`${data.complete === true && user ? styles.ckd : styles.cki}`} />
        </span>
        <span className={styles.cka} onClick={handleGetApp}>
          {data.title}
        </span>
        <SMSModal isShowing={isShowing} hide={toggle} />
      </li>
    )
  }
  return (
    <li title={data.desc} onClick={openLogin} key={data.id} className={`${styles.qli}`}>
      <span className={styles.title}>
        <Check className={`${data.complete === true && user ? styles.ckd : styles.cki}`} />
      </span>
      <span className={styles.title}>{data.title}</span>
    </li>
  )
}

const QuestHero = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const { haveQuest, items, close } = useSelector(state => state.quest)
  const [closeHero, setCloseHero] = useState(false)

  const handleClose = () => {
    //logged in user close
    if (user && haveQuest === true) {
      dispatch(closeQuest())
    } else {
      setCloseHero(true) //close logged out
    }
  }

  if ((user && haveQuest === false) || (user && close === true) || closeHero === true) {
    return <></>
  }

  return (
    <div className={`${styles.qth} ${!user ? styles.notAuth : false}`}>
      <div className={styles.db}>
        <Close className={styles.ci} onClick={handleClose} />
      </div>
      <div className={styles.con}>
        <div className={`${styles.qci} ${!user ? styles.notAuth : false}`}>
          <h1 className={styles.ht}>
            {user ? 'Welcome, ' + user.puser.uniqueDisplayName : <div>&nbsp;</div>}
          </h1>
          <h2 className={styles.hts}>Get inspired and unleash your creativity</h2>
        </div>
        <div className={`${styles.qcp} ${user ? styles.loggedInDisplay : null}`}>
          <ul className={`${styles.qul} ${user ? styles.loggedInDisplay : null}`}>
            {items.map((item, index) => (
              <QuestItem key={item.id} data={item} user={user ? user : false} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuestHero
