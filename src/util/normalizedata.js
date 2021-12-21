/* Normalize feed data to reuse in inspiration and details page */
const normalizeFeedData = data => {
  let itemObj = []
  if (data.length < 1) return itemObj

  data.forEach((item, index) => {
    itemObj.push({
      key: item.objectId + index,
      url: item.idea
        ? item.idea.thumbImageFile.url
        : item.feedImageFile
        ? item.feedImageFile.url
        : null,
      id: item.objectId,
      user: item.user,
      likes: item.numLikes,
      gifts: item.numGifts,
      type: item.type,
      index: index,
      title: item.title ? item.title : 'Decormatters'
    })
  })

  return itemObj
}

export default normalizeFeedData

export const noImageFeed = e => {
  if (e.target) {
    //const num = Math.floor(Math.random() * 9) + 1
    const num = 5
    e.target.src =
      'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile' + num + '.png'
    return true
  }
  return false
}

export const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
