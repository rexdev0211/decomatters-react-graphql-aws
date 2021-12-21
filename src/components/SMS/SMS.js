import React, { useState } from 'react'
import ModalCustom from './Modal'
import './sms.css'
import AdblockBubble from '../../assets/adblock/bubble.svg'
import Adblock from '../../assets/adblock/adblock.svg'
import AdblockWarning from '../../assets/adblock/warning.svg'
import PhoneInput from 'react-phone-input-2'
import styles from '../auth/au.module.css'
import { PrimaryButton } from '../common/FormControls'
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import { updateQuest } from '../../redux/actions/QuestActions'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import checkAdBlocker from '../../util/checkAdBlocker'

const loadBranchSDK = () => {
  ;(function(b, r, a, n, c, h, _, s, d, k) {
    if (!b[n] || !b[n]._q) {
      for (; s < _.length; ) c(h, _[s++])
      d = r.createElement(a)
      d.async = 1
      d.src = 'https://cdn.branch.io/branch-latest.min.js'
      k = r.getElementsByTagName(a)[0]
      k.parentNode.insertBefore(d, k)
      b[n] = h
    }
  })(
    window,
    document,
    'script',
    'branch',
    function(b, r) {
      b[r] = function() {
        b._q.push([r, arguments])
      }
    },
    { _q: [], _v: 1 },
    'addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking'.split(
      ' '
    ),
    0
  )
}

loadBranchSDK()
window.branch.init(process.env.REACT_APP_BRANCH_KEY)

const SMSModal = ({ isShowing, hide }) => {
  const defaultButtonStr = 'Send me the link!'
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [submitted, setSubmit] = useState(false)
  const [statusMsg, setStatusMsg] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [buttonText, setButtonText] = useState(defaultButtonStr)
  const [adBlock, setAdBlock] = useState(false)
  const usingBlocker = checkAdBlocker()

  if (isShowing) {
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
      window.open('https://decormatters.app.link/footer', '_blank')
      return null
    }
  }
  usingBlocker.then(response => adBlockerCallback(response))

  const adBlockerCallback = response => {
    if (response) firebase.analytics().logEvent('SMS_AD_BLOCK_ENABLED')

    setAdBlock(response)
  }

  const handlePhoneNumberChange = phone => {
    if (phone.length < 3) return
    setPhoneNumber(phone)
  }
  const linkData = {
    tags: [],
    channel: 'Website',
    feature: 'TextMeTheApp',
    data: {}
  }

  const hideModal = () => {
    setSubmit(false)
    setStatusMsg(false)
    setButtonText(defaultButtonStr)
    setCompleted(false)
    hide()
  }

  const callback = (err, result) => {
    if (err) {
      errorSMS(err, result)
    } else {
      successSMS()
    }
  }

  const successSMS = () => {
    setStatusMsg('SMS successfully sent!')
    setSubmit(false)
    setButtonText('Thank you!')
    firebase.analytics().logEvent('SMS_TEXT_SUCCESS')
    dispatch(updateQuest(2))
    setTimeout(() => {
      setCompleted(true)
    }, 2000)
  }

  const errorSMS = (err, result) => {
    firebase.analytics().logEvent('SMS_TEXT_ERROR')
    const statusMsg = getErrorMessage(err.message)

    setTimeout(() => {
      setStatusMsg(statusMsg)
      setSubmit(false)
    }, 500)
  }

  const getErrorMessage = message => {
    let statusMsg = 'Sorry, something went wrong.'

    if (message.indexOf('missing') > -1 || message.indexOf('parameter')) {
      statusMsg = 'Phone number is invalid. Please try again!'
    }

    if (message.indexOf('429') > -1) {
      statusMsg = 'You are making too many requests. Please try again later!'
    }

    return statusMsg
  }

  const sendText = e => {
    e.preventDefault()

    firebase.analytics().logEvent('SMS_SEND_TEXT_CLICK')

    if (phoneNumber.length <= 0 || phoneNumber === 0) {
      setStatusMsg('Phone number field cannot be empty. Please try again')
      return
    }
    //rate limit logic
    if (submitted === true) {
      return
    }

    setSubmit(true)

    e.preventDefault()

    // console.log(phoneNumber)
    window.branch.sendSMS(phoneNumber, linkData, {}, callback)
  }

  const getCountryCodes = () => {
    // console.log(process.env.REACT_APP_SMS_COUNTRIES)
    if (process.env.REACT_APP_SMS_COUNTRIES !== undefined) {
      return process.env.REACT_APP_SMS_COUNTRIES.split(',')
    }

    return ['us']
  }

  return (
    <ModalCustom isShowing={isShowing} hide={hideModal} completeHide={completed} hideMobile={true}>
      <div className={`${!adBlock ? 'container' : 'container adblock'}`}>
        {adBlock ? (
          <>
            <div className={'warning-container'}>
              <img className={'adblock-bubble'} src={AdblockBubble} alt={'adblockbubble'} />
              <img className={'adblock-warning'} src={AdblockWarning} alt={'adblockwarning'} />
              <h3 className={'adBlockActive'}>
                Please disable your{' '}
                <img src={Adblock} className={'adblockLogo'} alt={'adblocklogo'} /> and refresh the
                page to access this feature. Thanks!
              </h3>
            </div>
            <div className="closeBtnAdblock" onClick={() => setCompleted(true)}>
              <PrimaryButton>Got It</PrimaryButton>
            </div>
          </>
        ) : (
          <>
            <img
              className={'smsBg'}
              src={'https://dm-webapp-prod.s3.amazonaws.com/smsbg.png'}
              alt="smsbg"
            />
            <h1>Get the app from your phone</h1>
            <h3>Join our community and get inspired by other designers.</h3>
            <div className={'form-container'}>
              <form>
                <PhoneInput
                  className={'tel'}
                  country={'us'}
                  onlyCountries={getCountryCodes()}
                  placeholder={'Phone Number'}
                  onChange={handlePhoneNumberChange}
                  disableDropdown={getCountryCodes().length > 1 ? false : true}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                  }}
                />
              </form>
              <div
                className={`${styles.btngi} pl-2`}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {statusMsg && <div className={'errorMsg'}>{statusMsg}</div>}
                {!submitted && (
                  <div onClick={sendText}>
                    <PrimaryButton>{buttonText}</PrimaryButton>
                  </div>
                )}
                {submitted && <PrimaryButton>Processing....</PrimaryButton>}
              </div>
            </div>
          </>
        )}
      </div>
    </ModalCustom>
  )
}

export default SMSModal
