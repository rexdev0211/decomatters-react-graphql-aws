import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
//import AWS from 'aws-sdk'
import * as Yup from 'yup'
import { FieldInput, SubmitButton } from '../common/FormControls'
//import { DisplayFormikState } from '../../FormikHelper.js'
import { EMAIL_EMPTY, PASSWORD_EMPTY, SERVER_ERROR } from '../../constants/FormTranscript'
import { login as loginAction } from '../../redux/actions/AuthActions'
//import { API_URL, CHECK_USER } from '../../dmconfig'
//import { FBButton } from '../common/FormControls'
import styles from './lo.module.css'
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { awsHeaders } from '../../util/fetchUtil'

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
  const { onClose } = props
  const [passUserTest, setPassUserTest] = useState(false)
  const dispatch = useDispatch()

  /*
  const responseFacebook = response => {
    //console.log(response);
    // Check if the user logged in successfully.

    if (response.authResponse) {
      console.log('You are now logged in.')

      // Add the Facebook access token to the Cognito credentials login map.
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'awsmobile.aws_cognito_identity_pool_id',
        Logins: {
          'graph.facebook.com': response.authResponse.accessToken
        }
      })

      // Obtain AWS credentials
      AWS.config.credentials.get(function() {
        // Access AWS resources here.
        console.log('DO SOEMTHING WITH AWS')
      })
    } else {
      console.log('There was a problem logging you in.')
    }
  }
*/
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          const loginPhase = () => {
            dispatch(loginAction(values))
              .then(() => {
                setSubmitting(false)
                onClose()
              })
              .catch(error => {
                setSubmitting(false)
                setFieldError('email', error.message)
                setFieldValue('password', '', false)
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
            <div className={styles.bd}>
              <form onSubmit={handleSubmit}>
                <FieldInput name="email" type="email" placeholder="Email" disabled={isSubmitting} />
                <FieldInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  disabled={isSubmitting}
                />
                <SubmitButton title="Log in" disabled={isSubmitting} />
              </form>
              <div className={styles.acc}>
                I'm ready,&nbsp;
                <Link className={styles.sc} to="/signup">
                  Sign me up!
                </Link>
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm
/*
<div className={styles.inb}>
    <FacebookLogin
                  appId="702307183638090"
                  callback={responseFacebook}
                  render={renderProps => (
                    <>
                      <FBButton onClick={renderProps.onClick} />
                    </>
                  )}
                />            
              </div>
<div className={styles.orw}>
                <div className={styles.orb}>
                  <div className={styles.orbl} />
                </div>
                <div className={styles.or}>OR</div>
                <div className={styles.orb}>
                  <div className={styles.orbl} />
                </div>
              </div>
                */
