import React, { useEffect } from 'react'
import styles from './details.module.css'
import { Main } from './Main'
import { Products } from './Products'
import { getDetailsById } from '../../redux/actions/DesignDetailsAction'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowList } from '../../redux/actions/FollowingActions'
import { GetAllSavedProducts } from '../../redux/actions/SaveProductAction'
import { useHistory } from 'react-router-dom'
import { getFeedByCatId } from '../../redux/actions/InspirationFeedAction'
import HelmetDesignDetails from '../helmet/HelmetDesignDetails'
import PureCarousel from './PureCarousel'
import { LoadingIndicator2 } from '../feeds/LoadingIndicator'
import { PriceTagClear } from '../../redux/actions/PriceTagActions'
import { batch } from 'react-redux'

const Details = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = props.id ? props.id : props.match.params.id

  //dispatch(contentIsLoading())

  useEffect(() => {
    batch(() => {
      dispatch(getDetailsById(id))
      dispatch(PriceTagClear())

      //went directly to this page, so need to grab data/like data
      if (history.action === 'POP') {
        dispatch(getFeedByCatId(''))
      }

      dispatch(GetAllSavedProducts())
      dispatch(getFollowList())
    })
  }, [])

  return (
    <>
      <DetailsContainer {...props} />
    </>
  )
}

const DetailsContainer = props => {
  const id = props.id ? props.id : props.match.params.id
  const { data: mainData, loading, likes: active, numLikes } = useSelector(
    state => state.designdetails
  )

  const { allSavedProducts } = useSelector(state => state.saveProduct) // all saved products with objectids

  useEffect(() => {
    /*
    console.log(mainData)
    if(mainData.idea && mainData.idea.productsWithPosition) {
      const m = mainData.idea.productsWithPosition
      console.log(m)
      m.forEach(e => {
        if(e.item && e.item.type === "item") {
          
          if(e.item.productRecommendation.length > 0) console.log(e.item.productRecommendation.length)
        }
      });
    }
    */
  }, [mainData])

  return (
    <>
      <LoadingIndicator2 loading={loading} />

      {!loading && (
        <div className={`${styles.detailContainer} ${styles.noModal}`}>
          <HelmetDesignDetails data={mainData} />
          <Main id={id} active={active} data={mainData} numLikes={numLikes} />

          <Products id={id} data={mainData} allSavedProducts={allSavedProducts} />

          <PureCarousel data={mainData} />
        </div>
      )}
    </>
  )
}

export default Details
