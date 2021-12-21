import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import HelpCenterHeader from '../components/helpcenter/Header'
import BlogFooter from '../components/blog/Footer'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import styles from '../components/helpcenter/helpcenter.module.css'
import contentStyles from '../components/helpcenter/helpcenter_content.module.css'
import { HelpCenterList, HelpCenterMarkupContent } from '../components/helpcenter/HelpCenterList'
import { ReactComponent as BackBtn } from '../assets/BackNavBtn.svg'
import backBtnStyle from '../components/navs/backbutton.module.css'
import { ContactUs } from '../components/helpcenter/ContactUs'
import IntersectionObserver from 'intersection-observer-polyfill'
import smoothscroll from 'smoothscroll-polyfill'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import searchStyle from '../components/helpcenter/helpcentersearch.module.css'
import MainHeader from '../components/headers/MainHeader'
import { isHelpCenterLink } from '../util/checkHelpcenter'

// kick off the polyfill!
smoothscroll.polyfill()
const disableScrollSelect = false
// const HelpCenterContext = React.createContext('')

const checkScreenSize = () => {
  let windowWidth =
    window.screen.width < window.outerWidth ? window.screen.width : window.outerWidth
  return windowWidth > 1024
}

const scrollToSection = (id, type) => {
  if (!document.getElementById(id)) return
  const offset = type === 'mobile' ? 500 : 150
  // console.log(document.getElementById(id).offsetTop)
  window.scrollTo({
    top: document.getElementById(id).offsetTop - offset,
    behavior: 'smooth'
  })
}

const getHelpCenterLookup = () => {
  let urlLookup = []
  HelpCenterList.forEach(list => {
    if (list.active === 1) {
      if (list.tabs === true) {
        list.subNav.forEach(item => {
          item.subNav.forEach(subItem => {
            let newItem = subItem
            newItem.path = '/' + list.id + '/' + item.id + '/' + subItem.id
            urlLookup[subItem.id] = newItem
          })
        })
      } else {
        list.subNav.forEach(item => {
          let newItem = item
          newItem.path = '/' + list.id + '/' + item.id
          urlLookup[item.id] = newItem
        })
      }
    }
  })
  return urlLookup
}
const searchItems = searchWord => {
  const keys = Object.keys(HelpCenterMarkupContent)
  const findings = []
  for (const key of keys) {
    let text = HelpCenterMarkupContent[key]
    if (text.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0) findings.push(key)
  }
  const urlLookup = getHelpCenterLookup()
  let returnSearchResults = []
  findings.forEach(key => {
    if (key in urlLookup) {
      let foundItem = urlLookup[key]
      foundItem['body'] = HelpCenterMarkupContent[key]
      returnSearchResults.push(urlLookup[key])
    }
  })

  return returnSearchResults
}

/* HELP Center FAQ Router */
const HelpCenter = props => {
  return (
    <>
      {isHelpCenterLink() ? (
        <></>
      ) : (
        <div className={styles.mainSlimHeader}>
          <MainHeader slim={true} />
        </div>
      )}
      <Switch>
        <Route path={`/help-center/search/:searchWord`} component={HelpCenterMain} />
        <Route path={`/help-center/:cat/:id/:subNavId`} component={HelpCenterContent} />
        <Route path={`/help-center/:cat/:id`} component={HelpCenterContent} />
        <Route path={`/help-center/:cat`} component={HelpCenterMain} />
        <Route exact path="/help-center" component={HelpCenterMain} />
      </Switch>
    </>
  )
}

export default HelpCenter

/* Main Container for FAQ/Help Center listing */
const HelpCenterMain = props => {
  const HelpCenter = HelpCenterList
  const [searchTerm, setSearchTerm] = useState()
  const history = useHistory()

  let timer = undefined

  useEffect(() => {
    setSearchTerm(props.match.params['searchWord'])
    document.getElementById('helpcenter-search').value = props.match.params['searchWord']
      ? props.match.params['searchWord']
      : ''
  }, [props.match.params])

  useEffect(() => {
    document.documentElement.scrollTop = 0
  })

  //search faq debounce
  const submitSearch = searchTerm => {
    if (props.match.params['searchWord']) history.push('/help-center')

    if (timer !== undefined) {
      clearTimeout(timer)
    }
    // setCurrentSearchWord(searchTerm)
    timer = setTimeout(() => {
      firebase.analytics().logEvent('faq_search', {
        content_type: 'faq_search',
        content: searchTerm
      })
      setSearchTerm(searchTerm)
    }, 750)
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{ position: 'relative' }}>
        <HelpCenterHeader title={'Help Center'} padding={true} />
        <div className={searchStyle.flexbox}>
          <div className={searchStyle.search} style={{ position: 'absolute' }}>
            <div>
              <input
                id={'helpcenter-search'}
                type="text"
                name="help-center-search"
                placeholder="Search by keywords"
                onChange={data => submitSearch(data.currentTarget.value)}
                onSubmit={data => console.log('submit')}
                className={searchStyle.inputSearchFAQ}
                autoComplete={'off'}
                required
              />
            </div>
          </div>
        </div>
      </div>
      {!searchTerm && (
        <div className={styles.helpCenterContainer}>
          {HelpCenter.map((HelpCenter, index) =>
            HelpCenter.active === 1 ? (
              <HelpCenterItem key={index} HelpCenterObj={HelpCenter} />
            ) : null
          )}
        </div>
      )}

      {searchTerm && (
        <div>
          <HelpCenterSearchResult searchTerm={searchTerm} />
        </div>
      )}

      <div className={styles.helpCenterFooter} style={{ clear: 'both' }}>
        <BlogFooter />
      </div>
    </div>
  )
}

/* Individual items for main listing page */
const HelpCenterItem = props => {
  const { HelpCenterObj } = props

  const clickTracking = id => {
    const tag = 'faq_main_topic_' + id + '_clicked'
    firebase.analytics().logEvent(tag)
  }

  return (
    <div className={styles.item}>
      <h2>{HelpCenterObj.title}</h2>
      <ul>
        {HelpCenterObj.subNav.map((subnav, index) => {
          if (HelpCenterObj.show < index + 1) return null
          return (
            <li key={subnav.id + index}>
              <Link
                onClick={() => clickTracking(subnav.id)}
                to={{
                  pathname: '/help-center/' + HelpCenterObj.id + '/' + subnav.id,
                  fromSite: true
                }}
              >
                {subnav.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className={styles.seeMore}>
        <Link
          to={{
            pathname: '/help-center/' + HelpCenterObj.id + '/' + HelpCenterObj.subNav[0].id,
            fromSite: true
          }}
        >
          See more
        </Link>
      </div>
    </div>
  )
}

/* Secondary Content Page with/without tabs */
const HelpCenterContent = props => {
  const { cat, id, subNavId } = props.match.params

  const filteredList = HelpCenterList.filter(HelpCenter => HelpCenter.id === cat)[0]
  const [activeSection, setActiveSectionId] = useState()
  const [isClickActiveSection, setIsClickActiveSection] = useState(true)

  const setActiveSection = (id, type) => {
    if (id === null) return
    setActiveSectionId(id)
    //Tell world if click happened, or just a scroll action
    //this is for auto selection/highlight of side menu
    if (type === 'click') {
      setIsClickActiveSection(true)
    }
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])

  const getSubNavFilteredList = () => {
    const subNavList = filteredList.subNav.filter(filtered => filtered.id === id)
    return subNavList
  }
  const getSubNavList = () => {
    if (filteredList.tabs !== true) return filteredList.subNav
    const subNavList = getSubNavFilteredList()
    return subNavList[0].subNav
  }

  //scroll to section
  useEffect(() => {
    if (!filteredList) return
    let topicId = subNavId ? subNavId : id
    let scroll = true

    if (filteredList.tabs === true && subNavId === undefined) {
      const subNavList = getSubNavFilteredList()
      topicId = subNavList[0].subNav[0].id

      scroll = subNavList[0].subNav[0].scroll === false ? false : true
    }

    setActiveSection(topicId)
    if (scroll !== false) scrollToSection(topicId)
  }, [filteredList, id])

  /* When scrolling - state is no longer a click. This is to highlight side menu on scroll */
  const listener = () => {
    if (isClickActiveSection) setIsClickActiveSection(false)
  }
  useEffect(() => {
    window.addEventListener('wheel', listener)
    window.addEventListener('mousewheel', listener)
    window.addEventListener('DOMMouseScroll', listener)

    return () => {
      window.addEventListener('wheel', listener)
      window.addEventListener('mousewheel', listener)
      window.addEventListener('DOMMouseScroll', listener)
    }
  })

  if (!filteredList) return <Redirect to="/help-center" />
  return (
    <>
      <HelpCenterHeader
        title={filteredList && filteredList.title ? filteredList.title : 'Section does not exist'}
      />
      {filteredList && filteredList.tabs === true && (
        <>
          <div className={contentStyles.helpCenterTabContainer}>
            {filteredList.subNav.map((filtered, index) => (
              <HelpCenterTabLayout
                key={'tabs_' + filtered.id + '_' + index}
                filteredList={filtered}
                {...props}
              />
            ))}
          </div>
          <div className={contentStyles.underline} />
        </>
      )}
      <div className={contentStyles.helpCenterContentContainer}>
        <div className={contentStyles.helpCenterLeft}>
          <HelpCenterSideMenu
            subNavList={getSubNavList()}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isSubNav={filteredList.tabs === true}
            {...props}
          />
        </div>
        <div className={contentStyles.helpCenterRight} id={'HelpCenterRight'}>
          <HelpCenterContentContainer
            subNavList={getSubNavList()}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isClickActiveSection={isClickActiveSection}
            setIsClickActiveSection={setIsClickActiveSection}
            {...props}
          />
          <ContactUs title={filteredList.title} />
        </div>
      </div>
      <div className={styles.helpCenterFooter}>
        <BlogFooter />
      </div>
    </>
  )
}

/* Tabs if layout has it */
const HelpCenterTabLayout = props => {
  const { filteredList, index } = props
  const { cat, id } = props.match.params

  if (filteredList.active === 0) return null
  return (
    <div
      key={filteredList.id + index}
      className={`${filteredList.id === id ? contentStyles.selected : null} ${contentStyles.item}`}
    >
      <Link
        to={{
          pathname: '/help-center/' + cat + '/' + filteredList.id,
          fromSite: true
        }}
      >
        <p>{filteredList.title}</p>
      </Link>
    </div>
  )
}

/* Side Menu on secondary page */
const HelpCenterSideMenu = props => {
  const { subNavList, activeSection, setActiveSection, isSubNav } = props

  // useEffect(() => {
  //   if (checkScreenSize()) return
  //   scrollToSection(activeSection)
  // }, [activeSection])

  const onClickListElement = id => {
    const tag = 'faq_sidenav_' + id + '_clicked'
    firebase.analytics().logEvent(tag)

    scrollToSection(id)
    setActiveSection(id, 'click')
  }

  return (
    <>
      <ul className={contentStyles.sideMenu}>
        <div className={contentStyles.backBtnContainer}>
          <Link to={'/help-center'}>
            <BackBtn className={`${backBtnStyle.backBtn} ${backBtnStyle.active} `} />
          </Link>
        </div>

        {subNavList.map(list => {
          const id = list.id

          //subnav url has /cat/id/subnavid
          const url = isSubNav
            ? '/help-center/' +
              props.match.params['cat'] +
              '/' +
              props.match.params['id'] +
              '/' +
              id
            : '/help-center/' + props.match.params['cat'] + '/' + id

          return (
            <li
              key={id + '_side'}
              onClick={() => onClickListElement(id)}
              className={`${activeSection === id ? contentStyles.selected : null} ${
                contentStyles.sideMenuItems
              }`}
            >
              <Link to={url}>{list.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

/* Content container - right side of secondary page item */
const HelpCenterContentContainer = props => {
  const { subNavList } = props
  return (
    <>
      {subNavList.map((list, index) => {
        if (list.active === 1 && HelpCenterMarkupContent[list.id])
          return <HeaderItemContent key={'headeritemcontent' + index} {...props} list={list} />
        return (
          <HeaderItemContent
            key={'headeritemcontent' + index}
            {...props}
            default={true}
            list={list}
          />
        )
      })}
    </>
  )
}

/* Content specific item Content - right side of secondary page item */
const HeaderItemContent = props => {
  const { activeSection, setActiveSection, list, isClickActiveSection } = props
  const observer = useRef()
  // console.log(list)
  const headerObserver = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (disableScrollSelect === true) return
          if (isClickActiveSection) return
          if (entries[0].isIntersecting && checkScreenSize()) {
            if (!isClickActiveSection) {
              setActiveSection(entries[0].target.id)
            }
          }
        },
        {
          root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
          threshold: 0.75
        },
        []
      )
      if (node) observer.current.observe(node)
    },
    [isClickActiveSection]
  )

  const headerClicked = id => {
    if (id === activeSection) {
      setActiveSection(null)
      return
    }
    const tag = 'faq_mobile_header_' + id + '_clicked'
    firebase.analytics().logEvent(tag)
    setActiveSection(id, 'click')
    scrollToSection(id, 'mobile')
  }
  const id = list.id
  if (!HelpCenterMarkupContent[id] && props.default !== true) return null

  return (
    <div
      id={id}
      ref={headerObserver}
      key={id + '_content'}
      className={`${activeSection === id ? contentStyles.active : null}`}
      onClick={e => headerClicked(id)}
    >
      <h1 className={contentStyles.header}>
        <span className={contentStyles.arrow} />
        <span className={contentStyles.headerTitle}>{list.title}</span>
      </h1>
      <div
        className={`${activeSection === id ? contentStyles.active : null} ${
          contentStyles.contentParagraph
        }`}
        dangerouslySetInnerHTML={{
          __html: !props.default ? HelpCenterMarkupContent[id] : HelpCenterMarkupContent['default']
        }}
      />
    </div>
  )
}

const HelpCenterSearchResult = props => {
  const searchWord = props.searchTerm
    ? props.searchTerm
    : props.match.params['searchWord']
    ? props.match.params['searchWord']
    : ''
  const searchResult = searchItems(searchWord)
  const [activeSection, setActiveSection] = useState()
  const history = useHistory()

  if (searchWord === '') return <></>
  const headerClicked = id => {
    const searchFound = searchResult.filter(search => search.id === id)
    firebase.analytics().logEvent('faq_search_header_click_' + searchFound[0].path)
    history.push('/help-center' + searchFound[0].path)
  }

  const replaceArray = function(replaceString, find, replace) {
    for (let i = 0; i < find.length; i++) {
      replaceString = replaceString
        .replace(find[i], replace[i])
        .replace(find[i].charAt(0).toUpperCase() + find[i].slice(1), replace[i])
    }
    return replaceString
  }

  const searchWordHighlight = searchWord => {
    // return ' ' + searchWord + ' '
    return (
      ' <b style="background-color:#ff5e6d;color:white;font-size:20px;padding:0px 2px"> ' +
      searchWord +
      '</b> '
    )
  }
  return (
    <div style={{ height: '100%' }}>
      {/*<HelpCenterHeader title={'Search Result For: ' + searchWord} />*/}
      <div className={searchStyle.searchContainer}>
        {searchResult.length === 0 && (
          <div style={{ padding: '50px', margin: '0 auto', textAlign: 'center' }}>
            No Results Found. Please try again!
          </div>
        )}
        {searchResult.length > 0 &&
          searchResult.map((list, index) => {
            const id = list.id
            return (
              <div
                id={id}
                key={id + '_content'}
                className={`${activeSection === id ? contentStyles.active : null}`}
                onClick={e => headerClicked(id)}
                style={{ clear: 'both' }}
              >
                <h1 className={contentStyles.header}>
                  <span className={contentStyles.arrow} style={{ display: 'block' }} />
                  <span className={contentStyles.headerTitle}>{list.title}</span>
                </h1>
                <div
                  className={`${activeSection === id ? contentStyles.active : null} ${
                    contentStyles.contentParagraph
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: !props.default
                      ? replaceArray(
                          HelpCenterMarkupContent[id],
                          [
                            ' ' + searchWord + ' ',
                            '' + searchWord + ' ',
                            ' ' + searchWord + '.',
                            searchWord + ' '
                            // searchWord
                            // searchWord
                          ],
                          [
                            searchWordHighlight(searchWord),
                            searchWordHighlight(searchWord),
                            searchWordHighlight(searchWord),
                            searchWordHighlight(searchWord),
                            searchWordHighlight(searchWord)
                          ]
                        )
                      : HelpCenterMarkupContent['default']
                  }}
                />
              </div>
            )
          })}
        <ContactUs title={'Search Results'} />
      </div>
    </div>
  )
}
