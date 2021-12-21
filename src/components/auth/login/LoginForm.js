import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
//import AWS from 'aws-sdk'
import * as Yup from 'yup'
import { FormInputGroup, SubmitButton } from '../../common/FormControls'
//import { DisplayFormikState } from '../../FormikHelper.js'
import { EMAIL_EMPTY, PASSWORD_EMPTY, SERVER_ERROR } from '../../../constants/FormTranscript'
import { loginParse as loginAction } from '../../../redux/actions/AuthActions'
//import { API_URL, CHECK_USER } from '../../dmconfig'
//import { FBButton } from '../common/FormControls'
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { awsHeaders } from '../../../util/fetchUtil'
import { useHistory } from 'react-router-dom'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(EMAIL_EMPTY),
  password: Yup.string().required(PASSWORD_EMPTY)
})

const checkMigration = (email, password) => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: awsHeaders(),
    body: JSON.stringify({
      username: email,
      password: password
    })
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.REACT_APP_AUTH_URL, params)
      const responseJson = await response.json()
      if (responseJson.code === 900) {
        return resolve()
      } else {
        return reject(responseJson.message)
      }
    } catch (error) {
      return reject('server')
    }
  })
}

const LoginForm = props => {
  const { handleForget, handleReturn } = props
  const [passUserTest, setPassUserTest] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue, resetForm }) => {
          const loginPhase = () => {
            dispatch(loginAction({ ...values, history }, handleReturn))
              .then()
              .catch(error => {
                setSubmitting(false)
                if (error.code === 101) {
                  setFieldError('email', error.error)
                  setFieldValue('password', '', false)
                } else {
                  setFieldError('email', SERVER_ERROR)
                }
              })
          }
          if (passUserTest === false) {
            checkMigration(values.email, values.password)
              .then(() => {
                setPassUserTest(true)
                loginPhase()
              })
              .catch(error => {
                setSubmitting(false)

                if (error === 'server') {
                  setFieldError('email', SERVER_ERROR)
                } else {
                  setFieldError('email', error)
                }
              })
          } else {
            loginPhase()
          }
        }}
        validationSchema={loginSchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <FormInputGroup
                name="email"
                type="email"
                label="Email Address"
                disabled={isSubmitting}
              />
              <div className="py-3">
                <button type="button" className="alsm forgot" onClick={handleForget}>
                  Forgot your password?
                </button>
                <FormInputGroup
                  name="password"
                  type="password"
                  label="Password"
                  disabled={isSubmitting}
                  maxLength="18"
                  showhide="1"
                />
              </div>
              <SubmitButton type="submit" disabled={isSubmitting} name={'login'}>
                Log in
              </SubmitButton>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm
