import {
  QUEST_ITEM_COMPLETE,
  QUEST_COMPLETE,
  QUEST_START,
  QUEST_CLOSE
} from '../../constants/QuestConstants'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { getUserId } from '../../storage/authLocalStorage'

const keyQuest = 'keyquest'
const keyQuestItems = 'keyquestitems'
const keyIntroQuest = 'keyintroquest'

export const items = [
  {
    complete: false,
    id: 'save_design',
    tag: 'savedesign',
    title: 'Save an inspiration',
    desc: 'Hover over a design below and click on Save'
  },
  {
    complete: false,
    id: 'share_design',
    tag: 'sharedesign',
    title: 'Share a design',
    desc: 'Hover over a design below and click on Share'
  },
  {
    complete: false,
    id: 'get_app',
    tag: 'getapp',
    title: 'Get the App and start designing',
    desc: 'Download our app by clicking here',
    link:
      'https://apps.apple.com/us/app/decormatters-com/id1168709467?_branch_match_id=765663738435065220'
  }
]

export const getQuest = id => {
  const userId = getUserId()
  return Boolean(localStorage.getItem(keyQuest + userId))
}

export const getQuestItems = id => {
  const userId = getUserId()
  const questItems = JSON.parse(localStorage.getItem(keyQuestItems + userId))
  if (questItems === null) return items
  return questItems
}

export const setIntroQuest = userId => {
  //localStorage.removeItem(keyIntroQuest)
  const intro = localStorage.getItem(keyIntroQuest + userId)

  if (intro === 'false') return false
  else {
    localStorage.setItem(keyIntroQuest + userId, true)
    return true
  }
}

export const newQuest = userId => {
  const haveIntro = localStorage.getItem(keyIntroQuest + userId)
  // console.log(haveIntro === false, haveIntro === 'false')
  if (haveIntro === 'false') return false

  firebase.analytics().logEvent('quest', {
    content_type: 'intro',
    content_id: 0,
    value: 'start'
  })

  const tag = 'quest_introstart_viewed'
  firebase.analytics().logEvent(tag)

  localStorage.setItem(keyQuest + userId, true)
  setQuestData(userId)
}

export const setQuestData = userId => {
  localStorage.setItem(keyQuestItems + userId, JSON.stringify(getQuestItems(userId)))
}

export const completeQuestItem = (index, userId) => {
  const items = JSON.parse(localStorage.getItem(keyQuestItems + userId))
  items[index].complete = true
  localStorage.setItem(keyQuestItems + userId, JSON.stringify(items))

  firebase.analytics().logEvent('quest', {
    content_type: 'intro',
    content_id: 0,
    value: items[index].id
  })

  const tag = 'quest_intro' + items[index].id + '_viewed'
  firebase.analytics().logEvent(tag)
}

export const checkQuestProgress = userId => {
  const items = JSON.parse(localStorage.getItem(keyQuestItems + userId))
  var count = 0
  for (const item of items) {
    if (Boolean(item.complete) === true) count++
  }
  if (count === items.length) return true
  return false
}

export const removeQuest = userId => {
  localStorage.setItem(keyIntroQuest + userId, false)
  localStorage.removeItem(keyQuest + userId)
  localStorage.removeItem(keyQuestItems + userId)
}

export const startQuest = userId => dispatch => {
  newQuest(userId)
  dispatch({ type: QUEST_START, items: getQuestItems(userId) })
}

export const updateQuest = index => (dispatch, state) => {
  const userId =
    state().auth.user && state().auth.user.puser && state().auth.user.puser.objectId
      ? state().auth.user.puser.objectId
      : false
  if (userId === false) return
  if (typeof index === 'undefined') {
    return
  }
  // console.log(userId, getQuest(userId))
  if (!getQuest(userId)) {
    return
  }

  completeQuestItem(index, userId)

  const isComplete = checkQuestProgress(userId)

  if (isComplete === false) {
    dispatch({ type: QUEST_ITEM_COMPLETE, items: getQuestItems(userId) })
  } else {
    dispatch(endQuest(userId))
  }
}

export const endQuest = userId => dispatch => {
  firebase.analytics().logEvent('quest', {
    content_type: 'intro',
    content_id: 0,
    value: 'end'
  })

  const tag = 'quest_introend_viewed'
  firebase.analytics().logEvent(tag)

  removeQuest(userId)
  dispatch({ type: QUEST_COMPLETE })
}

export const closeQuest = () => dispatch => {
  dispatch({ type: QUEST_CLOSE })
}
