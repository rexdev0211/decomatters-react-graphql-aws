import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { goRootStored } from '../utils'
import { DEV_ENDPOINT, PROD_ENDPOINT } from './constants'
import { updatePUser, me as savedMe } from '../../storage/authLocalStorage'
import { logout } from '../../redux/actions/AuthActions'

const DEV_STRIPE_AUTH_TOKEN =
  'Bearer sk_test_51HDYfWDVqvipRL9ob3kdcUigXUpeeSFyyyyEY1ZwXkHjQQNujXEknQWVzElhT4i2sCml2yRprWFTutNF9U38CZlb00ey2MvCe1'
const PROD_STRIPE_AUTH_TOKEN =
  'Bearer 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'
const DEV_REVENUS_CAT_AUTH_TOKEN = 'Bearer TmhuQZnVUunBqhidvCeHWJsZKXqJGFaN'
const PROD_REVENUS_CAT_AUTH_TOKEN = 'Bearer fcmwBtEumrGWgLxrCNEAmNfclksYaooR'

const STRIPE_PRODUCT_IDS = {
  prod_Ino8iK8EljnbzC: 'Yearly',
  prod_Ino8JKC8tIhcwN: 'Monthly',
  prod_KCdoYfqaqh5n36: 'Monthly',
  prod_KCdoks0Wzppw7B: 'Weekly',
  prod_IZaaDSPUYnktKT: 'Yearly',
  prod_IZabhSkVQ5UFc0: 'Monthly',
  prod_KCdmwVjG128rwl: 'Monthly',
  prod_KCbQgYyvHavMrp: 'Weekly',
  yearlyMember: 'Yearly',
  monthlyMember: 'Monthly',
  weeklyMember: 'Weekly'
}

const CROSS_CHECK = {
  yearlyMember: process.env.REACT_APP_APPID === '1' ? 'prod_IZaaDSPUYnktKT' : 'prod_Ino8iK8EljnbzC',
  monthlyMember:
    process.env.REACT_APP_APPID === '1' ? 'prod_IZabhSkVQ5UFc0' : 'prod_Ino8JKC8tIhcwN',
  weeklyMember: process.env.REACT_APP_APPID === '1' ? 'prod_KCbQgYyvHavMrp' : 'prod_KCdoks0Wzppw7B'
}
/*
const PROD_STRIPE_YEAR = 'prod_Ino8iK8EljnbzC'
const PROD_STRIPE_MONTH = 'prod_Ino8JKC8tIhcwN'
const DEV_STRIPE_YEAR = 'prod_IZaaDSPUYnktKT'
const DEV_STRIPE_MONTH = 'prod_IZabhSkVQ5UFc0'
*/
export const loadMe = createAsyncThunk(
  'profile/loadMe',
  async ({ puser, history }, { getState, dispatch }) => {
    // Get My userdata
    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    const result = await goRootStored(ep + 'getMe1', null)

    if (result.error) {
      //if(history) dispatch(logout(history))
      return result
    }

    var adjust = Object.assign({}, result.result)
    delete adjust.user

    var pic = 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
    if (result.result.user.thumbProfileImageFile) pic = result.result.user.thumbProfileImageFile.url
    else if (result.result.user.cfTbImageUrl) pic = result.result.user.cfTbImageUrl

    var usr = {
      ...adjust,
      uniqueDisplayName: 'DM_User_' + result.result.user.objectId.slice(-2),
      pic,
      haveMembership: false,
      numCoins: result.result.numCoins || 0,
      ...result.result.user
    }

    if (puser) {
      usr = {
        ...usr,
        ...puser
      }

      //console.log(usr)
    }

    //---------------------------------------------------
    // CHECK MEMBERSHIP

    const cattoken =
      process.env.REACT_APP_APPID === '3' ? PROD_REVENUS_CAT_AUTH_TOKEN : DEV_REVENUS_CAT_AUTH_TOKEN
    const catoptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cattoken
      }
    }

    const url = 'https://api.revenuecat.com/v1/subscribers/' + usr.objectId
    const response = await fetch(url, catoptions)
    const res = await response.json()

    if (!res.subscriber) return usr
    const sub = res.subscriber
    if (Object.keys(sub.entitlements).length === 0 && Object.keys(sub.subscriptions).length === 0)
      return usr
    //console.log(res)
    //HAVE MEMBERSHIP
    var membership = null
    var membershipId = null
    // Entitlement Field Check
    var isExpired = true
    const today = new Date()

    //Check in entitlement field for any membership
    for (var item in res.subscriber.entitlements) {
      const m = sub.entitlements[item]
      const exp = Date.parse(m.expires_date)
      isExpired = exp - today.getTime() <= 0 ? true : false
      if (isExpired) continue

      membershipId = CROSS_CHECK[m.product_identifier]
      membership = { ...sub.subscriptions[membershipId], membershipId }
    }
    //Check in subscription field for any membership
    for (var item in res.subscriber.subscriptions) {
      //check if user own subs match with latest products in stripe
      const m = sub.subscriptions[item]

      const exp = Date.parse(m.expires_date)
      isExpired = exp - today.getTime() <= 0 ? true : false
      if (isExpired) continue

      //check from apple
      if (item === 'yearlyMember' || item === 'monthlyMember' || item === 'weeklyMember') {
        membershipId = CROSS_CHECK[item]
        membership = { ...sub.subscriptions[CROSS_CHECK[item]], membershipId }
        break
      }
      //check from stripe
      else {
        const idChecker = STRIPE_PRODUCT_IDS[item]
        if (!idChecker) console.error('Unkown Subscription ID')
        membershipId = item
        membership = { ...sub.subscriptions[item], membershipId }
        break
      }
    }

    usr = {
      ...usr,
      haveMembership: true,
      membership
    }
    //console.log(usr)

    const stripetoken =
      process.env.REACT_APP_APPID === '3' ? PROD_STRIPE_AUTH_TOKEN : DEV_STRIPE_AUTH_TOKEN
    const stripeoptions = {
      headers: {
        Authorization: stripetoken
      }
    }

    const stripeProducts = await fetch(
      'https://api.stripe.com/v1/products/' + membershipId,
      stripeoptions
    )
    const stripeProuctData = await stripeProducts.json()

    const stripePrices = await fetch('https://api.stripe.com/v1/prices', stripeoptions)
    const stripePriceData = await stripePrices.json()

    const stemp = { ...stripeProuctData }
    for (var x = 0; x < stripePriceData.data.length; x++) {
      if (stripePriceData.data[x].product === stripeProuctData.id) {
        stemp['price'] = stripePriceData.data[x]
        stemp['nickname'] = stripePriceData.data[x].nickname
      }
    }

    usr.membership = {
      ...usr.membership,
      ...stemp
    }

    updatePUser(usr)
    return usr
  }
)

export const loadOthers = createAsyncThunk('profile/loadOthers', async (userid, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goRootStored(ep + 'getOtherUser1', { userId: userid })

  if (result.error) return result

  var adjust = Object.assign({}, result.result)
  delete adjust.user

  var pic = 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
  if (result.result.user.thumbProfileImageFile) pic = result.result.user.thumbProfileImageFile.url
  else if (result.result.user.cfTbImageUrl) pic = result.result.user.cfTbImageUrl

  var usr = {
    ...adjust,
    uniqueDisplayName: 'DM_User_' + result.result.user.objectId.slice(-2),
    pic,
    ...result.result.user
  }

  return usr
})

//------------------------------------------------------------

export const saveUsername = createAsyncThunk(
  'profile/saveUsername',
  async (uniqueDisplayName, { getState }) => {
    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    const result = await goRootStored(ep + 'updateUserUniqueDisplayName1', { uniqueDisplayName })
    return result
  }
)

export const saveProfile = createAsyncThunk('profile/saveProfile', async (body, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goRootStored(ep + 'updateUser1', body)
  return result
})

export const updateEmail = createAsyncThunk('profile/updateEmail', async (email, { getState }) => {
  const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
  const result = await goRootStored(ep + 'updateUser1', { email })
  return result
})

export const resetPassword = createAsyncThunk(
  'profile/resetPassword',
  async (email, { getState }) => {
    const ep = process.env.REACT_APP_APPID === '1' ? DEV_ENDPOINT : PROD_ENDPOINT
    const result = await goRootStored(ep + 'requestPasswordReset1', { email })
    return result
  }
)

const profile = createSlice({
  name: 'profile',
  initialState: {
    token: null,
    appid: 3,
    userid: null,
    me: savedMe(),
    pic: null,
    username: null,
    about: null,
    level: null,
    dcoins: null,
    numFollowing: null,
    numFollowers: null,
    numDesigns: null,
    numMyrooms: null,
    numMydecor: null,
    badgeRewards: [],
    badgesNotStarted: [],
    userdata: null,
    others: null
  },
  reducers: {
    setupProfilePic: (state, user) => {
      if (!user) return

      var pic = 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
      if (user.thumbProfileImageFile) pic = user.thumbProfileImageFile.url
      else if (user.cfTbImageUrl) pic = user.cfTbImageUrl

      state.pic = pic
    },
    setupMe: (state, me) => {
      if (!me) return

      state.level = me.userLevel || 0
      state.dcoins = me.numCoins || 0
      state.badgeRewards = me.badgeRewards || []
      state.badgesNotStarted = me.badgesNotStarted || []
    },
    setupUser: (state, user) => {
      if (!user) return

      state.userid = user.objectId
      state.username = user.uniqueDisplayName
      state.about = user.aboutMe
      state.numFollowing = user.numFollowing
      state.numFollowers = user.numFollowers
      state.numDesigns = user.numDesigns
      state.numMydecor = user.numMyDecor ? user.numMyDecor : state.numMydecor
      state.numMyrooms = user.numUserTemplates ? user.numUserTemplates : state.numMyrooms

      state.userdata = user
      state.me = {
        ...state.me,
        ...user
      }
    },
    init: (state, action) => {
      if (!action.payload) return
      const d = action.payload
      state.token = d.token
      state.appid = d.appid
      state.userid = d.userid
      state.me = d.me

      profile.caseReducers.setupProfilePic(state, d.me)
      profile.caseReducers.setupUser(state, d.me)
    }
  },
  extraReducers: {
    [loadMe.fulfilled]: (state, action) => {
      if (!action.payload) return
      const r = action.payload

      if (r.error) return
      const saved = savedMe()
      state.me = {
        ...saved,
        ...r
      }
      //profile.caseReducers.setupProfilePic(state, r)
      //profile.caseReducers.setupMe(state, r)
      //profile.caseReducers.setupUser(state, r)
    },
    [loadOthers.fulfilled]: (state, action) => {
      if (!action.payload) return
      const r = action.payload

      if (r.error) return
      state.others = r
    },
    [saveUsername.fulfilled]: (state, action) => {
      if (!action.payload) return

      if (action.payload.error) return

      state.me = {
        ...state.me,
        uniqueDisplayName: action.payload.result.updatedUserObject.uniqueDisplayName
      }
    },
    [saveProfile.fulfilled]: (state, action) => {
      if (!action.payload) return

      console.log(action.payload)
      if (!action.payload.result) return

      const usr = action.payload.result.user

      const toUpdate = {
        thumbProfileImageFile: usr.thumbProfileImageFile,
        pic: usr.thumbProfileImageFile.url
      }

      state.me = {
        ...state.me,
        ...usr,
        ...toUpdate
      }
      /*
      profile.caseReducers.setupProfilePic(state, action.payload.user)
      profile.caseReducers.setupMe(state, action.payload)
      profile.caseReducers.setupUser(state, action.payload.user)
      */
    }
    /*
    [loadMyProfile.fulfilled]: (state, action) => {
      if (!action.payload) return

      profile.caseReducers.setupProfilePic(state, action.payload.user)
      profile.caseReducers.setupMe(state, action.payload)
      profile.caseReducers.setupUser(state, action.payload.user)
    },
    
    [loadMembership.fulfilled]: (state, action) => {
      if (!action.payload) return
      //console.log(action.payload)
      state.membership = action.payload
    },
    [loadMembershipProduct.fulfilled]: (state, action) => {
      if (!action.payload) return
      //console.log(action.payload)
      state.membership = {
        ...state.membership,
        ...action.payload
      }
    }
    */
  }
})

export const { init } = profile.actions

export default profile.reducer
