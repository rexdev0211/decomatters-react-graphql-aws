import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styles from './snd.module.css'
import blogStyles from '../components/blog/bl.module.css'
import { blogs } from '../components/blog/blogEntryConstants'
import ShareMedia from '../components/social/shareMedia'
import { ReactComponent as BackBtn } from '../assets/Back.svg'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import ShareBtn from '../components/social/ShareBtn'
import BlogPostIframe from './BlogPostIframe'
import BlogFooter from '../components/blog/Footer'
import HelmetBlog from '../components/helmet/HelmetBlog'

const Image = props => {
  return <img {...props} style={{ width: '100%' }} alt="" />
}

const BlogPost = props => {
  const history = useHistory()
  const { blogTitle } = props.match.params

  const [data, setBlogData] = useState({})

  const goBack = useCallback(() => {
    if (history.location.state !== undefined && history.location.state.fromSite) {
      history.goBack()
    } else {
      history.replace('/blog')
    }
  }, [history])

  useEffect(() => {
    if (blogTitle === undefined) return
    const blogData = blogs.filter(blog => {
      const title = blog.contentTitle
        .replace(/[^\w^\s]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase()
      return title === blogTitle
    })
    setBlogData(blogData[0])
  }, [blogTitle])

  const [content, setContent] = useState()

  useEffect(() => {
    if (blogTitle === undefined || data === undefined || data.contentMarkdownPath === undefined) {
      return //no data return
    }

    firebase.analytics().logEvent('blog_post_viewed')
    firebase.analytics().logEvent('page_view', {
      content_type: 'blog',
      content_id: blogTitle
    })

    if (!history.location.state) {
      firebase.analytics().logEvent('blog_post_viewed_referral')
    }

    if (data.iframe === true) return //decormatters.com blog, return
    fetch(data.contentMarkdownPath)
      .then(response => response.text())
      .then(mdText => {
        setContent(mdText)
      })
  }, [data, setContent, blogTitle])

  //no data found in app, try wix site redirect
  if (!data) {
    return (
      <BlogPostIframe
        src={'https://company.decormatters.com/post/' + blogTitle}
        goBack={goBack}
      ></BlogPostIframe>
    )
  }

  if (data.iframe === true) {
    return <BlogPostIframe src={data.contentMarkdownPath} goBack={goBack}></BlogPostIframe>
  }
  return (
    <>
      <HelmetBlog
        title={data.contentTitle}
        description={data.firstParagraph}
        imgUrl={data.contentThumbnailImg}
      />
      <div className={styles.bc}>
        <div className={styles.bbc}>
          <img src={data.bannerImg} className={styles.bbci} alt={data.contentTitle} />
        </div>
        <div className={styles.bcc}>
          <div className={styles.bsc}>
            <BackBtn className={styles.bbn} onClick={goBack} />
            <h1>{data.contentTitle}</h1>
            <div className={blogStyles.ac}>
              <div className={blogStyles.acc}>
                <img
                  className={blogStyles.bpi}
                  src={data.profilePic ? data.profilePic : '/logo192.png'}
                  alt={data.author ? data.author : 'DecorMatters'}
                />
                <div>
                  <span className={`${blogStyles.ti} ${blogStyles.an}`}>
                    {data.author ? data.author : 'DecorMatters'}
                  </span>
                  <span className={`${blogStyles.pt} ${blogStyles.an}`}>
                    {data.contentPublishDate}
                  </span>
                </div>
              </div>
              <div className={blogStyles.sm}>
                <ShareMedia
                  shareSrc={'blog'}
                  imgUrl={data.bannerImg}
                  customUrl={`blog/post/${blogTitle}`}
                />
              </div>

              <div className={blogStyles.shareMobile}>
                <ShareBtn
                  type={'blog'}
                  imgUrl={data.bannerImg}
                  customUrl={`blog/post/${blogTitle}`}
                />
              </div>
            </div>
            <ReactMarkdown source={content} renderers={{ image: Image }} escapeHtml={false} />
          </div>
        </div>
        <BlogFooter />
      </div>
    </>
  )
}

export default BlogPost
