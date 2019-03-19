import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InfoBar from 'components/MobileInfoBar'
import './style.scss'

class MobileHome extends Component {
	render(){
		const { roomCode, name, playerNumber } = this.props
		return(
			<div className="mobileHomeContainer">
				<InfoBar player={roomCode} name={name} playerNumber={playerNumber}/>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	roomCode: state.generalPlayer.room,
	name: state.generalPlayer.name,
	playerNumber: state.generalPlayer.playerNumber,
	router: state.router
})

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHome)