import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client';
import {subscribeToPlayerEvents} from '../../sockets/player'
import {subscribeToHostEvents} from '../../sockets/host'
import { setRoomCode, addPlayer, startRoundHost, setResponses, setCoords1, setCoords2 } from '../../actions/host'
import { setPlayerRoom, setSelf, setPlayerNumber, powerUpGained, powerUpUsed } from '../../actions/player'
import { startGame, setGameOver, powerUpUsedGameplay } from '../../actions/gameplay'


class SocketListener extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    // console.log('socket listener mounting')
    if (this.props.isHost){
      subscribeToHostEvents(this, (action, data) => {
        this.props[action](data)
      })
    } else {
     subscribeToPlayerEvents(this, (action, data) => {
        this.props[action](data)
     })
   }
  }

  render(){
    return(
      <div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  // count: state.counter.count
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setRoomCode,
  powerUpUsedGameplay,
  powerUpGained,
  powerUpUsed,
  startGame,
  setGameOver,
  setPlayerNumber,
  setResponses,
  setCoords1,
  setCoords2,
  setSelf,
  startRoundHost,
  addPlayer,
  setPlayerRoom,
  push: (path) => push('/' + path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)