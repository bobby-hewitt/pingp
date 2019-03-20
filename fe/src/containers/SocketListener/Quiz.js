import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//pingP events
import {subscribeToPlayerEvents, unsubscribeToPlayerEvents} from 'sockets/Quiz/player'
import {subscribeToHostEvents, unsubscribeToHostEvents} from 'sockets/Quiz/host'

import {  showQuestionPlayer } from 'actions/quiz/player'
import {  setResponse } from 'actions/quiz/host'

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

  componentWillUnmount(){
     if (this.props.isHost){
      unsubscribeToHostEvents(this.props.socket)
    } else {
     unsubscribeToPlayerEvents(this.props.socket)
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
  setResponse,
  showQuestionPlayer,
  push: (path) => push('/' + path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)