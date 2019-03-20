import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localSetup from 'config/local'
import './style.scss'

class HostHome extends Component {
	render(){
		let QRuri = false;
		let link = 'http://false';
		if (this.props.roomCode){
			QRuri = localSetup.isLocal ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://' + localSetup.localServer + ':3000/join/' + this.props.roomCode.toLowerCase() :
			'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' +  encodeURIComponent( localSetup.domain + '/join/' + this.props.roomCode.toLowerCase()) 
			link = 'http://' + localSetup.localServer + ':3000/join/' + this.props.roomCode.toLowerCase()
		} 
		return(
			<div className="hostHomeContainer">
			{this.props.roomCode &&
				<a href={link} target="blank">
					<div className="qr">
						<img src={QRuri} className="globalQRCode" alt="QR code"/>
						<p className="hostHomeInstructions">Scan the QR code or visit<br/>{localSetup.domain}/join</p>
					</div>
				</a>
			}
				<div className="players">
					{this.props.players.map((player, i) => {
						return(
							<div key={i} className={player ? "hostPlayerContainer active" : 'hostPlayerContainer'}>
								<div className="playerIconHome" />{player.name || 'PLAYER ' + (i + 1)}
							</div>
						)
					})}
				</div>
				

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
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostHome)