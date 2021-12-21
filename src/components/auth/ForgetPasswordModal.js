import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ModalContainer } from '../common/ModalContainers'
import { FormLargeInput, SubmitButton } from '../common/FormControls'
import { forgotPassword } from '../../redux/actions/AuthActions'
import styles from './au.module.css'
import { Formik } from 'formik'
import { EMAIL_EMPTY, SERVER_ERROR } from '../../constants/FormTranscript'
import * as Yup from 'yup'

const verifySchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(EMAIL_EMPTY)
})

const ForgetPasswordModal = props => {
  const { onClose } = props
  const [isSent, setIsSent] = useState(false)
  const [sendTo, setSendTo] = useState()
  const dispatch = useDispatch()
  //const { user } = useSelector(state => state.auth)
  const wrapperRef = useRef(null)

  if (isSent === true) {
    return (
      <ModalContainer onClose={onClose} wrapperRef={wrapperRef}>
        <h2 className={`${styles.con}`}>
          Reset Email has been sent to <span className={`${styles.dmcr} dmcr`}>{sendTo}</span>
        </h2>
        <Formik>
          {props => {
            const { isSubmitting } = props

            return (
              <form onSubmit={onClose}>
                <div className={styles.btng}>
                  <div className={`${styles.btngi} pl-2`}>
                    <SubmitButton type="submit" disabled={isSubmitting} name="submit">
                      Got it
                    </SubmitButton>
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>
      </ModalContainer>
    )
  }

  return (
    <ModalContainer onClose={onClose} wrapperRef={wrapperRef}>
      <h1 className={`${styles.con} ${styles.pdb}`}>Forgot Your Password?</h1>
      <h3 className={`${styles.con}`}>
        Don't worry, just fill in your email and we will send you a link to reset your password.
      </h3>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          try {
            //console.log(values.email)
            dispatch(forgotPassword(values.email))
              .then(() => {
                setSendTo(values.email)
                setIsSent(true)
              })
              .catch(error => {
                setSubmitting(false)
                setFieldError('email', "Can't find " + values.email + '. Go sign up!')
              })
          } catch (error) {
            setSubmitting(false)
            setFieldError('email', SERVER_ERROR)
          }
        }}
        validationSchema={verifySchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.btng}>
                <div className={`${styles.btngi}`}>
                  <FormLargeInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    disabled={isSubmitting}
                    id={'reset'}
                    label={'Email Address'}
                  />
                </div>
              </div>

              <div className={styles.btng}>
                <div className={`${styles.btngi} pl-2`}>
                  <SubmitButton type="submit" disabled={isSubmitting} name={'Submit'}>
                    Send
                  </SubmitButton>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </ModalContainer>
  )
}

export default ForgetPasswordModal
