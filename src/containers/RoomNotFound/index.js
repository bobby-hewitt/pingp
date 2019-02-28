import React, { Component } from 'react'
import './style.scss'

export default class RoomFull extends Component {
	render(){
		return(
			<div className="roomNotFound">
				<h3>The game is over!</h3>
				<p>Scan the QR code to start again</p>
			</div>
		)
	}	
}