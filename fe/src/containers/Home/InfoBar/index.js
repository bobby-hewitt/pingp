import React, { Component } from 'react'
import './style.scss'

export default class InfoBar extends Component {
	render(){
		const { roomCode, players } = this.props
		return(
			<div className="infoBar">
				<p className="roomCode"><span>Room:</span> {roomCode}</p>
			</div>
		)
	}
}