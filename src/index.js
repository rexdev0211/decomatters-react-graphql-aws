import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Amplify from 'aws-amplify'
import awsconfig from './aws-config'

import './index.css'
import App from './App'
import rootReducer from './redux/reducers'

import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './ApolloClient'

import firebase from 'firebase/app'
import 'firebase/analytics'

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

Amplify.configure(awsconfig)

const firebaseConfig = {
  apiKey: 'AIzaSyAWjs2qhklwTISHZs8B7bfEhvgshxtb9jM',
  authDomain: 'decormatters-1500584906551.firebaseapp.com',
  databaseURL: 'https://decormatters-1500584906551.firebaseio.com',
  projectId: 'decormatters-1500584906551',
  storageBucket: 'decormatters-1500584906551.appspot.com',
  messagingSenderId: '960415879026',
  appId: '1:960415879026:web:bc13940e944f804e1c17eb',
  measurementId: 'G-S8E0ZPK2Z4'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
