import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import HomeReducer from './components/HomeReducer'

const reducer = combineReducers({
  home: HomeReducer,
  routing: routerReducer
})

export default reducer
