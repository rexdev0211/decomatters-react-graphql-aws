import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FieldInput, SubmitButton } from '../common/FormControls'
import { PASSWORD_EMPTY } from '../../constants/FormTranscript'
import styles from './lo.module.css'
import { setNewPassword as newPasswordAction } from '../../redux/actions/AuthActions'

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .required(PASSWORD_EMPTY)
    .min(6),
  confirmpassword: Yup.string().required(PASSWORD_EMPTY)
})

const NewPasswordForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <Formik
        initialValues={{ password: '', confirmpassword: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          dispatch(newPasswordAction(user, values.password))
            .then(() => {
              setSubmitting(false)
            })
            .catch(error => {
              setSubmitting(false)
              //console.log(error)
              setFieldError('email', error.message)
              setFieldValue('password', '', false)
              //values.password.focus()
            })
        }}
        validationSchema={loginSchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <div className={styles.bd}>
              <form onSubmit={handleSubmit}>
                <FieldInput
                  name="password"
                  type="password"
                  placeholder="New Password"
                  disabled={isSubmitting}
                />
                <FieldInput
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  disabled={isSubmitting}
                />
                <SubmitButton title="Update" disabled={isSubmitting} />
              </form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default NewPasswordForm
