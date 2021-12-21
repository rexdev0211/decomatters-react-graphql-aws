import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ModalContainer } from '../common/ModalContainers'
import {
  FormLargeInput,
  FormCodeInput,
  FormInputGroup,
  AuthInputGroup,
  SubmitButton
} from '../common/FormControls'
import { Formik } from 'formik'
import * as Yup from 'yup'

const FormTest = props => {
  return (
    <ModalContainer>
      <Formik
        initialValues={{ nickname: '', email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          console.log('HI')
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {/*<FormLargeInput name="email" type="email" placeholder="Email" disabled={props.isSubmitting}/>*/}
            {/*<FormCodeInput name="code" type="text" placeholder="Enter Code" />*/}
            {/*
            <FormInputGroup name="nickname" type="text" label="Username" />
            <FormInputGroup name="email" type="email" label="Email" />
            <FormInputGroup name="password" type="password" label="Password" autoComplete="new-password" />
            */}
            {/*<FormLargeInput name="nickname" type="text" placeholder="Username" disabled={props.isSubmitting}/>*/}
            <input type="text" value="prayer" style={{ display: 'none' }} />
            <input type="email" value="prayer" style={{ display: 'none' }} />
            <input type="password" value="prayer" style={{ display: 'none' }} />
            <FormLargeInput
              name="email"
              type="email"
              placeholder="Email"
              disabled={props.isSubmitting}
            />
            <FormLargeInput
              name="password"
              type="password"
              placeholder="Password"
              disabled={props.isSubmitting}
              autoComplete="new-password"
            />
            <SubmitButton type="submit" disabled={props.isSubmitting}>
              Submit
            </SubmitButton>
          </form>
        )}
      </Formik>
    </ModalContainer>
  )
}

export default FormTest
