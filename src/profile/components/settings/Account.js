import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from './Layout'
import { InputGroup, CustomGroup } from '../FormElements'
import { DMPrimaryAltButton } from '@decormatters/dm-theme'

import { updateEmail, resetPassword } from '../../store/profileReducer'

const Account = props => {
  const dispatch = useDispatch()

  const [submitting, setSubmitting] = useState(false)
  const [edited, setEdited] = useState(false)

  const [email, setEmail] = useState('')
  const [oemail, setOEmail] = useState('')
  const [nemail, setNEmail] = useState(false)

  const [errorEmail, setErrorEmail] = useState(null)
  const [completeEmail, setCompleteEmail] = useState(null)

  const [errorPassword, setErrorPassword] = useState(null)
  const [completePassword, setCompletePassword] = useState(null)

  const { me } = useSelector(state => state.profile)

  useEffect(() => {
    if (!me) return

    if (me.email) {
      setEmail(me.email)
      setOEmail(me.email)
    } else if (me.username) {
      setEmail(me.username)
      setOEmail(me.username)
    }
  }, [me])

  useEffect(() => {
    var mod = false
    if (email !== oemail) mod = true
    setEdited(mod)
  }, [email, oemail])

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailSubmit = data => {
    if (submitting) return

    setSubmitting(true)
    setErrorEmail(null)

    const val = validateEmail()

    if (!val) {
      setErrorEmail('Incorrect email format')
      setSubmitting(false)
      return
    }

    dispatch(updateEmail(email)).then(d => {
      setSubmitting(false)
      setNEmail(true)
      const r = d.payload
      if (r.error) setErrorEmail(r.error)
      else setCompleteEmail('An email has been sent to confirm change.')
    })
  }

  const handlePasswordSubmit = data => {
    if (submitting) return

    setSubmitting(true)
    setErrorEmail(null)

    dispatch(resetPassword(oemail)).then(d => {
      setSubmitting(false)
      const r = d.payload
      if (r.error)
        setErrorPassword(
          r.error +
            '. Something wrong has happened in requesting to reset your password. Contact support at info@decormatters.com to resolve issue.'
        )
      else setCompletePassword('An email to reset your password has been sent to ' + oemail + '.')
    })
  }

  return (
    <Layout title="Account and Security" description="Update contact, login and security settings.">
      <InputGroup
        title="Email"
        value={email}
        error={errorEmail}
        complete={completeEmail}
        onChange={e => setEmail(e.target.value)}
      />
      <div>
        {!completeEmail && (
          <DMPrimaryAltButton disabled={!edited} onClick={handleEmailSubmit}>
            Update Email
          </DMPrimaryAltButton>
        )}
      </div>
      {!nemail && (
        <CustomGroup
          title="Password"
          subtitle="(Email will be sent to reset password)"
          error={errorPassword}
          complete={completePassword}
        >
          {!errorPassword && !completePassword && (
            <DMPrimaryAltButton onClick={handlePasswordSubmit}>Reset Password</DMPrimaryAltButton>
          )}
        </CustomGroup>
      )}
    </Layout>
  )
}

export default Account
