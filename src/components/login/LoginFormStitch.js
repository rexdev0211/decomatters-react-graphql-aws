import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldInput, SubmitButton } from '../common/FormControls'
//import { DisplayFormikState } from '../../FormikHelper.js'
import {
  EMAIL_EMPTY,
  EMAIL_INVALID,
  PASSWORD_EMPTY,
  SERVER_ERROR
} from '../../constants/FormTranscript'
import { login as loginAction } from '../../redux/stitch/actions/AuthActions'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(EMAIL_EMPTY),
  password: Yup.string().required(PASSWORD_EMPTY)
})

const LoginForm = props => {
  const { onClose } = props
  const dispatch = useDispatch()

  return (
    <div>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          try {
            dispatch(loginAction(values))
              .then(() => {
                setSubmitting(false)
                onClose()
              })
              .catch(error => {
                setSubmitting(false)
                setFieldError('email', EMAIL_INVALID)
                setFieldValue('password', '', false)
                //values.password.focus()
              })
          } catch (err) {
            setSubmitting(false)
            setFieldError('email', SERVER_ERROR)
          }
        }}
        validationSchema={loginSchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <FieldInput name="email" type="email" placeholder="Email" />
              <FieldInput name="password" type="password" placeholder="Password" />
              <SubmitButton title="Log in" disabled={isSubmitting} />
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm
