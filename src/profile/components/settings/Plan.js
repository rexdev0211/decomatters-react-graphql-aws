import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Layout from './Layout'
import { DMPrimaryButton } from '@decormatters/dm-theme'
import { setShowPurchaseCoins } from '../../../redux/reducers/DMReducer'

const PlanInfoContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  font-weight: bold;
  font-size: 18px;
  margin-bottom: 30px;
`

const PlanStatusContainer = styled.div``

const PlanMessageContainer = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #777777;
  margin-bottom: 10px;
`

const ActionContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-top: 40px;
`

const Plan = () => {
  const dispatch = useDispatch()
  const [since, setSince] = useState(null)
  const [renewal, setRenewal] = useState(null)

  const { me } = useSelector(state => state.profile)

  useEffect(() => {
    if (!me) return
    if (!me.membership) return
    if (!me.membership.subscriber) return
    if (!me.membership.subscriber.subscriptions) return
    if (Object.keys(me.membership.subscriber.subscriptions).length === 0) return

    const sub = Object.values(me.membership.subscriber.subscriptions)[0]
    const ori = Date.parse(sub.original_purchase_date)
    var od = new Date(ori)
    const oye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(od)
    const omo = new Intl.DateTimeFormat('en', { month: 'short' }).format(od)
    const oda = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(od)

    setSince(`${omo} ${oda}, ${oye}`)

    const exp = Date.parse(sub.expires_date)
    var ed = new Date(exp)
    const eye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(ed)
    const emo = new Intl.DateTimeFormat('en', { month: 'short' }).format(ed)
    const eda = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(ed)

    setRenewal(`${emo} ${eda}, ${eye}`)
  }, [me])

  const formatPrice = raw => {
    return (raw * 0.01).toFixed(2)
  }

  const handleShowPurchase = e => {
    dispatch(setShowPurchaseCoins(true))
  }

  if (!me) return <></>
  if (!me.membership) return <></>

  return (
    <Layout title="Current Plan">
      {!me.haveMembership && (
        <PlanInfoContainer>
          <div>Starter</div>
          <div>Free</div>
        </PlanInfoContainer>
      )}
      {me.haveMembership && me.membership.price && (
        <PlanInfoContainer>
          <div>{me.membership.name}</div>
          <div>
            ${formatPrice(me.membership.price.unit_amount)}/{me.membership.price.recurring.interval}
          </div>
        </PlanInfoContainer>
      )}
      {!me.haveMembership && (
        <PlanStatusContainer>
          You are under free plan. Upgrade to get{' '}
          <b>unlimited usage of catalog items and exclusive design tool.</b>
        </PlanStatusContainer>
      )}
      {me.haveMembership && (
        <PlanStatusContainer>
          {since && (
            <>
              <PlanMessageContainer>Member Since</PlanMessageContainer>
              <div style={{ marginBottom: ' 20px' }}>
                <b>{since}</b>
              </div>
            </>
          )}
          {renewal && (
            <>
              <PlanMessageContainer>Subscription renewal date</PlanMessageContainer>
              <div>
                <b>{renewal}</b>
              </div>
            </>
          )}
        </PlanStatusContainer>
      )}
      <ActionContainer>
        {!me.haveMembership && (
          <DMPrimaryButton onClick={handleShowPurchase}>Upgrade</DMPrimaryButton>
        )}
        {me.haveMembership && (
          <DMPrimaryButton onClick={handleShowPurchase}>Change Membership Plan</DMPrimaryButton>
        )}
      </ActionContainer>
    </Layout>
  )
}

export default Plan
