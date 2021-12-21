import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldInput, SubmitButton } from '../common/FormControls'
//import { DisplayFormikState } from '../../FormikHelper.js'
import { EMAIL_EMPTY, PASSWORD_EMPTY, SERVER_ERROR } from '../../constants/FormTranscript'
import { register as registerAction } from '../../redux/actions/AuthActions'

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(EMAIL_EMPTY),
  password: Yup.string()
    .min(6)
    .required(PASSWORD_EMPTY)
})

const RegisterForm = props => {
  const { onClose } = props
  const dispatch = useDispatch()

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          try {
            dispatch(registerAction(values))
              .then(() => {
                setSubmitting(false)
                onClose()
              })
              .catch(error => {
                setSubmitting(false)
                setFieldError('email', error.message)
                setFieldValue('password', '', false)
                //values.password.focus()
              })
          } catch (error) {
            setSubmitting(false)
            setFieldError('email', SERVER_ERROR)
          }
        }}
        validationSchema={registerSchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <FieldInput name="email" type="email" placeholder="Email" />
              <FieldInput name="password" type="password" placeholder="Password" />
              <SubmitButton title="Sign Up" disabled={isSubmitting} />
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterForm
