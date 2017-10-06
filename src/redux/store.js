// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const routerHistory = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(routerHistory)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)
