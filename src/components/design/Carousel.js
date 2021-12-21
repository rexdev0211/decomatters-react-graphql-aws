// upcoming implementation follows this medium article of @ilonacodes
// https://medium.com/@ilonacodes/simple-image-carousel-with-react-5e20933001bf
// only main difference of this implementation: uses React hooks

import React, { useState } from 'react'
import styles from './carousel.module.css'
import { ReactComponent as Arrow } from '../../assets/arrow-right.svg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IndividualItem } from '../feeds/InspirationFeed'
import normalizeFeedData from '../../util/normalizedata'

const Carousel = props => {
  // const dispatch = useDispatch()
  const feed = useSelector(state => state.inspirationFeed)

  let showImagesCount = 2
  if (window.innerWidth > 600) {
    showImagesCount = 4
  }
  // const [images, setImages] = useState([
  //   'https://didr9pubr8qfh.cloudfront.net/7b8a76d88295e49c9bc57a985e0f623a_idea.jpg',
  //   'https://didr9pubr8qfh.cloudfront.net/8c92f5f51b9c24b0d520509f074c4259_Idea-Thumb.jpg',
  //   'https://didr9pubr8qfh.cloudfront.net/0216124f8819b92f07dfe0754314f104_Idea-Thumb.jpg',
  //   'https://didr9pubr8qfh.cloudfront.net/a765a85692117fd79f01eee3edf46341_Idea-Thumb.jpg',
  //   'https://didr9pubr8qfh.cloudfront.net/0216124f8819b92f07dfe0754314f104_Idea-Thumb.jpg'
  // ])
  let images = []
  feed.data.map(item => images.push(item))

  const [currentImageIdx, setCurrentImagIdx] = useState(0)

  const prevSlide = () => {
    // find out whether currentImageIdx eqals 0 and thus user reached beginning of carousel
    const resetToVeryBack = currentImageIdx === 0

    const index = resetToVeryBack ? images.length - 1 : currentImageIdx - 1

    // assign the logical index to current image index that will be used in render method
    setCurrentImagIdx(index)
  }

  const nextSlide = () => {
    // check if we need to start over from the first index
    const resetIndex = currentImageIdx === images.length - 1

    const index = resetIndex ? 0 : currentImageIdx + 1

    // assign the logical index to current image index that will be used in render method
    setCurrentImagIdx(index)
  }

  // create a new array with 5 elements from the source images
  const activeImageSourcesFromState = images.slice(
    currentImageIdx,
    currentImageIdx + showImagesCount
  )

  // check the length of the new array (it’s less than 5 when index is at the end of the imagge sources array)
  const imageSourcesToDisplay =
    activeImageSourcesFromState.length < showImagesCount
      ? // if the imageSourcesToDisplay's length is lower than 5 images than append missing images from the beginning of the original array
        [
          ...activeImageSourcesFromState,
          ...images.slice(0, showImagesCount - activeImageSourcesFromState.length)
        ]
      : activeImageSourcesFromState

  return (
    <div className={styles.related}>
      <h2>Related Design</h2>
      {/* render images */}
      <div className={styles.content}>
        <ul>
          {normalizeFeedData(imageSourcesToDisplay).map((itemObj, index) => {
            return (
              <li key={index} className={styles.relatedDesignLi}>
                <div className={styles.carouselNormal}>
                  {' '}
                  {/* Show when webapp*/}
                  <IndividualItem
                    {...itemObj}
                    page={'relatedDesign'}
                    likesObj={props.likesObj}
                  ></IndividualItem>
                </div>

                <div className={styles.carouselSmall}>
                  {/* Show when mobile*/}
                  <Link to={`${itemObj.objectId}`}>
                    <img key={index} src={itemObj.url} alt={itemObj.title} />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <Arrow className={styles.prevSlide} onClick={prevSlide} />
      <Arrow className={styles.nextSlide} onClick={nextSlide} />
    </div>
  )
}

export default Carousel
