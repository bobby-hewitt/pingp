import React, { Component } from 'react'
import './style.scss'

export default class InfoBar extends Component {
	render(){
		const { name, playerNumber, room } = this.props
		return(
			<div className="mobileInfoBar">
				<p className="mobilePlayerInfo">{name} <span>| Player {playerNumber}</span></p>
				
			</div>
		)
	}
}