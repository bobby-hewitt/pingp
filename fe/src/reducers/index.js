import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import host from './PingP/host'
import gameplay from './PingP/gameplay'
import player from './PingP/player'
//quiz
import quizPlayer from './Quiz/player'
import quizHost from './Quiz/host'
//general 
import generalHost from './general/host'
import generalPlayer from './general/player'


export default (history) => combineReducers({
  router: connectRouter(history),
  //pingp
  player,
  gameplay,
  host,
  //quiz
  quizHost,
  quizPlayer,
  //general
  generalHost,
  generalPlayer
})
