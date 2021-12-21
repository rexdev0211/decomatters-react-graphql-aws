import React, { useContext, useEffect, useState } from 'react'
import styles from './snd.module.css'
import { blogs } from '../components/blog/blogEntryConstants'
import BlogCard from '../components/blog/BlogCard'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import { Link } from 'react-router-dom'
import { BlogCatList } from '../components/blog/blogListConstants'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import '../components/blog/pagination.css'
import BlogFooter from '../components/blog/Footer'
import BlogHeader from '../components/blog/Header' // import css
import { LoadingIndicator2 } from '../components/feeds/LoadingIndicator'
import searchStyle from '../components/blog/search.module.css'

const BlogContext = React.createContext('')

const Blog = props => {
  const defaultCatId = 'all'
  const [page, setPage] = useState(1)
  const [blogList, setBlogListState] = useState([])
  const [blogDisplay, setBlogDisplay] = useState(false)
  const [catId, setCatId] = useState(
    props.match.params.catId ? props.match.params.catId : defaultCatId
  )

  const setBlogList = blogs => {
    //always sort list before updating state
    setBlogListState(
      blogs.sort((a, b) => new Date(b.contentPublishDate) - new Date(a.contentPublishDate))
    )
    setBlogDisplay(true)
  }

  const getBlogData = () => {
    if (catId === defaultCatId || catId === undefined) {
      setBlogList(blogs.filter(blog => blog.active !== 0))
      return
    }

    //get catid based off of category
    const categoryId = BlogCatList.filter(blog => blog.url === catId)

    //if categoryId exists, filter the bloglist by catID
    if (categoryId.length > 0) {
      setBlogList(
        blogs.filter(blog => {
          if (blog.catId && blog.active !== 0) return blog.catId.includes(categoryId[0].id)
          return null
        })
      )
    }
  }

  useEffect(() => {
    setBlogDisplay(false)
    setCatId(props.match.params.catId ? props.match.params.catId : defaultCatId) //if not category-reset to all
    setPage(1) //reset pagination
  }, [props.match.params.catId, catId])

  useEffect(() => {
    setBlogDisplay(false)
    firebase.analytics().logEvent('blog_page_viewed')
    firebase.analytics().logEvent('page_view', {
      content_type: 'blog'
    })
    getBlogData()
  }, [catId])

  return (
    <>
      <BlogContext.Provider
        value={{
          blogList: blogList,
          catId: catId,
          setBlogList: setBlogList,
          getBlogData: getBlogData,
          setBlogDisplay: setBlogDisplay,
          blogDisplay: blogDisplay,
          setPage: setPage,
          page: page
        }}
      >
        <BlogHeader />
        <BlogNav data={blogList} catId={catId} />
        <LoadingIndicator2 loading={!blogDisplay} />
        <BlogCardList />
        <BlogPagination />
        <BlogFooter />
      </BlogContext.Provider>
    </>
  )
}

const BlogCardList = () => {
  const contextValue = useContext(BlogContext)
  const page = contextValue.page
  const blogList = contextValue.blogList

  return (
    <>
      <div
        className={`${styles.mc} ${styles.blog} ${
          contextValue.blogDisplay ? styles.blogShow : null
        }`}
      >
        <div className={styles.sc}>
          {blogList.slice((page - 1) * 5, page * 5).map((blog, index) => {
            //const reversedIndex = blogs.length - index - 1;
            return <BlogCard blogIndex={blog.id} key={blog.id} data={blog} />
          })}
          {blogList.length < 1 ? (
            <div style={{ textAlign: 'center', margin: '0 0 50px 0' }}> No Blogs Found</div>
          ) : null}
        </div>
      </div>
    </>
  )
}

const BlogPagination = props => {
  const contextValue = useContext(BlogContext)
  const page = contextValue.page

  const changeCurrentPage = data => {
    firebase.analytics().logEvent('blog_pagination_clicked')
    contextValue.setBlogDisplay(false)
    contextValue.setPage(data)
  }

  useEffect(() => {
    contextValue.setBlogDisplay(true)
  }, [page])

  return (
    <>
      <Pagination
        currentPage={contextValue.page}
        sizePerPage={5}
        changeCurrentPage={changeCurrentPage}
        theme={'border-bottom'}
        totalSize={contextValue.blogList.length}
        numberOfPagesNextToActivePage={7}
        showFirstLastPages={true}
      />
    </>
  )
}

const BlogNav = props => {
  const contextValue = useContext(BlogContext)
  const catId = contextValue.catId

  return (
    <div className={styles.blogListContainer}>
      <ul className={styles.blogCatList}>
        {BlogCatList.map((cat, index) => {
          return (
            <li key={cat.id} className={catId === cat.url ? styles.selected : null}>
              <Link to={'/blog/' + cat.url}>{cat.title}</Link>
            </li>
          )
        })}
        <li>
          <BlogSearch />
        </li>
      </ul>
    </div>
  )
}

const BlogSearch = () => {
  const [text, searchText] = useState('')
  const contextValue = useContext(BlogContext)

  useEffect(() => {
    contextValue.setBlogDisplay(false)
    const timer = setTimeout(() => {
      contextValue.setPage(1)
      if (text === '') {
        contextValue.getBlogData()
        return
      }

      firebase.analytics().logEvent('blog_text_filter_term', {
        content_type: text.toLowerCase()
      })

      contextValue.setBlogList(
        blogs.filter(
          blog =>
            (blog.firstParagraph.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
              blog.contentTitle.toLowerCase().indexOf(text.toLowerCase()) >= 0) &&
            blog.active !== 0
        )
      )
    }, 1000)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <BlogContext.Consumer>
      {context => (
        <div className={searchStyle.flexbox}>
          <div className={searchStyle.search}>
            <div>
              <input
                type="text"
                name="search"
                placeholder="Search Topic"
                onChange={data => searchText(data.currentTarget.value)}
                className={searchStyle.inputSearchBlog}
                autoComplete={'off'}
                required
              />
            </div>
          </div>
        </div>
      )}
    </BlogContext.Consumer>
  )
}
export default Blog
