import {
  QUEST_ITEM_COMPLETE,
  QUEST_COMPLETE,
  QUEST_START,
  QUEST_CLOSE
} from '../../constants/QuestConstants'
import { getQuestItems, getQuest, items } from '../actions/QuestActions'

const initialState = {
  haveQuest: getQuest() ? getQuest() : false,
  items: getQuestItems() ? getQuestItems() : items,
  close: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case QUEST_START: {
      return {
        ...state,
        close: false,
        haveQuest: true,
        items: action.items
      }
    }
    case QUEST_ITEM_COMPLETE: {
      return {
        ...state,
        items: action.items
      }
    }
    case QUEST_COMPLETE: {
      return {
        ...state,
        haveQuest: false
      }
    }
    case QUEST_CLOSE: {
      return {
        ...state,
        close: true
      }
    }
    default:
  }

  return state
}
