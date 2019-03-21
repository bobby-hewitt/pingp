import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localSetup from 'config/local'
import SocketListener from 'containers/SocketListener'

import { setSelf } from 'actions/general/player'
import { Route } from 'react-router'
import MobileJoin from 'containers/General/MobileJoin'
import MobileHome from 'containers/General/MobileHome'
import MobileQuiz from 'containers/Quiz/Mobile'
import './style.scss'
import PingP from 'containers/PingP/Mobile'

import openSocket from 'socket.io-client'

const socket = localSetup.isLocal ? openSocket(localSetup.localServer+ ':9000') : openSocket(localSetup.publicServer)



class MobileConnection extends Component {




	render(){ 
		return(
			<div className="mobileConnectionContainer">
				<SocketListener socket={socket}/>		
				<div className="mobileAppContainer">
					<Route exact path="/join/" render={() => <MobileJoin socket={socket}/>} />
					<Route exact path="/join/:code" render={() => <MobileJoin socket={socket}/>} />
					<Route exact path="/m/home" render={() => <MobileHome socket={socket}/>} />
					<Route exact path="/m/pingp" render={() => <PingP socket={socket}/>} />
					<Route exact path="/m/quiz" render={() => <MobileQuiz socket={socket}/>} />
				</div>
			</div>
		)
	}
}



const mapStateToProps = state => ({
	room: state.generalPlayer ? state.generalPlayer.room : '',
	name: state.generalPlayer ? state.generalPlayer.name: '',
	playerNumber: state.generalPlayer ? state.generalPlayer.playerNumber : '',
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setSelf
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileConnection)