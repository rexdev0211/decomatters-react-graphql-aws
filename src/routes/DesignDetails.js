import React, { useEffect } from 'react'
import Details from '../components/design/Details'
import { getSavedUserInspiration } from '../redux/actions/SaveInspirationAction'
import { useDispatch, useSelector } from 'react-redux'
import { count } from '../redux/reducers/DMReducer'

const DesignDetails = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(count())
  }, [])

  useEffect(() => {
    dispatch(getSavedUserInspiration())
  }, [dispatch, auth])

  return (
    <>
      {/*<DefaultHeader />*/}
      <Details {...props}></Details>
    </>
  )
}

export default DesignDetails
