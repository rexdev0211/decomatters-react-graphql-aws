// import { parseUserId } from './authLocalStorage'

const searchKey = 'DMsearchKey_'

export const getRecentSearchResults = userId => {
  if (userId === null) userId = 'anon'
  const searchKeyUser = getSearchKey(userId)
  let recentSearches = JSON.parse(localStorage.getItem(searchKeyUser))

  return recentSearches ? JSON.parse(localStorage.getItem(searchKeyUser)) : []
}

export const setRecentSearch = (searchTerm, userId) => {
  if (userId === null || userId === undefined) userId = 'anon'
  const searchKeyUser = getSearchKey(userId)
  let recentSearch = JSON.parse(localStorage.getItem(searchKeyUser))
    ? JSON.parse(localStorage.getItem(searchKeyUser)).reverse()
    : []

  recentSearch = recentSearch.filter(recent => recent.title !== searchTerm)

  recentSearch.push({ title: searchTerm, type: 'recentSearch' })

  if (recentSearch.length > 5) {
    recentSearch.splice(0, 1)
  }

  localStorage.setItem(searchKeyUser, JSON.stringify(recentSearch.reverse()))
}

const getSearchKey = userId => searchKey + userId

export const deleteRecentSearches = userId => {
  if (userId === null || userId === undefined) userId = 'anon'
  localStorage.removeItem(getSearchKey(userId))
}
