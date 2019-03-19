import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'
import host from './PingP/host'
import gameplay from './PingP/gameplay'
import player from './PingP/player'


export default (history) => combineReducers({
  router: connectRouter(history),
  player,
  gameplay,
  host
})
