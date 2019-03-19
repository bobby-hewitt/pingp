import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import data from './data'
import localSetup from 'config/local'
import Item from './Item'
import InfoBar from './InfoBar'

import SocketListener from 'containers/SocketListener'
import './style.scss'

class Home extends Component {

	componentDidMount(){
		setInterval(() => {
			console.log(this.props.roomCode)
		},500)
	}

	render(){
		const { roomCode } = this.props
		let uri = false;
		if (this.props.roomCode){
			uri = localSetup.isLocal ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://' + localSetup.localServer + ':3000/m/' + this.props.roomCode.toLowerCase() :
			'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' +  encodeURIComponent( localSetup.domain + '/m/' + this.props.roomCode.toLowerCase()) 
		} 
		return(
			<div className="homeContainer">
				<SocketListener isHost />
				<InfoBar 
					roomCode={roomCode}
				/>
				<img className="globalQRCode" src={uri} />
			</div>
		)
	}
}



const mapStateToProps = state => ({
	roomCode: state.host.roomCode,
	players: state.host.players,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)