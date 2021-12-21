// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
// import { setContext } from 'apollo-link-context'
// import { validateUser as validateUserAction } from './redux/actions/AuthActions'
//
// const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI })
//
// const authLink = setContext(async (_, { headers }) => {
//   const token = await validateUserAction()
//   console.log(`[ApolloClient] Executing with token: ${token}`)
//   return {
//     headers: {
//       ...headers,
//       'X-Api-Key': process.env.REACT_APP_GRAPHQL_API_KEY,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// })
//
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })
//
// export default client
