import React, { useCallback, useEffect, useRef, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import IntersectionObserver from 'intersection-observer-polyfill'

import { IndividualItem } from '../feeds/InspirationFeed'
import { setLikes } from '../../redux/actions/LikeAction'
import { getSavedUserInspiration } from '../../redux/actions/SaveInspirationAction'
import { FollowAction, getFollowList, unFollowAction } from '../../redux/actions/FollowingActions'
import { requestHelper } from '../../redux/actions/InspirationFeedAction'

import styles from './profile.module.css'
import feedStyle from '../feeds/feed.module.css'
import style2 from '../design/userheader.module.css'
// import { gotoLogIn } from '../../redux/actions/AuthActions'
import { Redirect } from 'react-router-dom'

//Update to using Context/provider - time crunch so will pass down values for now.
const Profile = props => {
  if (!!+process.env.REACT_APP_ENABLE_USER_PROFILE === false) return <Redirect to={'/'} />
  return <ProfileContainer {...props} />
}

const ProfileContainer = props => {
  const profileId = props.match.params.id
  const [user, setUser] = useState()
  const [badges, setBadges] = useState()
  const [userLevel, setUserLevel] = useState()
  const [userNotFound, setUserNotFound] = useState()
  const { following } = useSelector(state => state.follows)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const { savedList } = useSelector(state => state.saveInspiration)

  useEffect(() => {
    batch(() => {
      dispatch(getSavedUserInspiration())
      dispatch(getFollowList())
    })

    //if(isAuthenticated)
  }, [dispatch, auth])

  const getProfile = async id => {
    let requestHeader = requestHelper({ userId: id })
    let data = await fetch(process.env.REACT_APP_GET_PROFILE_BY_ID, requestHeader)
    if (data.status === 400) {
      return data.json()
    }
    if (data.status !== 200) {
      throw 'Not Logged In'
    }

    return data.json()
  }

  useEffect(() => {
    getProfile(profileId)
      .then(res => {
        if (res.code) {
          //api call returned no user
          setUserNotFound(true)
          return
        }
        setUser(res.result.user)
        setBadges(res.result.badgeRewards)
        if (res.result.userLevel) setUserLevel(Math.floor(res.result.userLevel))
      })
      .catch(error => {
        //dispatch(gotoLogIn())
      })
  }, [profileId, following])

  if (userNotFound) {
    return <Redirect to={'/'} />
  }
  if (!user) return <></>

  return (
    <>
      <div
        style={{ width: '100%', height: '90%', overflow: 'hidden' }}
        className={styles.profileDesktop}
      >
        <div className={`${styles.left} ${styles.column}`}>
          <ProfileSideMenu id={profileId} user={user} badges={badges} userLevel={userLevel} />
        </div>
        <div className={`${styles.right} ${styles.column}`}>
          <ProfilePosts user={user} id={profileId} savedList={savedList} />
        </div>
      </div>
    </>
  )
}

const ProfileSideMenu = props => {
  const user = props.user
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <div className={styles.profileMainData}>
        <ProfileImage user={user} userLevel={props.userLevel} />
        <FollowButton id={props.id} user={user} />
        <ProfileName user={user} />
      </div>
      <div className={styles.showWeb}>
        <ProfileDescription user={user} />
        <FollowCount user={user} />
        {/*<PostCount user={user} />*/}
        <Badges badges={props.badges} />
      </div>
    </div>
  )
}

const ProfileImage = props => {
  let userImage
  if (props.user.thumbProfileImageFile) userImage = props.user.thumbProfileImageFile.url
  if (props.user.cfTbImageUrl) userImage = props.user.cfTbImageUrl
  // console.log(props.user)
  return (
    <div style={{ textAlign: 'center', position: 'relative', width: '100%' }}>
      <div
        className={styles.profileImage}
        style={{
          backgroundImage: `url( ` + userImage + `)`
        }}
      >
        <div className={styles.level}>Lv {props.userLevel}</div>
      </div>
    </div>
  )
}

const ProfileName = props => {
  return <div className={styles.name}>{props.user.uniqueDisplayName}</div>
}

const ProfileDescription = props => {
  return <div className={styles.aboutMe}>{props.user.aboutMe}</div>
}

/* Post Count Section - not using yet */
const PostCount = props => {
  return (
    <div className={styles.postCountContainer}>
      <p className={styles.postCount}>{props.user.numDesigns}</p>
      <p className={styles.postCountText}>Total Post</p>
    </div>
  )
}
const FollowCount = props => {
  const numFollowers = props.user.numFollowers
  const numFollowing = props.user.numFollowing
  return (
    <div className={styles.followCountContainer}>
      <div className={styles.followContainer}>
        <div className={styles.followerCount}>
          <p className={styles.countNumber}>{numFollowers}</p>
          <p className={styles.followingText}>Followers</p>
        </div>
        <p className={styles.followDivider} />
        <div className={styles.followerCount}>
          <p className={styles.countNumber}>{numFollowing}</p>
          <p className={styles.followingText}>Following</p>
        </div>
      </div>
    </div>
  )
}

/* Badges for profile page */
const Badges = props => {
  const [showBadge, setShowBadge] = useState(false)
  const badges = props.badges
  if (!badges) return <></>

  const showBadges = () => {
    setShowBadge(true)
  }

  const hideBadges = () => {
    setShowBadge(false)
  }
  return (
    <div className={styles.badgeContainer}>
      <div className={styles.badgeHeader}>Badges</div>
      <div className={styles.badgeList}>
        <div className={styles.badge}>
          {badges.map((value, index) => {
            // console.log(value)

            if (index <= badges.length - 1)
              return (
                <img
                  key={index + 'badges'}
                  src={value.currentCFImageUrl}
                  alt={value.badge.title}
                  title={value.badge.title}
                  width="45"
                  height="45"
                  draggable="false"
                  className={`${index > 4 && !showBadge ? styles.hide : false}`}
                />
              )
          })}
          {badges.length - 5 > 0 && (
            <>
              <div
                className={`${badges.length < 4 || showBadge ? styles.hide : false} ${
                  styles.circleCount
                }`}
                onClick={showBadges}
              >
                <span>{badges.length - 5}+ </span>
              </div>

              <div
                className={`${!showBadge ? styles.hide : false} ${styles.circleCount}`}
                onClick={hideBadges}
              >
                <span>Hide</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* Follow Button Logic */
const FollowButton = props => {
  const dispatch = useDispatch()
  const id = props.id
  const { following } = useSelector(state => state.follows)
  const followState = following && following.includes(id) ? true : false
  // console.log(following)
  const followClick = e => {
    e.stopPropagation()
    e.preventDefault()
    if (followState) {
      dispatch(unFollowAction(id))
    } else {
      dispatch(FollowAction(id))
    }
  }
  return (
    <div className={style2.header} style={{ textAlign: 'center' }}>
      <button
        style={{ float: 'none', margin: '20px 0' }}
        className={`${style2.followBtn} ${followState ? style2.active : ''}`}
        onClick={followClick}
      >
        {followState ? 'Followed' : 'Follow'}
      </button>
    </div>
  )
}

/* Time crunch - add all profile posts logic here */
const ProfilePosts = props => {
  const id = props.id
  const user = props.user
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [stop, setStop] = useState(false)
  // console.log(props.savedList)

  const getUserInspirations = async id => {
    let requestHeader = requestHelper({ userId: id, skip: page * 10 })
    let data = await fetch(process.env.REACT_APP_GET_USER_INSPIRATIONS, requestHeader)

    setPage(page + 1)
    return data.json()
  }

  //getList of inspirations for specific user and set to posts data
  const getInspirationsList = () => {
    let currPosts = posts

    if (stop === true) return // no more posts - dont rerun

    //get new list pagination
    getUserInspirations(id).then(res => {
      //no more new posts - set stop
      if (res.result.userInspirations.length === 0) {
        setStop(true)
        return
      }

      //update like data - sadly this is within this call :(
      dispatch(setLikes(res.result))

      //set Posts
      setPosts(currPosts.concat(res.result.userInspirations))
    })
  }

  useEffect(() => {
    getInspirationsList()
  }, [])

  // const page = 1
  const observer = useRef()
  const lastFeedItem = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            getInspirationsList()
          }
        },
        {
          threshold: 1
        },
        [page]
      )
      if (node) observer.current.observe(node)
    },
    [posts, page, dispatch]
  )
  if (!posts) return <></>

  const getImageFile = post => {
    if (post.idea && post.idea.cfThumbImageUrl) return post.idea.cfThumbImageUrl
    if (post.idea && post.idea.thumbImageFile) return post.idea.thumbImageFile.url
    if (post.feedImageFile && post.feedImageFile.url) return post.feedImageFile.url
    return ''
  }
  return (
    <>
      <div className={styles.tabContainer}>
        <h3 className={styles.mobilePostHeader}>Posts</h3>
        <div className={styles.tabList}>
          <div className={styles.tabListInner}>
            <div className={styles.tabListListContainer}>
              <ul>
                <li>
                  <h3 style={{ borderBottom: '2px solid black', cursor: 'pointer' }}>Posts</h3>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.separator} />
        </div>
      </div>

      <div className={styles.myPostContainer}>
        {posts.map((value, index) => {
          return (
            <div
              key={index + value.objectId}
              className={`${feedStyle.inspiration} ${
                index + 1 >= posts.length ? styles.last : ''
              } ${styles.inspiration}`}
              ref={index + 1 >= posts.length ? lastFeedItem : () => {}}
            >
              <IndividualItem
                url={getImageFile(value)}
                user={user}
                id={value.objectId}
                noTrack={true} //no track is to prevent back button from setting page position
                savedlist={props.savedList}
                type={value.type}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Profile
