import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './rg.module.css'
import { useHistory, NavLink, Link } from 'react-router-dom'
import { FBButton } from '../common/FormControls'
import { ReactComponent as Logo } from '../../assets/dm-logo.svg'
import RegisterForm from './RegisterForm'

const returnPreviousPage = (history, previous) => {
  if (typeof previous !== 'undefined' && previous !== '') {
    history.push(previous)
  } else {
    history.push('/')
  }
}

const Register = props => {
  const { previous } = props
  const history = useHistory()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const onAuthenticated = () => {
    if (isAuthenticated === true) {
      returnPreviousPage(history, previous)
    }
  }
  useEffect(onAuthenticated, [isAuthenticated])

  const onClose = () => {
    returnPreviousPage(history, previous)
  }
  /*
  const location = useLocation()
  const { handleSubmit } = props
  const dispatch = useDispatch()

  const onFormSubmit = ({ username, password, preferred_username, code }) => {
    dispatch(
        registerAction(
          { username, password, preferred_username },
          props.history
        )
    )
  }
*/
  return (
    <div className={styles.rg}>
      <div className={styles.ig}>
        <NavLink to="/">
          <Logo className={styles.dml} />
        </NavLink>
        <div className={styles.igt}>Design by @geris</div>
      </div>
      <div className={styles.fa}>
        <div className={styles.hd}>
          <div>
            <div className={styles.hd}>
              <h1>Join DecorMatters</h1>
              <p>
                Get inspired, shop your favorite furnitures stores and connect with millions of
                decor lovers all in the DecorMatters community.
              </p>
            </div>
            <FBButton />
            <div className={styles.orw}>
              <div className={styles.orb}>
                <div className={styles.orbl} />
              </div>
              <div className={styles.or}>OR</div>
              <div className={styles.orb}>
                <div className={styles.orbl} />
              </div>
            </div>
            <RegisterForm onClose={onClose} />

            <div className={styles.acc}>
              Already have an account?&nbsp;
              <Link
                className={styles.sc}
                to={{
                  pathname: '/login',
                  state: { modal: '/' }
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

/*
<Formik
                initialValues={{ preferred_username: '', username: '', password: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
                  ) {
                    errors.username = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={values => {
                  handleSubmit(onFormSubmit(values))
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FieldInput type="text" name="preferred_username" placeholder="Username" autoComplete="off"/>
                    <FieldInput type="email" name="username" placeholder="Email Address" />
                    <FieldInput placeholder="Password" />
                    <div className={styles.bsu}>
                      <SubmitButton title="Sign Up" disabled={isSubmitting}/>
                    </div>
                    
                    <ErrorMessage name="preferred_username" component="div" />
                    <ErrorMessage name="username" component="div" />
                    <ErrorMessage name="password" component="div" />
                  </Form>
                )}
              </Formik>




<RegisterInput type="text" name="preferred_username" placeholder="Username"/>
                    
         <form>
              <RegisterInput placeholder="Username" />
              <RegisterInput placeholder="Email Address" />
              <RegisterInputPassword placeholder="Password" />
              <div className={styles.bsu}>
                <RegisterButton title="Sign Up"/>
              </div>
            </form>
 <Field
            name="preferred_username"
            type="text"
            placeholder="Username"
          />
          <Field
            name="username"
            type="text"
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
          />
          */
