import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'

import DesignDetailsReducer from './DesignDetailsReducer'
import ProductDetailsReducer from './ProductDetailsReducer'
import FollowingReducer from './FollowingReducer'
import ProductDetailsTabReducer from './ProductDetailsTabReducer'
import ShareReducer from './ShareReducer'
import MarketProductFeedReducer from './MarketProductFeedReducer'
import VerifyModalReducer from './VerifyModalReducer'
import PriceTagReducer from './PriceTagReducer'
import InspirationFeedReducer from './InspirationFeedReducer'
import LikeReducer from './LikeReducer'
import SaveInspirationReducer from './SaveInspirationReducer'
import SaveProductReducer from './SaveProductReducer'
import InspirationScrollReducer from './InspirationScrollReducer'
import QuestReducer from './QuestReducer'
import PopularHashTagsReducer from './PopularHashTagsReducer'
import DMReducer from './DMReducer'
import profileReducers from '../../profile/store'
import CheckInReducer from './CheckInReducer'
import GiftReducer from './GiftReducer'

import createInfiniteFeed from './feedInfiniteSlice'
import ItemSlice from './ItemSlice'
import BrandSlice from './BrandSlice'

const allReducers = Object.assign({}, profileReducers, {
  inspirationFeed: InspirationFeedReducer,
  like: LikeReducer,
  saveInspiration: SaveInspirationReducer,
  saveProduct: SaveProductReducer,
  scroll: InspirationScrollReducer,
  productTab: ProductDetailsTabReducer,
  share: ShareReducer,
  marketProductFeed: MarketProductFeedReducer,
  verificationModal: VerifyModalReducer,
  priceTag: PriceTagReducer,
  popularHashTags: PopularHashTagsReducer,
  checkIn: CheckInReducer,
  gift: GiftReducer,

  auth: AuthReducer,
  designdetails: DesignDetailsReducer,
  productdetails: ProductDetailsReducer,
  follows: FollowingReducer,
  quest: QuestReducer,
  dm: DMReducer,

  item: ItemSlice,
  brand: BrandSlice,
  inspiration: createInfiniteFeed('inspiration', 'userInspirations', 'getUserInspirations5')
})

const rootReducer = combineReducers(allReducers)
export default rootReducer
