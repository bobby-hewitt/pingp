import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localSetup from 'config/local'
import SocketListener from 'containers/SocketListener'
import { joinRoom } from 'sockets/player'
import { setSelf } from 'actions/general/player'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import { Route } from 'react-router'
import MobileJoin from 'containers/General/MobileJoin'
import MobileHome from 'containers/General/MobileHome'

import './style.scss'

class MobileConnection extends Component {




	render(){ 
		return(
			<div className="mobileConnectionContainer">
				<SocketListener />
				<Route exact path="/join/" component={MobileJoin} />
				<Route exact path="/join/:code" component={MobileJoin} />
				<Route exact path="/m/home" component={MobileHome} />
			</div>
		)
	}
}



const mapStateToProps = state => ({
	roomCode: state.host.roomCode,
	players: state.host.players,
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