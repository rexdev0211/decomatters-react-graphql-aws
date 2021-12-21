import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormInputGroup, SubmitButton } from '../../common/FormControls'
import {
  EMAIL_EMPTY,
  PASSWORD_EMPTY,
  SERVER_ERROR,
  USERNAME_EMPTY
} from '../../../constants/FormTranscript'
import { registerParse as registerAction } from '../../../redux/actions/AuthActions'
import { awsHeaders } from '../../../util/fetchUtil'

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(EMAIL_EMPTY),
  password: Yup.string()
    .min(6)
    .required(PASSWORD_EMPTY),
  nickname: Yup.string()
    .min(6)
    .required(USERNAME_EMPTY)
})

const checkUser = (email, nickname) => {
  const params = {
    method: 'POST',
    mode: 'cors',
    headers: awsHeaders(),
    body: JSON.stringify({
      username: email,
      nickname: nickname
    })
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.REACT_APP_USER_URL, params)
      const responseJson = await response.json()

      return resolve(responseJson)
    } catch (error) {
      return reject('server')
    }
  })
}

const SignupForm = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [passUserTest, setPassUserTest] = useState(true)

  return (
    <div>
      <Formik
        autoComplete="new-password"
        initialValues={{ nickname: '', email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          const registerPhase = () => {
            dispatch(registerAction({ ...values, history }))
              .then()
              .catch(error => {
                setSubmitting(false)
                if (error.code === 125) {
                  if (error.error.indexOf('email') >= 0) {
                    setFieldError('email', error.error)
                  } else {
                    setFieldError('nickname', error.error.replace('uniqueDisplayName', 'Username'))
                  }
                } else if (error.code === 202) {
                  setFieldError('email', 'Email already exist, try logging in')
                } else if (error.code === 4001) {
                  setFieldError('nickname', error.error)
                } else {
                  setFieldError('email', error.error)
                }

                setFieldValue('password', '', false)
              })
          }

          if (passUserTest === false) {
            checkUser(values.email, values.nickname)
              .then(data => {
                //setPassUserTest(true)
                //registerPhase()
                //console.log(data)
                console.log(values.nickname)
                if (data.cuser === false && data.pemail === false && data.pname === false) {
                  setPassUserTest(true)
                  registerPhase()
                } else {
                  if (data.pname === true) {
                    setFieldError('nickname', 'Username already exist. Choose another name.')
                  }
                  if (data.cuser === true || data.pemail === true) {
                    setFieldError('email', 'Email already exist. Try logging in.')
                  }
                  setSubmitting(false)
                }
              })
              .catch(() => {
                setSubmitting(false)
                setFieldError('email', SERVER_ERROR)
              })
          } else {
            registerPhase()
          }
        }}
        validationSchema={registerSchema}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props

          return (
            <form onSubmit={handleSubmit}>
              <div>
                <FormInputGroup
                  name="nickname"
                  type="text"
                  label="Username"
                  disabled={isSubmitting}
                />
              </div>
              <div className="pt-3">
                <FormInputGroup
                  name="email"
                  type="email"
                  label="Email Address"
                  disabled={isSubmitting}
                />
              </div>
              <div className="py-3">
                <FormInputGroup
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  maxLength="18"
                  showhide="1"
                />
              </div>
              <SubmitButton type="submit" disabled={isSubmitting} name={'signup'}>
                Sign Up
              </SubmitButton>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignupForm
