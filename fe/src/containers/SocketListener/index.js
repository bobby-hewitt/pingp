import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


//pingP events
import {subscribeToPlayerEvents} from 'sockets/player'
import {subscribeToHostEvents} from 'sockets/host'

//pingP actions
import { setRoomCode, startRoundHost, setResponses, setCoords1, setCoords2 } from 'actions/PingP/host'
import { setPlayerRoom, setPlayerNumber, powerUpGained, powerUpUsed } from 'actions/PingP/player'
import { setSelf } from 'actions/general/player'
import { startGame, setGameOver, powerUpUsedGameplay } from 'actions/PingP/gameplay'
import { updatePlayers } from 'actions/general/host'
import { setPlayerData } from 'actions/general/player'

class SocketListener extends Component {

  componentDidMount(){
    // console.log('socket listener mounting')
    if (this.props.isHost){
      subscribeToHostEvents(this, this.props.socket, (action, data) => {
        this.props[action](data)
      })
    } else {
     subscribeToPlayerEvents(this, this.props.socket, (action, data) => {
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
  //general functions
  setSelf,
  updatePlayers,
  setPlayerData,
  //game specific functions
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
  startRoundHost,
  setPlayerRoom,
  push: (path) => push('/' + path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)