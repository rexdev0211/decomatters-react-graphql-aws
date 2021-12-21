import {
  GET_POPULAR_HASHTAGS,
  WAIT_GET_POPULAR_HASHTAGS
} from '../../constants/PopularHashTagsConstants'

import { requestHelper } from '../actions/InspirationFeedAction'
import 'firebase/analytics'

const normalizeHashtagObject = (hashtagObj, type) => {
  return {
    hashtagType: type,
    title: hashtagObj.hashtag.title,
    previewImageUrl: hashtagObj.hashtag.previewImageUrl
  }
}
export const getPopularHashtags = () => {
  return async dispatch => {
    // dispatch(contentIsLoading(true));
    try {
      //grab popular and recommended admin pick

      let popularHashTagList = []

      if (!!+process.env.REACT_APP_ENABLE_POPULAR_HASHTAGS ? true : false) {
        const appendant = requestHelper({ pageLimit: 10, skip: 0 })
        const response = await fetch(process.env.REACT_APP_GET_HASHTAGS, appendant)
        const popularJson = await response.json()

        popularHashTagList = popularJson.result.popularHashtags.map((hashtag, index) => {
          return normalizeHashtagObject(hashtag, 'popular')
        })
      }

      const appendant2 = requestHelper({ pageLimit: 10, skip: 0, types: ['adminPick'] })
      const response2 = await fetch(process.env.REACT_APP_GET_HASHTAGS, appendant2)
      const adminPickJson = await response2.json()
      let adminPickHashTagList = adminPickJson.result.popularHashtags.map((hashtag, index) => {
        return normalizeHashtagObject(hashtag, 'adminPick')
      })

      const hashTagResponse = [...adminPickHashTagList, ...popularHashTagList]

      dispatch(GetHashTags({ hashtags: hashTagResponse }))
    } catch (error) {}
  }
}

export const GetHashTags = hashtags => {
  return {
    type: GET_POPULAR_HASHTAGS,
    hashtags: hashtags
  }
}
