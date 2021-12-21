import React, { useEffect } from 'react'
import styles from './collection.module.css'

const CollectionContainer = props => {
  return (
    <>
      <div className={styles.collectionContainer}>
        <div className={styles.inspiration}>
          <div className={styles.header}>
            <h1>Collections</h1>
            <h3>Explore the beautiful interior product through our collections.</h3>
          </div>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
          <CollectionItem></CollectionItem>
        </div>
      </div>
    </>
  )
}

export default CollectionContainer

export const CollectionItem = () => {
  return (
    <div className={styles.individualCollection}>
      <div>
        <a href={'#'} target="_blank" rel="noopener noreferrer">
          <img
            alt={''}
            src={
              'https://didr9pubr8qfh.cloudfront.net/826f4ebbf0660ea2e73cc39834148883_UserIns-Feed-Blog.jpg'
            }
          />
        </a>
      </div>
      <div>
        <a href={'#'} target="_blank" rel="noopener noreferrer">
          <img
            alt={''}
            src={
              'https://didr9pubr8qfh.cloudfront.net/a765a85692117fd79f01eee3edf46341_Idea-Thumb.jpg'
            }
          />
        </a>
      </div>
      <div>
        <a href={'#'} target="_blank" rel="noopener noreferrer">
          <img
            alt={''}
            src={
              'https://didr9pubr8qfh.cloudfront.net/fce1ff63af22af7027c60cd3558d0139_Idea-Thumb.jpg'
            }
          />
        </a>
      </div>
      <div className={styles.desc}>
        <h3>Chair</h3>
        <ul>
          <li>
            <button>#Contemporary</button>
          </li>
          <li>
            <button>#Contemporary</button>
          </li>
          <li>
            <button>#Contemporary</button>
          </li>
          <li>
            <button>#Contemporary</button>
          </li>
          <li>
            <button>#Contemporary</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
