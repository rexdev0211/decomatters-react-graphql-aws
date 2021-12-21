import React, { useState } from 'react'
import styles from './fc.module.css'
import { ReactComponent as FB } from '../../assets/facebook.svg'
import { ReactComponent as Google } from '../../assets/social/google.svg'
import { useField } from 'formik'

export const FieldInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={styles.c}>
      <label htmlFor={props.id || props.name}></label>
      <input
        className={meta.error && meta.touched ? styles.dmife : styles.dmif}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className={styles.e}>{meta.error}</div> : null}
    </div>
  )
}

export const FormInputGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const [show, setShow] = useState(false)

  return (
    <>
      <div>
        <label htmlFor={styles.name} className={styles.ttl}>
          {label}
        </label>
        <input
          className={` ${meta.touched && meta.error ? styles.dmife : styles.dmif}`}
          {...field}
          {...props}
          type={!show && props.type === 'password' ? 'password' : 'text'}
        />
        {props.type === 'password' && props.showhide === '1' && (
          <i className={styles.showHide} onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'}
          </i>
        )}
      </div>
      {meta.touched && meta.error ? <div className={styles.e}>{meta.error}</div> : null}
    </>
  )
}

export const FormLargeInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={` ${meta.touched && meta.error ? styles.dmife : styles.dmif} ${styles.dmca}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className={styles.e}>{meta.error}</div> : null}
    </>
  )
}

export const FormCodeInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <input
        maxLength="6"
        className={` ${meta.touched && meta.error ? styles.dmife : styles.dmif} ${styles.dmcd}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className={styles.e}>{meta.error}</div> : null}
    </>
  )
}

export const AuthInputGroup = ({ disabled, ...props }) => {
  return (
    <div>
      <div className={styles.ttl}>{props.title}</div>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={` ${props.errors[props.id] ? styles.dmife : styles.dmif}`}
        disabled={disabled}
      />
      {props.errors[props.id] && props.touched[props.id] && (
        <div className={styles.e}>{props.errors[props.id]}</div>
      )}
    </div>
  )
}

export const AuthCodeInput = ({ disabled, ...props }) => {
  return (
    <div>
      <input
        type="text"
        id={props.id}
        name={props.id}
        placeholder="Enter Code"
        maxLength="6"
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={`${props.errors[props.id] ? styles.dmife : styles.dmif} ${styles.dmcd}`}
        disabled={disabled}
      />
      {props.errors[props.id] && props.touched[props.id] && (
        <div className={styles.e}>{props.errors[props.id]}</div>
      )}
    </div>
  )
}

export const AuthLargeInput = ({ disabled, ...props }) => {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={`${props.errors[props.id] ? styles.dmife : styles.dmif} ${styles.dmca}`}
        disabled={disabled}
      />
      {props.errors[props.id] && props.touched[props.id] && (
        <div className={styles.e}>{props.errors[props.id]}</div>
      )}
    </div>
  )
}

export const SubmitButton = ({ ...props }) => {
  const [field] = useField(props)
  return (
    <button className={styles.prl} {...field} {...props}>
      {props.children}
    </button>
  )
}

export const SubmitAltButton = ({ ...props }) => {
  const [field] = useField(props)
  return (
    <button className={styles.pra} {...field} {...props}>
      {props.children}
    </button>
  )
}

export const FBButton = ({ onClick }) => (
  <button className={styles.fb} onClick={onClick}>
    <FB className={styles.fbi} />
    Login with Facebook
  </button>
)

export const GoogleButton = ({ onClick }) => (
  <button className={styles.google} onClick={onClick}>
    <Google className={styles.fbi} />
    Login with Google
  </button>
)
export const PrimaryButton = ({ ...props }) => (
  <button className={styles.pr} {...props}>
    {props.children}
  </button>
)

export const PrimaryLongButton = ({ ...props }) => (
  <button className={`${styles.pr} ${styles.fw}`} {...props}>
    {props.children}
  </button>
)

export const PrimaryAltButton = ({ ...props }) => (
  <button className={styles.pra} {...props}>
    {props.children}
  </button>
)

export const PrimaryAltLongButton = ({ ...props }) => (
  <button className={`${styles.pra} ${styles.fw}`} {...props}>
    {props.children}
  </button>
)

export const SecondaryClearButton = ({ ...props }) => (
  <button className={styles.scalt} {...props}>
    {props.children}
  </button>
)
