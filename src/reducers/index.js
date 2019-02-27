import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'
// import counter from './counter'
import host from './host'
import player from './player'


// export default combineReducers({
//   routing: routerReducer,
//   // counter,
//   player,
//   host
// }) 

export default (history) => combineReducers({
  router: connectRouter(history),
   
  // counter,
  player,
  host
})

// configureStore.js