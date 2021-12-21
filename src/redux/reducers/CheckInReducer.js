import { createSlice } from '@reduxjs/toolkit'
import { parseHeaders } from '../../util/fetchUtil'

const BASE =
  process.env.REACT_APP_APPID === '1'
    ? 'https://decormatters-dev.herokuapp.com/parse/functions/'
    : `https://decormatters-prod.herokuapp.com/parse/functions/`

const ENDPOINTS = {
  GET_DAILY_TASKS: `${BASE}getDailyTasks2`,
  ATTEMPT_DAILY_TASK_RESET: `${BASE}attemptDailyTaskReset2`,
  REWARD_DAILY_TASK: `${BASE}rewardDailyTask1`,
  GET_WELCOME_GIFTS: `${BASE}getWelcomeGifts1`,
  WELCOME_GIFT_STATUS: `${BASE}welcomeGiftStatus1`,
  REWARD_WELCOME_GIFT: `${BASE}rewardWelcomeGift1`,
  GET_RECOMMENDED_USERS: `${BASE}getRecommendedUsers1`
}

const checkin = createSlice({
  name: 'checkin',
  initialState: {
    active: false,
    autoOpen: false,
    loadingStatus: null,
    dailyTasks: null,
    taskRecord: null,
    officialUTCStartHour: null,
    welcomeTasks: null,
    welcomeRecord: null,
    showReward: false,
    rewardAmount: 50,
    recommendedDesigners: null,
    showFollowModal: false
  },
  reducers: {
    openModal: state => {
      state.active = true
    },
    closeModal: state => {
      state.active = false
      state.autoOpen = false
    },
    loading: state => {
      state.loadingStatus = 'loading'
    },
    loaded: state => {
      state.loadingStatus = 'loaded'
    },
    showReward: (state, action) => {
      state.showReward = true
      state.rewardAmount = action.payload
    },
    hideReward: state => {
      state.showReward = false
    },
    setTasks: (state, action) => {
      let { dailyTasks, currentTaskStatus, officialUTCStartHour } = action.payload
      state.dailyTasks = dailyTasks
      state.taskRecord = currentTaskStatus
      state.officialUTCStartHour = officialUTCStartHour
      let rewardedTasks = currentTaskStatus ? currentTaskStatus.rewardedDtIds || [] : [] // default of [] (no tasks rewarded) if rewardedDtIds or currentTaskStatus is missing
      if (rewardedTasks.length < 4) {
        // switch to 5 after virtual gift is enabled
        state.autoOpen = true // open modal on page load or login if any tasks remain to be completed
      }
    },
    setWelcomeTasks: (state, action) => {
      state.welcomeTasks = action.payload
    },
    setWelcomeRecord: (state, action) => {
      state.welcomeRecord = action.payload
    },
    setRecommendedDesigners: (state, action) => {
      state.recommendedDesigners = action.payload
    },
    openFollowModal: state => {
      state.showFollowModal = true
      state.active = false
    },
    closeFollowModal: state => {
      state.showFollowModal = false
    }
  }
})

// --- redux thunks ---
export const getDailyTasks = () => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(ENDPOINTS.GET_DAILY_TASKS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      return dispatch(checkin.actions.setTasks(result))
    } catch (error) {
      // handle error
    }
  }
}

export const claimDailyTaskReward = taskId => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(`${ENDPOINTS.REWARD_DAILY_TASK}?dailyTaskId=${taskId}`, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      if (result && result.coinReward) {
        dispatch(checkin.actions.showReward(result.coinReward))
        dispatch(getDailyTasks())
      }
    } catch (error) {
      // handle error
    }
  }
}

export const attemptDailyTasksReset = () => {
  return async (dispatch, state) => {
    try {
      dispatch(checkin.actions.loading())
      const response = await fetch(ENDPOINTS.ATTEMPT_DAILY_TASK_RESET, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { didReset } = await response.json()
      await Promise.all([
        dispatch(getDailyTasks()),
        dispatch(getWelcomeTasks()),
        dispatch(welcomeGiftStatus())
      ])
      return dispatch(checkin.actions.loaded())
    } catch (error) {
      // handle error
    }
  }
}

export const resetAndOpen = () => {
  return async (dispatch, state) => {
    try {
      dispatch(checkin.actions.openModal())
      dispatch(attemptDailyTasksReset())
    } catch (error) {
      // handle error
    }
  }
}

export const getWelcomeTasks = () => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(ENDPOINTS.GET_WELCOME_GIFTS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      return dispatch(checkin.actions.setWelcomeTasks(result.welcomeGifts))
    } catch (error) {
      // handle error
    }
  }
}

export const welcomeGiftStatus = () => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(ENDPOINTS.WELCOME_GIFT_STATUS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      return dispatch(checkin.actions.setWelcomeRecord(result.welcomeGiftRecord))
    } catch (error) {
      // handle error
    }
  }
}

export const claimWelcomeGiftReward = giftId => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(`${ENDPOINTS.REWARD_WELCOME_GIFT}?welcomeGiftId=${giftId}`, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      if (result && result.coinReward) {
        dispatch(checkin.actions.showReward(result.coinReward))
        dispatch(welcomeGiftStatus())
      }
    } catch (error) {
      // handle error
    }
  }
}

export const getRecommendedUsers = () => {
  return async (dispatch, state) => {
    try {
      const response = await fetch(ENDPOINTS.GET_RECOMMENDED_USERS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders()
      })
      const { result } = await response.json()
      dispatch(checkin.actions.setRecommendedDesigners(result.recommendedUsers))
    } catch (error) {
      // handle error
    }
  }
}

export const closeFollowModalAndUpdate = () => {
  return async (dispatch, state) => {
    dispatch(checkin.actions.closeFollowModal())
    dispatch(getDailyTasks())
  }
}

export const { openModal, closeModal, showReward, hideReward, openFollowModal } = checkin.actions

export default checkin.reducer
