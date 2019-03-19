import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localSetup from 'config/local'
import InfoBar from 'components/HostInfoBar'
import SocketListener from 'containers/SocketListener'
import { Route } from 'react-router'
import HostHome from 'containers/General/HostHome'

import './style.scss'

class Home extends Component {

	componentDidMount(){
		console.log(this.props)
	}

	render(){
		const { roomCode, players } = this.props
		
		return(
			<div className="hostConnectionContainer">
				<SocketListener isHost />
				<InfoBar 
					players={players}
					roomCode={roomCode}
				/>
				<Route exact path="/h" component={HostHome} />
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