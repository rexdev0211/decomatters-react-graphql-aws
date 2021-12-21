import React from 'react'
import { ReactComponent as Save } from '../../assets/social/save.svg'
import style from './social.module.css'
import { removeInspiration, saveInspiration } from '../../redux/actions/SaveInspirationAction'
import { useDispatch, useSelector } from 'react-redux'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { SAVE_INSPIRATION_TYPE_LOOKUP } from '../../constants/SaveInspirationConstants'

const SaveBtn = ({ id, type, noButton, loc }) => {
  const dispatch = useDispatch()
  const { savedList } = useSelector(state => state.saveInspiration)

  let saved = false
  const key = type in SAVE_INSPIRATION_TYPE_LOOKUP ? SAVE_INSPIRATION_TYPE_LOOKUP[type] : ''

  if (
    typeof savedList !== 'undefined' &&
    key in savedList &&
    savedList[key] &&
    savedList[key].includes(id)
  ) {
    saved = true
  }

  const saveClick = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    if (!saved) {
      const tag = loc + '_save_clicked'
      firebase.analytics().logEvent(tag)
      dispatch(saveInspiration(id, type))
    } else {
      const tag = loc + '_unsave_clicked'
      firebase.analytics().logEvent(tag)
      dispatch(removeInspiration(id, type))
    }
  }

  return (
    <div className={style.saveContainer}>
      {noButton === undefined ? (
        <div onClick={saveClick} className={`${saved ? style.active : ''} ${style.updateBtn}`}>
          <Save className={style.save} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </div>
      ) : (
        <div
          onClick={e => {
            saveClick(e)
          }}
          className={`${saved ? style.active : ''} ${style.saveBtn}`}
        >
          <Save className={style.save} />
        </div>
      )}
    </div>
  )
}

export default SaveBtn
