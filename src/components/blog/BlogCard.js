import React, { useEffect } from 'react'
import styles from './bl.module.css'
//import { ReactComponent as Share } from '../../assets/share-blog-icon.svg'
import { useHistory } from 'react-router-dom'
import ShareBtn from '../social/ShareBtn'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const BlogCard = props => {
  const { data } = props
  const history = useHistory()
  const prettyTitle = data.contentTitle
    .replace(/[^\w^\s]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
  const blogUrl = `blog/post/${prettyTitle}`

  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const handleBlog = () => {
    firebase.analytics().logEvent('blog_post_clicked')

    history.push('/' + blogUrl, {
      modal: false,
      page: 'BlogPost',
      fromSite: true
    })
  }

  const truncate = paragraph => {
    const limit = 40

    let trimmed = paragraph.split(' ').slice(0, limit)
    trimmed = trimmed.join(' ') + '...'

    return trimmed
  }

  return (
    <div className={styles.bc}>
      <div className={styles.bcc} onClick={handleBlog}>
        <div className={styles.bic}>
          <img src={data.contentThumbnailImg} className={styles.bti} alt={data.contentTitle} />
        </div>
        <div className={styles.bdc}>
          <span className={styles.pt}>{data.contentPublishDate}</span>
          <h2 className={styles.bt}>{data.contentTitle}</h2>
          <p className={styles.bp}>{truncate(data.firstParagraph)}</p>
        </div>
      </div>
      <div>
        <ShareBtn type={'blog'} imgUrl={data.contentThumbnailImg} customUrl={blogUrl} />
      </div>
    </div>
  )
}

export default BlogCard
/*

*/
