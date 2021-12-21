import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import searchStyle from './helpcentersearch.module.css'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const HelpCenterSearchBox = props => {
  const [searchText, setSearchText] = useState('')
  const [searchBarActive, setSearchBarActive] = useState()
  const history = useHistory()
  // useEffect(() => setSearchBarActive(true))
  useEffect(() => {
    const onScroll = e => {
      window.pageYOffset > 200 ? setSearchBarActive(true) : setSearchBarActive(false)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [window.pageYOffset])

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      firebase.analytics().logEvent('search_slimnav_input_submit')
      history.push('/help-center/search/' + encodeURIComponent(searchText))
    }
  }

  const onChange = data => {
    if (data.currentTarget.value === '') {
      history.push('/help-center')
      return
    }
    setSearchText(data.currentTarget.value)
  }
  return (
    <div style={{ width: '100%', textAlign: 'right', marginRight: '10px' }}>
      <div className={searchStyle.flexbox}>
        <div className={searchStyle.search}>
          <div
            className={searchStyle.searchInputContainer}
            // style={{ marginRight: searchBarActive ? '40px' : 0 }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search Help Center Topics"
              onChange={onChange}
              className={`${searchStyle.inputSearchHelpCenter} ${
                searchBarActive ? searchStyle.active : undefined
              }`}
              autoComplete={'off'}
              onKeyDown={onKeyDown}
              aria-expanded={searchBarActive ? true : false}
              role={'search'}
              aria-controls={'searchBar'}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterSearchBox
