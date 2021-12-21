import React, { useEffect, useState } from 'react'
import { ButtonNext, CarouselProvider, Slide, Slider, ButtonBack } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import styles from './carousel.module.css'
import { useDispatch, useSelector } from 'react-redux'
import normalizeFeedData from '../../util/normalizedata'
import { Link } from 'react-router-dom'
import { IndividualItem } from '../feeds/InspirationFeed'
import { ReactComponent as Arrow } from '../../assets/arrow-right.svg'
import { parseHeaders } from '../../util/fetchUtil'
import * as firebase from 'firebase'
import { requestHelper } from '../../redux/actions/InspirationFeedAction'
import { setLikes } from '../../redux/actions/LikeAction.js'

const PureCarousel = props => {
  // const feed = useSelector(state => state.inspirationFeed)
  const dispatch = useDispatch()
  const [feed, setFeed] = useState({ data: [] })
  const [showPrev, setPrev] = useState(false)
  const showBackButton = () => {
    setPrev(true)
  }

  const getFeeds = hashtags => {
    const requestBody = {
      userInsId: props.data.objectId ? props.data.objectId : ''
    }

    const appendant = requestHelper(requestBody)
    fetch(process.env.REACT_APP_GET_USER_RECOMMENDATION_INSPIRATIONS, appendant)
      .then(response => response.json())
      .then(resp => {
        const responseObj = []
        responseObj.data = resp.result.userInspirations
        setFeed(responseObj)

        dispatch(setLikes(resp.result))
      })
  }
  useEffect(() => getFeeds(), [props.data])
  //getFeeds()

  if (feed.data.length < 1) return <></>

  return (
    <div className={styles.related}>
      <h2 className={styles.relatedh2}>Related Design</h2>
      <div className={styles.carouselNormal}>
        {/* Show when mobile*/}
        <CarouselProvider
          totalSlides={feed.data.length}
          infinite={true}
          naturalSlideWidth={294}
          naturalSlideHeight={294}
          visibleSlides={4}
        >
          <Slider onClick={showBackButton}>
            {normalizeFeedData(feed.data).map((itemObj, index) => {
              return (
                <Slide
                  key={itemObj.id + 'carousel'}
                  index={index}
                  className={styles.relatedDesignLi}
                >
                  <IndividualItem
                    {...itemObj}
                    page={'relatedDesign'}
                    likesObj={props.likesObj}
                  ></IndividualItem>
                </Slide>
              )
            })}
          </Slider>
          {showPrev && (
            <ButtonBack>
              <Arrow className={styles.prevSlide} />
            </ButtonBack>
          )}
          <ButtonNext>
            <Arrow className={styles.nextSlide} onClick={showBackButton} />
          </ButtonNext>
        </CarouselProvider>
      </div>

      <div className={styles.carouselSmall}>
        {/* Show when mobile*/}
        <CarouselProvider totalSlides={feed.data.length} infinite={true} visibleSlides={2}>
          <Slider>
            {normalizeFeedData(feed.data).map((itemObj, index) => {
              return (
                <div key={itemObj.id + 'carouselSmall'} className={styles.relatedDesignLi}>
                  <Link key={itemObj.key + 'carouselsmall'} to={`${itemObj.id}`}>
                    <img key={index} src={itemObj.url} alt={itemObj.title} />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  )
}

export default PureCarousel
