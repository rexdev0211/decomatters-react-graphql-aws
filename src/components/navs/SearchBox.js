import styles from './nv.module.css'
import { ReactComponent as Magnify } from '../../assets/search-icon.svg'
import { ReactComponent as Close } from '../../assets/close.svg'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { setScrollPos } from '../../redux/actions/InspirationScrollAction'
import { requestHelper } from '../../redux/actions/InspirationFeedAction'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { getPopularHashtags } from '../../redux/actions/PopularHashTagsAction'
import { LoadingIndicator2 } from '../feeds/LoadingIndicator'
import {
  deleteRecentSearches,
  getRecentSearchResults,
  setRecentSearch
} from '../../storage/searchLocalStorage'
import { parseUserId } from '../../storage/authLocalStorage'
const Filter = require('bad-words')

export const GetSearchBar = () => document.getElementById('searchBar')
const SearchBox = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [keyPress, setKeyPress] = useState()
  const [suggestionActive, setSuggestionActive] = useState(false)
  const filter = new Filter()

  useEffect(() => {
    if (searchText === '') {
      setSuggestionActive(false)
    }
    setSearchText(searchText)
  }, [searchText])

  useEffect(() => {
    if (searchText === '' || searchText === null) {
      setSuggestionActive(false)
      //clearSearch()
      return
    }
    //
  }, [suggestionActive])

  useEffect(() => {
    const query = window.location.search.split('?q=')
    if (query.length !== 2) return

    GetSearchBar().value = decodeURIComponent(query[1])
    updateSearch(decodeURIComponent(query[1]))
  }, [window.location.search])

  const updateSearch = text => {
    let searchTextNew = decodeURIComponent(text)

    GetSearchBar().value = searchTextNew

    if (!filter.isProfane(searchTextNew) && searchTextNew.trim() !== '' && searchTextNew !== null) {
      setRecentSearch(encodeURIComponent(searchTextNew), parseUserId())
    }

    setShowOverlay(false)
    setSearchText(searchTextNew)
  }

  const clearSearch = () => {
    firebase.analytics().logEvent('search_clearsearch_clicked')
    GetSearchBar().value = null
    setSearchText('')
  }

  const onChangeSearch = e => {
    setSearchText(e.target.value)
  }

  const onKeyDown = e => {
    setShowOverlay(true)

    if (e.key === 'Escape') {
      setShowOverlay(false)
      GetSearchBar().blur()
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      return
    }
    setKeyPress({ key: e.key, ts: new Date() })
    if (e.key === 'Enter' && suggestionActive === false) {
      enterPressed(e.key)
    }
  }

  const enterPressed = key => {
    if (searchText === '') return
    const text = GetSearchBar().value ? GetSearchBar().value : searchText

    setShowOverlay(false)
    dispatch(setScrollPos(0, ''))
    firebase.analytics().logEvent('search_input_submit')

    // //add to localstorage
    // if (!filter.isProfane(text)) {
    //   setRecentSearch(encodeURIComponent(text), parseUserId())
    // }
    updateSearch(text)
    history.push('/search/?q=' + encodeURIComponent(text))

    setSearchText('')
  }

  const inputOnFocus = e => {
    firebase.analytics().logEvent('search_input_clicked')
    setShowOverlay(true)
  }

  return (
    <div className={styles.nbs}>
      {showOverlay && (
        <div
          className={styles.searchBarOverlay}
          style={{ zIndex: 0, marginTop: '-50px' }}
          onClick={e => {
            firebase.analytics().logEvent('search_overlayoff_clicked')
            setShowOverlay(false)
          }}
        />
      )}
      <div className={styles.sfw}>
        <div className={styles.sfwi}>
          <input
            aria-label={'decormatters_searchbox'}
            aria-autocomplete={'list'}
            id={'searchBar'}
            className={styles.sf}
            onChange={e => onChangeSearch(e)}
            placeholder="Search"
            onKeyDown={onKeyDown}
            autoComplete={'off'}
            onFocus={inputOnFocus}
            style={{ fontSize: '16px' }} //fix for zoom
            role={'combobox'}
            aria-expanded={showOverlay ? true : false}
            aria-controls={'searchBar'}
            spellCheck={false}
            maxLength={'1024'}

            // onBlur={e => {
            //   setShowOverlay(false)
            // }}
          />
          {showOverlay && (
            <SearchSuggestion
              updateSearch={updateSearch}
              searchText={searchText}
              onUpdate={value => {
                setShowOverlay(value)
              }} //close modal
              keyPress={keyPress}
              active={setSuggestionActive} //signal to open recommendation/autocomplete
              callback={enterPressed}
            />
          )}
          <div className={styles.sfi}>
            {!searchText && <Magnify className={styles.mi} width="10" height="10" fill="#40000" />}
          </div>
          <div className={styles.sfe} onClick={clearSearch}>
            {searchText && <Close className={styles.ci} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox

const SearchSuggestion = props => {
  const [ogSearchText, setOgSearchText] = useState(props.searchText)
  const [suggestions, setSuggestion] = useState()
  const [activeOption, setActiveOption] = useState({ value: -1, key: false })
  const history = useHistory()
  const filter = new Filter()
  const showSuggestion = true
  const showRecommendation = true
  const { keyPress } = props

  //Set searchtext to state in case user arrows up through set to show default
  useEffect(() => {
    setOgSearchText(props.searchText)
    setActiveOption({ value: -1, key: false })

    // if (props.searchText === '' || props.searchText === null)
    //   setActiveOption({ value: -1, key: false })
  }, [props.searchText])

  //get Suggestion data
  const getData = useCallback(
    () => {
      const searchText = props.searchText

      if (searchText === '' || filter.isProfane(searchText)) return
      const appendant = requestHelper({ text: searchText })
      fetch(process.env.REACT_APP_GET_SEARCH_RECOMMENDATION, appendant)
        .then(response => response.json())
        .then(data => {
          //to display current user search input inside suggestion box

          const hashtagsDefault = {
            title: props.searchText,
            className: 'userSearch',
            objectId: searchText
          }
          //setup hashtag array for suggestion box
          const hashtagsSet = data.result.hashtags.map((hashtag, index) => {
            let newHashTag = hashtag
            newHashTag.className = 'Hashtag'
            return newHashTag
          })

          //merge usersearch and hashtags together
          const hashtags = [hashtagsDefault, ...hashtagsSet]

          //setup inspiration results for suggestion box
          const userInspirations = data.result.userInspirations.map((inspiration, index) => {
            let newInspiration = inspiration
            newInspiration.className = 'UserInspiration'
            newInspiration.objectId = inspiration._id
            return newInspiration
          })

          //combine all arrays for suggestions
          const combine = [...hashtags, ...userInspirations]

          //set to state
          setSuggestion(combine)

          //reset active options state
          setActiveOption({ value: -1, key: false })
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.searchText]
  )

  //User pressed enter key. Must check if there is a value in input box.
  //if so, search off that term. If something is highlighted, search the highlighted term
  const enterKeyPress = () => {
    if (activeOption.value > -1 && suggestions) {
      const title = getTitle()

      // if (!filter.isProfane(title)) {
      //   setRecentSearch(encodeURIComponent(title), parseUserId())
      // }
      const url =
        suggestions[activeOption.value].className === 'Hashtag' ||
        suggestions[activeOption.value].className === 'userSearch'
          ? '/search/?q=' + encodeURIComponent(title)
          : '/design/' +
            suggestions[activeOption.value].objectId +
            '?q=' +
            encodeURIComponent(title)

      firebase.analytics().logEvent('search_suggestionsubmitenterkey_clicked')

      props.active(false) //close suggestion box parent
      props.onUpdate(false) //close modal parent
      setSuggestion([]) //clear suggestion

      setOgSearchText(title) //update serach term with new one
      props.updateSearch(title)
      history.push(url)
    } else {
      props.callback('Enter') //no suggestion chosen - submit currently input box value
    }
  }

  //key presses
  const arrowDown = () => {
    firebase.analytics().logEvent('search_suggestionarrowdown_clicked')

    if (suggestions && activeOption.value >= suggestions.length - 1) {
      setActiveOption({ value: -1, key: 'keyPress' })
      return
    }
    setActiveOption({ value: activeOption.value + 1, key: 'keyPress' })
    return true
  }

  const arrowUp = () => {
    firebase.analytics().logEvent('search_suggestionarrowup_clicked')

    if (activeOption.value < 0) {
      setActiveOption({ value: suggestions.length - 1, key: 'keyPress' })
      return
    }
    if (activeOption.value <= 0) {
      GetSearchBar().value = ogSearchText
      setActiveOption({ value: -1, key: 'keyPress' })
      return
    }
    setActiveOption({ value: activeOption.value - 1, key: 'keyPress' })
  }

  const keyPressHandler = useCallback(() => {
    if (!keyPress || !suggestions) return
    props.active(true) //open suggestion box

    switch (keyPress['key']) {
      case 'ArrowUp': {
        arrowUp()
        break
      }
      case 'ArrowDown': {
        arrowDown()
        break
      }
      case 'Enter': {
        enterKeyPress()
        break
      }
    }
  }, [keyPress])

  useEffect(() => {
    keyPressHandler()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressHandler])

  //make api call with throttle
  useEffect(() => {
    if (props.searchText === '' || props.searchText === undefined) {
      setSuggestion(undefined)
      return
    }

    const timer = setTimeout(() => {
      if (props.searchText) {
        getData(props.searchText.replace('#', ''))
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [props.searchText, getData])

  //on mouse click of active item, need to let parent know to clear modal, etc
  const suggestionOnClick = () => {
    //reset suggestions counteres etc
    firebase.analytics().logEvent('search_suggestionsubmit_' + getType() + '_clicked')
    // setRecentSearch(encodeURIComponent(getTitle().trim(), parseUserId()))
    // props.onUpdate(false) //close modal

    props.updateSearch(getTitle())
    setSuggestion(undefined)
  }

  const getTitle = () => {
    const title =
      suggestions[activeOption.value].className === 'Hashtag'
        ? '#' + suggestions[activeOption.value].title
        : suggestions[activeOption.value].title
    return title
  }

  const getType = () => {
    return suggestions[activeOption.value].className
  }

  //render suggestions
  const displaySuggestions = () => {
    if (suggestions)
      return suggestions.map((suggestion, index) => {
        const title = suggestion.className === 'Hashtag' ? '#' + suggestion.title : suggestion.title

        //for hashtags and usersearchterm, link to search page - otherwise, its a design and send to design page
        //change to switch later
        const url =
          suggestion.className === 'Hashtag' || suggestion.className === 'userSearch'
            ? '/search/?q=' + encodeURIComponent(title)
            : '/design/' + suggestion.objectId + '?q=' + encodeURIComponent(title)

        if (activeOption.value === index && activeOption.key !== 'mouse') {
          GetSearchBar().value = title
        }
        return (
          <li
            onMouseLeave={e => setActiveOption({ value: -1, key: 'mouse' })}
            onMouseOver={e => setActiveOption({ value: index, key: 'mouse' })}
            key={suggestion + index}
            tabIndex={1}
            role={'option'}
            className={`${index === activeOption.value ? styles.active : null}`}
            aria-selected={index === activeOption.value ? true : false}
          >
            <Link
              role={'link'}
              to={url}
              onClick={() => {
                suggestionOnClick()
              }}
            >
              {suggestion.previewImageUrl && (
                <>
                  <img
                    src={suggestion.previewImageUrl}
                    className={styles.hashTagPreviewImg}
                    alt={'hashtag-preview-img'}
                    onError={e => (e.target.src = '/logo192.png')}
                  />
                  <span className={styles.hashtagBubble}>#</span>
                </>
              )}
              {!suggestion.previewImageUrl && suggestion.className !== 'userSearch' && (
                <Magnify
                  className={`${styles.mi} ${styles.hashTagMagnify}`}
                  width="10"
                  height="10"
                  fill="#40000"
                />
              )}

              <span className={styles.hashTagText}>{title.trim()}</span>
            </Link>
          </li>
        )
      })
  }

  return (
    <>
      <ul
        role={'listbox'}
        id={'DecorSearchSuggestion'}
        className={`${styles.autocompleteUl} ${
          suggestions && suggestions.length > 0 ? styles.show : null
        }`}
      >
        {showSuggestion && (
            <div className={styles.suggestionHeaders}>Suggestions in DecorMatters</div>
          ) &&
          displaySuggestions()}
      </ul>
      {showRecommendation && (
        <SearchRecommendation
          keyPress={props.keyPress}
          show={!suggestions && !props.searchText}
          onUpdate={props.onUpdate} //close modal
          callback={props.callback}
          searchText={props.searchText}
          updateSearch={props.updateSearch}
        />
      )}
    </>
  )
}

const SearchRecommendation = props => {
  const [ogSearchText, setOgSearchText] = useState(props.searchText)
  const [recommendations, setRecommendation] = useState()
  const [activeOption, setActiveOption] = useState({ value: -1, key: false })
  const history = useHistory()
  const dispatch = useDispatch()
  const { popularHashTags } = useSelector(state => state.popularHashTags)
  const [recentSearches, setRecentSearches] = useState([])

  // set active state to beginning since text changed or is now hidden
  useEffect(() => {
    if (props.show || props.searchText) {
      setActiveOption({ value: -1, key: false })
    }
  }, [props.searchText, props.show])

  //get hash tags if not loaded
  useEffect(() => {
    if (popularHashTags && popularHashTags.hashtags && popularHashTags.hashtags.length > 0) return
    dispatch(getPopularHashtags())
  }, [dispatch, popularHashTags])

  //hashtags returned - set to state and reset active option
  useEffect(() => {
    const recentSearches = getRecentSearchResults(parseUserId())
    setRecentSearches(recentSearches)

    const newArray = recentSearches
      ? recentSearches.concat(popularHashTags.hashtags)
      : popularHashTags.hashtags

    setRecommendation(newArray)
    setActiveOption({ value: -1, key: false })
  }, [popularHashTags, setActiveOption])

  //click handlers for arrow keys and enter key
  const keyPressHandler = useCallback(() => {
    if (!props.keyPress || !props.show) return

    switch (props.keyPress['key']) {
      case 'Escape': {
        setActiveOption({ value: -1, key: 'false' })
        return
      }
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'Tab': {
        firebase.analytics().logEvent('nav_search_recommendation_' + props.keyPress['key'])
        if (!recommendations) return
        if (activeOption.value < 0) {
          setActiveOption({ value: recommendations.length - 1, key: 'keypress' })
          return
        }
        if (activeOption.value <= 0) {
          GetSearchBar().value = ogSearchText
          setActiveOption({ value: -1, key: 'keypress' })
          return
        }
        setActiveOption({ value: activeOption.value - 1, key: 'keypress' })
        break
      }

      case 'ArrowDown':
      case 'ArrowRight': {
        firebase.analytics().logEvent('search_recommendation_' + props.keyPress['key'])
        if (recommendations && activeOption.value >= recommendations.length - 1) {
          GetSearchBar().value = ogSearchText
          setActiveOption({ value: -1, key: 'keypress' })
          return
        } else if (!recommendations) {
        }

        setActiveOption({ value: activeOption.value + 1, key: 'keypress' })
        break
      }

      case 'Enter': {
        if (activeOption.value > -1 && recommendations) {
          let title = recommendations[activeOption.value].title
          title = recommendations[activeOption.value].type !== 'recentSearch' ? '#' + title : title
          const url = '/search/?q=' + encodeURIComponent(title)

          firebase
            .analytics()
            .logEvent(
              'search_' + recommendations[activeOption.value].type + '_submitenterkey_clicked'
            )
          props.updateSearch(title)
          //setRecentSearch(encodeURIComponent(title), parseUserId())
          history.push(url)
          //props.onUpdate(false) //close modal
        } else {
          // props.callback('Enter') //submit input value since nothing chosen
        }
        break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.keyPress])

  //callback functionf for keyhandler
  useEffect(() => {
    keyPressHandler()
    return () => {}
  }, [keyPressHandler])

  return (
    <ul
      role={'listbox'}
      id={'DecorSearchSuggestionRecommendation'}
      className={`${styles.recommendationAutocompleteUl}  ${props.show ? styles.show : null}`}
    >
      {!!+process.env.REACT_APP_ENABLE_RECENT_SEARCHES && (
        <RecentSearchesUL
          setRecentSearches={setRecentSearches}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
          recentSearches={recentSearches}
          onUpdate={props.onUpdate}
          setRecommendation={setRecommendation}
          updateSearch={props.updateSearch}
        />
      )}
      <SuggestionsUL
        hashtagType={'adminPick'}
        recommendations={recommendations}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        onUpdate={props.onUpdate}
        setRecommendation={setRecommendation}
        showLoading={true}
        updateSearch={props.updateSearch}
      />
      <SuggestionsUL
        hashtagType={'popular'}
        recommendations={recommendations}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        onUpdate={props.onUpdate}
        setRecommendation={setRecommendation}
        showLoading={false}
        updateSearch={props.updateSearch}
      />
    </ul>
  )
}

const SuggestionsUL = props => {
  const {
    recommendations,
    activeOption,
    setActiveOption,
    onUpdate,
    setRecommendation,
    hashtagType
  } = props

  const validTypesLookup = {
    popular: 'Trending On DecorMatters',
    adminPick: 'Recommended By DecorMatters'
  }

  const getLength = () => {
    const filterHashTags = recommendations.filter(recommendation => {
      if (recommendation === undefined) return false
      return recommendation.hashtagType === hashtagType
    })

    return filterHashTags.length === 0
  }

  if (recommendations === undefined || (recommendations && getLength()))
    return (
      <ul className={styles.suggestionsUl}>
        {props.showLoading && (
          <div className={styles.hashTagLoadingContainer}>
            <LoadingIndicator2 loading={recommendations} />
          </div>
        )}
      </ul>
    )

  return (
    <ul className={styles.suggestionsUl}>
      <div className={styles.suggestionHeaders}>{validTypesLookup[hashtagType]}</div>

      {recommendations &&
        recommendations.map((recommendation, index) => {
          if (
            recommendation === undefined ||
            !recommendation.hasOwnProperty('title') ||
            recommendation.type === 'recentSearch' ||
            recommendation.hashtagType !== hashtagType
          )
            return false
          //preppend # to show hashtag on UI since dataset doesnt include
          if (activeOption.value === index && activeOption.key !== 'mouse') {
            GetSearchBar().value = '#' + recommendation.title
          }

          return (
            <li
              onMouseLeave={e => {
                setActiveOption({ value: -1, key: 'mouse' })
              }}
              onMouseOver={e => setActiveOption({ value: index, key: 'mouse' })}
              key={'suggestion_' + index}
              tabIndex={index}
              role={'option'}
              className={`${index === activeOption.value ? styles.active : null}`}
              aria-selected={index === activeOption.value ? true : false}
            >
              <Link
                title={'#' + recommendation.title}
                role={'link'}
                to={'/search/?q=' + encodeURIComponent('#' + recommendation.title)}
                onClick={() => {
                  //setRecentSearch(encodeURIComponent('#' + recommendation.title), parseUserId())
                  props.updateSearch('#' + recommendation.title)
                  //props.onUpdate(false) //close modal
                  setRecommendation([])
                }}
              >
                <p className={styles.title}>#{recommendation.title}</p>
                <img
                  className={styles.hashTagRecommendationImg}
                  src={recommendation.previewImageUrl}
                  alt={'recommendation-preview-img'}
                  onError={e =>
                    (e.target.src =
                      'didr9pubr8qfh.cloudfront.net/cfbaf6beae03cf4a47996d2ee39e9abd_Idea-Thumb.jpg')
                  }
                />
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
const RecentSearchesUL = props => {
  const recentSearches = props.recentSearches
  return (
    <ul className={styles.recentSearchUl}>
      {recentSearches && recentSearches.length > 0 && (
        <div className={styles.suggestionHeaders}>
          Recent Searches:
          <button
            className={styles.closeRecentSearches}
            onClick={() => {
              props.setRecentSearches([])
              deleteRecentSearches(parseUserId())
            }}
          >
            X
          </button>
        </div>
      )}
      {recentSearches &&
        recentSearches.map((recentSearch, index) => {
          const title = decodeURIComponent(recentSearch.title)
          if (props.activeOption.value === index && props.activeOption.key !== 'mouse') {
            GetSearchBar().value = decodeURIComponent(title)
          }
          return (
            <li
              onMouseLeave={e => props.setActiveOption({ value: -1, key: 'mouse' })}
              onMouseOver={e => props.setActiveOption({ value: index, key: 'mouse' })}
              key={'suggestion_' + index}
              tabIndex={1}
              role={'option'}
              className={`${index === props.activeOption.value ? styles.active : null} ${
                styles.recentSearchLi
              }`}
              aria-selected={index === props.activeOption.value ? true : false}
            >
              <Link
                className={styles.recentSearchLink}
                role={'link'}
                to={'/search/?q=' + encodeURIComponent(title)}
                title={title}
                onClick={() => {
                  firebase.analytics().logEvent('search_recentsearches_clicked')
                  //setRecentSearch(encodeURIComponent(title), parseUserId())
                  //props.onUpdate(false) //close modal
                  props.updateSearch(title)
                  props.setRecommendation([])
                }}
              >
                <p className={styles.title}>{title}</p>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
