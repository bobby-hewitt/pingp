import React, { Component } from 'react'
import './style.scss'

export default class RoomFull extends Component {
	render(){
		return(
			<div className="roomNotFound">
				<h3>Oh no!</h3>
				<p>Couldn't find the game.</p>
			</div>
		)
	}	
}