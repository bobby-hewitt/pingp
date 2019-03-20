import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localSetup from 'config/local'
import InfoBar from 'components/HostInfoBar'
import SocketListener from 'containers/SocketListener'
import { Route } from 'react-router'
import HostHome from 'containers/General/HostHome'
import PingP from 'containers/PingP/Home'
import Quiz from 'containers/Quiz/Host'
import openSocket from 'socket.io-client'
import './style.scss'
const socket = localSetup.isLocal ? openSocket(localSetup.localServer+ ':9000') : openSocket(localSetup.publicServer)


class Home extends Component {

	render(){
		const { roomCode, players } = this.props	
		return(
			<div className="hostConnectionContainer">
				<SocketListener isHost socket={socket}/>
				<InfoBar 
					players={players}
					roomCode={roomCode}
				/>
				<Route exact path="/h" render={() => <HostHome socket={socket} />} />
				<Route exact path="/h/pingp" render={() => <PingP socket={socket} />} />
				<Route exact path="/h/quiz" render={() => <Quiz socket={socket} />} />
			</div>
		)
	}
}



const mapStateToProps = state => ({
	roomCode: state.host.roomCode,
	players: state.generalHost.players,
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)