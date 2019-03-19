import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'
import host from './PingP/host'
import gameplay from './PingP/gameplay'
import player from './PingP/player'

//general 
import generalHost from './general/host'
import generalPlayer from './general/player'


export default (history) => combineReducers({
  router: connectRouter(history),
  player,
  gameplay,
  host,
  generalHost,
  generalPlayer
})
